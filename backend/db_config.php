<?php
// Railway Database Configuration

$host = "caboose.proxy.rlwy.net";
$port = 21014;
$database = "railway";
$username = "root";
$password = "YRGYPYOinsErOmgMRUxzZwLyOnLVIePc";

// Create connection
$conn = mysqli_connect($host, $username, $password, $database, $port);

// Check connection
if (!$conn) {
    die("Database Connection Failed: " . mysqli_connect_error());
}

// Set charset
mysqli_set_charset($conn, "utf8mb4");

// Success (optional - comment out in production)
// echo "Database connected successfully!";
?>