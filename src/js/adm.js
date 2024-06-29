const APP_ID = 'AB7A8C38-2AD2-4C6C-9BC4-76B7E6D7081F';
const API_KEY = '641FDC42-65A1-4E2E-8A10-AB510232F49D';

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

    const fileInput = $('#productImage')[0];
    const file = fileInput.files[0];
    const productId = $('#productId').val();

    if (file) {
      const fileName = file.name;
      const filePath = `images/${fileName}`;
      
      Backendless.Files.upload(file, 'images')
        .then(function(uploadedFile) {
          const product = {
            name: $('#productName').val(),
            description: $('#productDescription').val(),
            price: parseFloat($('#productPrice').val()),
            image: uploadedFile.fileURL,
            size: $('#productSize').val(),
            usage: $('#productUsage').val(),
            category: 'Blusa'  // Adicionar categoria fixa
          };

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
        })
        .catch(function(error) {
          console.error('Error uploading file:', error);
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
        $('#productImage').val('');
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

console.log(typeof $);
