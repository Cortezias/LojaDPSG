const APP_ID = '56D28265-1E98-4CDE-946A-59E6B6A7D7FA';
const API_KEY = '711A82AC-21A4-4D22-8242-11793EE2704B';

Backendless.initApp(APP_ID, API_KEY);

$(document).ready(function() {
  function loadProducts() {
    Backendless.Data.of('Products').find()
      .then(function(products) {
        $('#productList').empty();
        products.filter(product => product.category === 'Blusa').forEach(product => {
          $('#productList').append(`
            <li class="list-group-item d-flex justify-content-between align-items-center">
              ${product.name}
              <div>
                <button class="btn btn-warning btn-sm mr-2 edit-btn" data-id="${product.objectId}">Editar</button>
                <button class="btn btn-danger btn-sm delete-btn" data-id="${product.objectId}">Excluir</button>
              </div>
            </li>
          `);
        });
      })
      .catch(function(error) {
        console.error('Error loading products:', error);
      });
  }

  loadProducts();

  $('#productForm').submit(function(event) {
    event.preventDefault();

    const product = {
      name: $('#productName').val(),
      description: $('#productDescription').val(),
      price: parseFloat($('#productPrice').val()),
      image: $('#productImage').val(),
      size: $('#productSize').val(),
      usage: $('#productUsage').val(),
      category: 'Blusa'  // Adicionar categoria fixa
    };

    const productId = $('#productId').val();

    if (productId) {
      Backendless.Data.of('Products').save({ ...product, objectId: productId })
        .then(function() {
          $('#productForm')[0].reset();
          $('#productId').val('');
          loadProducts();
        })
        .catch(function(error) {
          console.error('Error updating product:', error);
        });
    } else {
      Backendless.Data.of('Products').save(product)
        .then(function() {
          $('#productForm')[0].reset();
          loadProducts();
        })
        .catch(function(error) {
          console.error('Error creating product:', error);
        });
    }
  });

  $('#productList').on('click', '.edit-btn', function() {
    const productId = $(this).data('id');
    Backendless.Data.of('Products').findById(productId)
      .then(function(product) {
        $('#productId').val(product.objectId);
        $('#productName').val(product.name);
        $('#productDescription').val(product.description);
        $('#productPrice').val(product.price);
        $('#productImage').val(product.image);
        $('#productSize').val(product.size);
        $('#productUsage').val(product.usage);
      })
      .catch(function(error) {
        console.error('Error fetching product:', error);
      });
  });

  $('#productList').on('click', '.delete-btn', function() {
    const productId = $(this).data('id');
    Backendless.Data.of('Products').remove(productId)
      .then(function() {
        loadProducts();
      })
      .catch(function(error) {
        console.error('Error deleting product:', error);
      });
  });
});
