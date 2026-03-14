<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header('Content-Type: application/json');
$uri = $_SERVER['REQUEST_URI'];
$uri = explode("/", $_SERVER['REQUEST_URI']);
$route = end($uri);
require __DIR__ . '/routes/userRoute.php';
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}
// error_reporting(E_ALL);
// ini_set('display_errors', 1);

// echo $route;
// function generatePriveatePublicKey()
//     {
//         $config = [
//             'private_key_bits' => 2048,
//             'private_key_type' => OPENSSL_KEYTYPE_RSA,
//         ];
//         $PrivateKey = openssl_pkey_new($config);
//         if ($PrivateKey === false) {
//             while ($msg = openssl_error_string()) {
//                 echo $msg . "<br>";
//             }
//             die("Key generation failed");
//         }
//         openssl_pkey_export($PrivateKey, $privateKeyPEM);
//         $PublicKeyDetails = openssl_pkey_get_details($PrivateKey);
//         $PublicKey = $PublicKeyDetails['key'];

//         file_put_contents("./keys/private_key_pem", $privateKeyPEM);
//         file_put_contents("./keys/public_key_pem", $PublicKey);

//         echo "Private and public keys generated successfully";

//     }
//     generatePriveatePublicKey();