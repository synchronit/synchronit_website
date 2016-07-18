<?php
/*set_include_path('/var/www/mail');*/
require 'mail/PHPMailerAutoload.php';


$mail = new PHPMailer;

$minNumber			= 1;//$params->get('captcha_random_min');
$maxNumber			= 9;//$params->get('captcha_random_max');
$number1			= rand($minNumber, $maxNumber);
$number2			= rand($minNumber, $maxNumber);
$capt_secret		= "6LfP9gwTAAAAADmk1PgVnCrPFnrCPgzw_60zEcVa";//$params->get('captcha_secret_key');


$getCode = $_GET['get_capcha'];
if($getCode == true){
    $answer 			= $number1 + $number2;
    $capt_token 		= hash_hmac("sha1", $answer, $capt_secret);
    $captcha_question	= $number1 . " + " . $number2 . " = ?";
    $responseArray = Array('token'=> $capt_token, 'question' => $captcha_question);
    echo json_encode($responseArray);
    exit;
}

$answerResponse = $_POST['answer-response'];
$userAnswer = $_POST['answer'];

$userAnswerToken 		= hash_hmac("sha1", $userAnswer, $capt_secret);
if($userAnswerToken != $answerResponse)
{
    $answer 			= $number1 + $number2;
    $capt_token 		= hash_hmac("sha1", $answer, $capt_secret);
    $captcha_question	= $number1 . " + " . $number2 . " = ?";
    $errorResponseArray = Array('success'=> false, 
    'message' => '<p class="gdh_qc_warn">' . 'Wron answer' . '</p>', 
    'token'=> $capt_token, 
    'question' => $captcha_question,
    'answer' => userAnswer);
    echo json_encode($errorResponseArray);
    exit;
}
//$answerHash = 

$name = $_POST['name'];
$email = $_POST['from'];
$message = $_POST['message'];
$subject =  $_POST['from'];
$severIp='209.236.127.42';


$mail->isSMTP();

$mail->SMTPDebug = 1;// Set mailer to use SMTP
$mail->Host = $severIp;  // Specify main and backup server
$mail->SMTPAuth = true;    // Enable SMTP authentication
$mail->Username = 'contact@synchronit.com';                            // SMTP username
$mail->Password = 'Muchachit0123';                           // SMTP password
$mail->Port = 587;
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = 'contact@synchronit.com';
$mail->FromName = 'Synchronit Team';
$mail->addAddress($email);  // Add a recipient

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Thank you for contact us!';

$mail->msgHTML(file_get_contents(__DIR__ .'/messages/contactUs.html'));

ob_start();
if(!$mail->send()) {
    ob_clean();
    $errorResponseArray = Array('success'=> false, 'message'=> 'Message could not be sent.', 'error' => $mail->ErrorInfo);   
   echo json_encode($errorResponseArray);
   exit;
}
ob_clean();
//echo 'Message has been sent';

$mail = new PHPMailer;

$name = $_POST['name'];
$email = $_POST['from'];
$message = $_POST['message'];
$subject =  $_POST['subject'];


$mail->isSMTP();
$mail->SMTPDebug = 1;// Set mailer to use SMTP
$mail->Host =  $severIp; // Specify main and backup server
$mail->SMTPAuth = true;    // Enable SMTP authentication
$mail->Username = 'contact@synchronit.com';                            // SMTP username
$mail->Password = 'Muchachit0123';                           // SMTP password
$mail->Port = 587;
$mail->SMTPSecure = 'tls';                            // Enable encryption, 'ssl' also accepted

$mail->From = $email;
$mail->FromName = 'Synchronit';
$mail->addAddress('contact@synchronit.com');  // Add a recipient

$mail->WordWrap = 50;                                 // Set word wrap to 50 characters
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Mensaje desde el sitio web - ' .$subject;
$mail->Body    = ' Nombre: '.$name.'</br> Mensaje: '.$message;

ob_start();
if(!$mail->send()) {
    ob_clean();
  $errorResponseArray = Array('success'=> false, 'message'=> 'Message could not be sent.', 'error' => $mail->ErrorInfo);   
   echo json_encode($errorResponseArray);
   exit;
}

ob_clean();
$answer = $number1 + $number2;
$capt_token = hash_hmac("sha1", $answer, $capt_secret);
$captcha_question	= $number1 . " + " . $number2 . " = ?";

$responseArray = Array('success'=> true, 'message'=> 'Message has been sent', 'token'=> $capt_token, 'question' => $captcha_question);   
echo json_encode($responseArray);
exit;
