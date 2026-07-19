<?php

require_once __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

require_once __DIR__ . '/services/EmailService.php';

use Services\EmailService;

$email = new EmailService();

$result = $email->sendTestEmail("muhammad.ali309455@gmail.com");

echo "<pre>";
print_r($result);