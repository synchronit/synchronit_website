<?php
/*set_include_path('/var/www/mail');*/
require 'mail/PHPMailerAutoload.php';
header('Content-Type: application/json');

$password=trim(file_get_contents("/var/www/synchronit.com/mailpwd"));

$mail = new PHPMailer;  

$name = $_POST['name'];
$email = $_POST['from'];
$message = $_POST['message'];
$subject =  $_POST['from'];
$serverIp='170.249.205.50';
$serverPort = 465;

$mail->isSMTP();  		// Set mailer to use SMTP

$mail->SMTPDebug = 0;
$mail->Host = $serverIp;  // Specify main and backup server
$mail->SMTPAuth = true;    // Enable SMTP authentication
$mail->Username = 'contact@synchronit.com';                            // SMTP username
$mail->Password = $password;                           // SMTP password
$mail->Port = $serverPort;
$mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted

$mail->From = 'contact@synchronit.com';
$mail->FromName = 'Synchronit Team';
$mail->addAddress($email);  						  // Add a recipient

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Thank you for contact us!';

$mail->msgHTML(file_get_contents(__DIR__ .'/messages/contactUs.html'));

if(!$mail->send()) {

    echo '<br/>{"v0.0.6 status ":"Message could not be sent to customer. Mailer Error:' . $mail->ErrorInfo . ' ","success":false }';
    exit;
}


$mail = new PHPMailer;

$name = $_POST['name'];
$email = $_POST['from'];
$message = $_POST['message'];


$mail->isSMTP();
$mail->SMTPDebug = 0;// Set mailer to use SMTP
$mail->Host =  $serverIp; // Specify main and backup server
$mail->SMTPAuth = true;    // Enable SMTP authentication
$mail->Username = 'contact@synchronit.com';                            // SMTP username
$mail->Password = $password;                           // SMTP password
$mail->Port = $serverPort;
$mail->SMTPSecure = 'ssl';                            // Enable encryption, 'ssl' also accepted

$mail->From = $email;
$mail->FromName = 'Synchronit';
$mail->addAddress('contact@synchronit.com');  		// Add a recipient

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Mensaje desde el sitio web';
$mail->Body    = ' Nombre: '.$name.'</br> Mensaje: '.$message;

if(!$mail->send()) {
   echo '{"status":"Message could not be sent to Synchronit. Mailer Error:' . $mail->ErrorInfo.'","success":false}';
   exit;
}



echo '{"status":"Message has been sent","success":true}';
