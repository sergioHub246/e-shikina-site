<?php
// envoi-email.php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// DÉCOMMENTEZ cette partie pour accepter les deux formats
$data = [];

// Essayer de lire les données JSON d'abord
$input = file_get_contents('php://input');
if ($input) {
    $data = json_decode($input, true);
}

// Si pas de JSON ou échec, utiliser $_POST
if (!$data && !empty($_POST)) {
    $data = $_POST;
}

// Utiliser les données
$name = htmlspecialchars(trim($data['name'] ?? ''));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = htmlspecialchars(trim($data['subject'] ?? 'Message E-Shikina'));
$message = htmlspecialchars(trim($data['message'] ?? ''));

// CONFIGURATION - IMPORTANT : METTEZ VOTRE VRAI EMAIL
$to = "eshikina@gmail.com"; // ← CHANGEZ ICI si besoin

// Le reste du code reste identique...
if (empty($name) || strlen($name) < 2) {
    echo json_encode(['success' => false, 'message' => 'Nom invalide']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Email invalide']);
    exit;
}

if (empty($message) || strlen($message) < 10) {
    echo json_encode(['success' => false, 'message' => 'Message trop court']);
    exit;
}

// Préparer l'email
$email_subject = "[E-Shikina] $subject";
$headers = "From: $name <$email>\r\n"; // Modifié pour inclure le nom
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$email_body = "
<h2>Nouveau message de contact E-Shikina</h2>
<p><strong>Nom:</strong> $name</p>
<p><strong>Email:</strong> $email</p>
<p><strong>Sujet:</strong> $subject</p>
<p><strong>Message:</strong></p>
<p>" . nl2br($message) . "</p>
<hr>
<p>Date: " . date('d/m/Y H:i:s') . "</p>
";

// Envoyer l'email
if (mail($to, $email_subject, $email_body, $headers)) {
    // Log
    $log = date('Y-m-d H:i:s') . " | $name | $email | $subject\n";
    file_put_contents('contact_log.txt', $log, FILE_APPEND);
    
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès']);
} else {
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi. Vérifiez la configuration du serveur.']);
}
?>