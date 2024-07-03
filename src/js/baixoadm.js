const APP_ID = '9BF19929-D266-4EA2-8B3D-75694E6A0A40';
const API_KEY = 'A08B5F24-D1AE-4830-95B5-E0AEF4BAEBC5';

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
