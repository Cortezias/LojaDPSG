<?php
session_start();

// Simulando dados de usuário (substitua por sua lógica de validação real)
$valid_username = 'admin';
$valid_password = 'admin123';

// Verifica se o formulário foi enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtém os dados do formulário
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verifica se as credenciais são válidas
    if ($username === $valid_username && $password === $valid_password) {
        // Credenciais válidas, redireciona para a página desejada
        $_SESSION['username'] = $username; // Armazena o nome de usuário na sessão (opcional)
        header('Location: admin_dashboard.php');
        exit;
    } else {
        // Credenciais inválidas, redireciona de volta para o formulário com mensagem de erro
        header('Location: index.html'); // Página de login
        exit;
    }
} else {
    // Redireciona para o formulário de login se acessado diretamente
    header('Location: portalADM.html');
    exit;
}
?>
