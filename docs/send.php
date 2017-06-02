<?php 

$name      =   htmlspecialchars($_POST['name'], ENT_QUOTES);
$phone     =   htmlspecialchars($_POST['phone'], ENT_QUOTES);
$email     =   htmlspecialchars($_POST['email'], ENT_QUOTES);
$url       =   htmlspecialchars($_POST['url'], ENT_QUOTES);

$email_to  = 'kabyr2@yandex.ru';
$headers   = "From: order@no-reply.ru";
$subject   = "Форма обратной связи";

$message  = "Имя:    $name\r\nТелефон:  $phone\r\nE-mail:  $email\r\nСсылка:  $url\r\n";
mail($email_to, $subject, $message, $headers);

?>