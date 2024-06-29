// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
  // Seleciona o formulário pelo ID
  var form = document.getElementById('loginForm');

  // Adiciona um ouvinte para o evento de submissão do formulário
  form.addEventListener('submit', function(event) {
    // Previne o comportamento padrão de envio do formulário (que recarregaria a página)
    event.preventDefault();

    // Redireciona o usuário para a URL desejada
    window.location.href = 'portalADM.html'; // Substitua 'URL_DA_SUA_PAGINA' pela URL para a qual deseja redirecionar
  });
});
