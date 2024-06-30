const APP_ID = 'AB7A8C38-2AD2-4C6C-9BC4-76B7E6D7081F';
const API_KEY = '641FDC42-65A1-4E2E-8A10-AB510232F49D';

Backendless.initApp(APP_ID, API_KEY);

$(document).ready(function() {
  Backendless.Data.of('Products').find()
    .then(function(products) {
      products.forEach(product => {
        $('#productsContainer').append(`
          <div class="col-md-4 produto">
            <div class="card">
              <img src="${product.image}" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <h6>R$ ${product.price.toFixed(2)}</h6>
                <button class="btn btn-primary saiba-mais-btn" data-toggle="modal" data-target="#modal${product.objectId}">
                  <i class="fas fa-info-circle"></i> Saiba Mais
                </button>
              </div>
            </div>
          </div>
        `);

        $('#productModals').append(`
          <div class="modal fade" id="modal${product.objectId}" tabindex="-1" role="dialog" aria-labelledby="modal${product.objectId}Label" aria-hidden="true">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modal${product.objectId}Label">${product.name}</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <img src="${product.image}" class="img-fluid mb-3" alt="${product.name}">
                  <p><strong>Tamanho:</strong> ${product.size}</p>
                  <p><strong>Uso:</strong> ${product.usage}</p>
                  <p><strong>Preço:</strong> R$ ${product.price.toFixed(2)}</p>
                  <a href="https://api.whatsapp.com/send?phone=35991513407&text=Olá! Gostaria de reservar" class="btn btn-success btn-block">
                    <i class="fab fa-whatsapp"></i> Reservar no WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        `);
      });
    })
    .catch(function(error) {
      console.error('Error loading products:', error);
    });
});