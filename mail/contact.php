<?php
if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['message']) || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
  http_response_code(500);
  exit;
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$m_subject = strip_tags(htmlspecialchars($_POST['subject']));
$message = strip_tags(htmlspecialchars($_POST['message']));

console.log('Success from php file');

$to = "obedamoako92@gmail.com";
$subject = "$m_subject:  $name";
$body = "Hello Obed,\nSomeone sent you message from your website.\n\n"."Here are the details:\n\nName: $name\n\n\nEmail: $email\n\nSubject: $m_subject\n\nMessage: $message";
$header = "From: $email\r\n";
$header .= "Reply-To: $email\r\n";
$header .= "MIME-Version: 1.0\r\n";
$header .= "Content-type: text/html; charset=utf-8\r\n";

if(mail($to, $subject, $body, $header)) {
  http_response_code(200);
} else {
  http_response_code(500);
}

