<?php
header("Access-Control-Allow-Origin: http://localhost:8080");
header("Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
// Strip base paths if backend is in a subfolder (e.g., /School-management-Project/backend)
$basePath = '/backend/api/'; 
$pos = strpos($requestUri, $basePath);
if ($pos !== false) {
    $path = substr($requestUri, $pos + strlen($basePath));
} else {
    // Fallback if /api/ is in the path directly
    $apiPos = strpos($requestUri, '/api/');
    if ($apiPos !== false) {
        $path = substr($requestUri, $apiPos + 5);
    } else {
        $path = ltrim($requestUri, '/');
    }
}

$uriParts = explode("/", $path);
$module = $uriParts[0] ?? '';

// Legacy support for userRoute.php which uses end($uri)
$uri = explode("/", $_SERVER['REQUEST_URI']);
$route = end($uri);

// Route traffic
switch ($module) {
    case 'auth':
    case 'register':
    case 'login':
    case 'verify':
    case 'logout':
    case 'refresh':          // V-03/V-04: new dedicated token-refresh endpoint
    case 'forgot-password':  // Task 2 - Step 1
    case 'verify-otp':       // Task 2 - Step 2
    case 'reset-password':   // Task 2 - Step 3
        require __DIR__ . '/routes/userRoute.php';
        break;
    case 'profile':
        require __DIR__ . '/routes/profileRoute.php';
        break;
    case 'school':
        require __DIR__ . '/routes/schoolRoute.php';
        break;
    case 'users':
        require __DIR__ . '/routes/userManagementRoute.php';
        break;
    default:
        // Attempt to load dynamically if file exists, else 404
        $routeFile = __DIR__ . '/routes/' . $module . 'Route.php';
        if ($module !== '' && file_exists($routeFile)) {
            require $routeFile;
        } else {
            http_response_code(404);
            echo json_encode(["success" => false, "message" => "API endpoint not found: " . $module]);
        }
        break;
}
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