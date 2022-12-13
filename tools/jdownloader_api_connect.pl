#!/usr/bin/perl

# Example code in perl to connect to the JDownloader api and initiate encryption

use utf8;
use Digest::SHA qw(hmac_sha256_hex sha256);
use WWW::Mechanize::GZip;
use URL::Encode (url_encode);
use MIME::Base64;
use Crypt::Mode::CBC;
use JSON;

binmode STDOUT, ":encoding(UTF-8)";

$| = 1;

# AES encryption module
my $cbc = Crypt::Mode::CBC->new('AES');

# MECHANIZE browser instance
my $mech = WWW::Mechanize::GZip->new(timeout => 2,
				     ssl_opts => { verify_hostname => 0,
						   SSL_verifycn_scheme => "none",
						   SSL_verify_mode => 0,
						 },
				     verify_hostname => 0,
				     autocheck => 1,
				    );

my $email = 'MyMailAddress';
my $pass = 'MyPassword';
my $application = 'jdtestapp'; # select a name for your application

my $data;
$data->{rid} = time; # select RequestID on first request, increase with every following request
$data->{api} = "http://api.jdownloader.org";

# generate login secret
$data->{login_secret} = sha256(lc($email).$pass.'server');

# generate device secret
$data->{device_secret} = sha256(lc($email).$pass.'device');

# build query url
$data->{qurl} = '/my/connect?email='.url_encode(lc($email)).'&appkey='.$application.'&rid='.($data->{rid}++);

# generate signature
$data->{signature} = hmac_sha256_hex($data->{qurl},$data->{login_secret});

# build full url and append signature
$data->{posturl} = $data->{api}.$data->{qurl}.'&signature='.$data->{signature};

# get the server session with the posturl
print "Getting server session: ".$data->{posturl}."\n";
$mech->post($data->{posturl},
	          'Content-Type' => 'application/json; charset=utf-8');

if ($mech->status() != 200) {
    print "ERROR ".$mech->status()."\n";
    exit 1;
}
print "CONTENT: ".$mech->content()."\n";

# generate keys from first and second half of the login secret
$data->{iv} = substr($data->{login_secret},0,length($data->{login_secret}) / 2);
$data->{key} = substr($data->{login_secret},length($data->{login_secret}) / 2);

# decrypt the server response with the two keys
$data->{server_session} = $cbc->decrypt(decode_base64($mech->content()),
                                        $data->{key},
                                        $data->{iv});

# parse the json data from the server so we get the sessiontoekn
$data->{server} = from_json($data->{server_session});

# build the server and device encryption tokens
$data->{server_enc_token} = sha256($data->{login_secret}.pack("H*",$data->{server}->{sessiontoken}));
$data->{device_enc_token} = sha256($data->{device_secret}.pack("H*",$data->{server}->{sessiontoken}));

# build the server keys from the first and second half of the server encryption token
$data->{keys}->{server}->{iv} = substr($data->{server_enc_token},0,length($data->{server_enc_token}) / 2);
$data->{keys}->{server}->{key} = substr($data->{server_enc_token},length($data->{server_enc_token}) / 2);

sub JD_API_Request { # standard function to make api requests with the above data
    my $data = shift;

    my $url = $data->{url};
    $url .= ($url =~ /\?/ ? "&" : "?")."rid=".$data->{rid}; # append rid (needs to be increased!)

    my $signature = hmac_sha256_hex($url,$data->{sig_token}); # create signature for the request
    $url .= '&signature='.$signature; # append signature to url

    print "Loading ".$url."\n";
    $mech->post("http://api.jdownloader.org".$url,
            		'Content-Type' => 'application/json; charset=utf-8');

    # decrypt response with the server keys
    my $decrypt = $cbc->decrypt(decode_base64($mech->content()),
				                        $data->{key}->{key},
				                        $data->{key}->{iv});

    print "DECRYPTED: ".$decrypt."\n";
}


# EXAMPLE: using the standard function to query a list of all connected jdownloader instances to the account
JD_API_Request({ url => "/my/listdevices?sessiontoken=".url_encode($data->{server}->{sessiontoken}),
		             rid => ++$data->{rid}, # increasing rid
		             key => $data->{keys}->{server},
		             sig_token => $data->{server_enc_token} });
                 
# EXAMPLE OUTPUT:
# |Getting server session: http://api.jdownloader.org/my/connect?email=<EMAIL>&appkey=<APPKEY>&rid=<RID>&signature=<SIGNATURE>
# |CONTENT: <ENCRYPTED-RESPONSE>
# |Loading /my/listdevices?sessiontoken=<TOKEN>&signature=<SIGNATURE>

# |DECRYPT: {
# | "list" : [ {
# |   "id" : "<JDOWNLOADERID>",
# |   "type" : "jd",
# |   "name" : "<JDOWNLOADER-NAME>",
# |   "status" : "UNKNOWN"
# | }, {
# |   "id" : "<JDOWNLOADERID>",
# |    "type" : "jd",
# |   "name" : "<JDOWNLOADER-NAME>",
# |   "status" : "UNKNOWN"
# | } ],
# | "rid" : 1670946539
# |}
