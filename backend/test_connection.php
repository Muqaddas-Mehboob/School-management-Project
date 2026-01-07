<!-- TO USE DB ANY OTHER FILE USE THE BELOW SYNTAX -->
<!-- <?php
require_once 'db_config.php';
?> -->


<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

$host = "caboose.proxy.rlwy.net";
$port = "21014";
$database = "railway";
$username = "root";
$password = "YRGYPYOinsErOmgMRUxzZwLyOnLVIePc";

// Create connection
$conn = mysqli_connect($host, $username, $password, $database, $port);

// Check connection
if (!$conn) {
    die("❌ Connection FAILED: " . mysqli_connect_error());
}

echo "✅ Connection SUCCESSFUL!<br>";
echo "Connected to database: " . $database . "<br>";
echo "Server: " . $host . "<br>";

// Test query - count tables
$result = mysqli_query($conn, "SHOW TABLES");
$table_count = mysqli_num_rows($result);

echo "Total tables in database: " . $table_count . "<br><br>";

// Show all table names
echo "<strong>Tables:</strong><br>";
while ($row = mysqli_fetch_array($result)) {
    echo "- " . $row[0] . "<br>";
}

mysqli_close($conn);
?>