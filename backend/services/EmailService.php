<?php

// No namespace — aligned with existing codebase architecture.
// V-10: MAIL_FROM_NAME env key corrected to MAIL_NAME throughout.

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/../vendor/autoload.php';

/**
 * EmailService
 *
 * Centralises all outbound email sending.
 * All methods share the same SMTP configuration via createMailer().
 *
 * Changes:
 *  - Removed erroneous `namespace Services;` (V-10 partial — alignment fix)
 *  - Fixed $_ENV['MAIL_FROM_NAME'] → $_ENV['MAIL_NAME'] (V-10)
 *  - Extracted shared SMTP setup into createMailer() to eliminate duplication
 *  - Added sendOtpEmail() for the Forgot Password flow (Task 2)
 */
class EmailService
{
    /**
     * Build and configure a PHPMailer instance with SMTP credentials from .env.
     *
     * @return PHPMailer
     * @throws Exception
     */
    private function createMailer(): PHPMailer
    {
        $mail             = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host       = $_ENV['SMTP_HOST'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $_ENV['SMTP_USERNAME'];
        $mail->Password   = $_ENV['SMTP_PASSWORD'];
        $mail->SMTPSecure = $_ENV['SMTP_ENCRYPTION'] === 'tls'
            ? PHPMailer::ENCRYPTION_STARTTLS
            : PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = (int) $_ENV['SMTP_PORT'];
        $mail->setFrom(
            $_ENV['MAIL_FROM'],
            $_ENV['MAIL_NAME']   // V-10: was incorrectly MAIL_FROM_NAME
        );
        $mail->isHTML(true);
        return $mail;
    }

    /**
     * Send a password-reset OTP to the user's email address.
     * The plain OTP is embedded in the email body and NEVER stored in the DB.
     *
     * @param string $to   Recipient email address
     * @param int    $otp  Plain 6-digit OTP
     * @return array
     */
    public function sendOtpEmail(string $to, int $otp): array
    {
        try {
            $mail          = $this->createMailer();
            $appName       = htmlspecialchars($_ENV['MAIL_NAME'] ?? 'School Management System');
            $mail->addAddress($to);
            $mail->Subject = "Password Reset OTP — {$appName}";
            $mail->Body    = $this->buildOtpEmailBody($otp, $appName);
            $mail->AltBody = "Your OTP for password reset is: {$otp}. It expires in 10 minutes. Do not share it with anyone.";
            $mail->send();

            return ['success' => true, 'message' => 'OTP email sent successfully.'];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $mail->ErrorInfo ?? $e->getMessage()
            ];
        }
    }

    /**
     * Send a test email to verify SMTP configuration.
     *
     * @param string $to
     * @return array
     */
    public function sendTestEmail(string $to): array
    {
        try {
            $mail          = $this->createMailer();
            $mail->addAddress($to);
            $mail->Subject = 'SMTP Test — ' . ($_ENV['MAIL_NAME'] ?? 'School Management System');
            $mail->Body    = '<h2>SMTP is working successfully.</h2>';
            $mail->send();

            return ['success' => true, 'message' => 'Email sent successfully.'];

        } catch (Exception $e) {
            return [
                'success' => false,
                'message' => $mail->ErrorInfo ?? $e->getMessage()
            ];
        }
    }

    /**
     * Build the HTML body for OTP emails.
     *
     * @param int    $otp
     * @param string $appName
     * @return string  HTML
     */
    private function buildOtpEmailBody(int $otp, string $appName): string
    {
        return <<<HTML
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;
                    padding: 32px; border: 1px solid #e0e0e0; border-radius: 8px; background: #ffffff;">
            <h2 style="margin: 0 0 4px; color: #1a1a2e;">{$appName}</h2>
            <p style="color: #555; font-size: 15px; margin-top: 8px;">
                You requested a password reset. Use the one-time code below to continue.
            </p>
            <div style="background: #f4f6ff; border-radius: 6px; padding: 28px;
                        text-align: center; margin: 24px 0;">
                <span style="font-size: 40px; font-weight: bold; letter-spacing: 10px;
                             color: #4f46e5; font-family: monospace;">{$otp}</span>
            </div>
            <p style="color: #888; font-size: 13px; margin-bottom: 4px;">
                ⏱ This OTP expires in <strong>10 minutes</strong>.
            </p>
            <p style="color: #888; font-size: 13px; margin-top: 4px;">
                🔒 Do not share this code with anyone. If you did not request this, ignore this email.
            </p>
        </div>
        HTML;
    }
}