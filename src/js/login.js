// Credenciais pré-cadastradas
const predefinedUsers = [
  { username: "1", password: "2" },
  { username: "user2", password: "password2" },
  { username: "admin", password: "admin123" }
];

// Armazenar as credenciais no localStorage
function storeCredentials() {
  localStorage.setItem('users', JSON.stringify(predefinedUsers));
}

// Recuperar as credenciais do localStorage
function getStoredCredentials() {
  return JSON.parse(localStorage.getItem('users'));
}

// Função para verificar as credenciais de login
function validateLogin(username, password) {
  const users = getStoredCredentials();
  return users.some(user => user.username === username && user.password === password);
}

// Armazenar as credenciais ao carregar a página (somente uma vez)
if (!localStorage.getItem('users')) {
  storeCredentials();
}

$(document).ready(function() {
  $('#loginForm').on('submit', function(event) {
      event.preventDefault();
      
      const username = $('#username').val();
      const password = $('#password').val();
      
      if (validateLogin(username, password)) {
          // Redirecionar para outra página após login bem-sucedido
          window.location.href = 'portalADM.html'; // Substitua 'dashboard.html' pela página desejada
      } else {
          $('#message').html('<div class="alert alert-danger">Invalid username or password.</div>');
      }
  });
});
