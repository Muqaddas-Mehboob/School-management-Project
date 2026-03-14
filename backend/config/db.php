<?php

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$uri = $_ENV['MONGODB_URI'];
$dbName = $_ENV['DB_NAME'];

try {
    $client = new MongoDB\Client($uri);
    $database = $client->$dbName;
    return $database;

} catch (Exception $e) {
    echo "Connection failed: " . $e->getMessage();
}