<?php
session_start();

// Credenciais de usuário válido (substitua com suas próprias credenciais)
$valid_username = 'admin';
$valid_password = 'admin123';

// Verifica se o formulário foi submetido
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do formulário
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verifica as credenciais
    if ($username === $valid_username && $password === $valid_password) {
        // Credenciais válidas, redireciona para a página desejada
        $_SESSION['username'] = $username; // Salva o nome de usuário na sessão (opcional)
        header('Location: portalADM.html');
        exit;
    } else {
        // Credenciais inválidas, mostra mensagem de erro
        $error = "Usuário ou senha incorretos. Por favor, tente novamente.";
    }
} else {
    // Se o formulário não foi submetido, redireciona para o formulário de login
    header('Location: index.html');
    exit;
}
?>