const APP_ID = '56D28265-1E98-4CDE-946A-59E6B6A7D7FA';
const API_KEY = '711A82AC-21A4-4D22-8242-11793EE2704B';

Backendless.initApp(APP_ID, API_KEY);

$(document).ready(function() {
  function loadProducts() {
    Backendless.Data.of('Products').find()
      .then(function(products) {
        $('#productList').empty();
        products.forEach(product => {
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

  function compressImage(file, callback) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7); // Qualidade 70%
        callback(dataUrl);
      };
    };
  }

  loadProducts();

  $('#productForm').submit(function(event) {
    event.preventDefault();

    const product = {
      name: $('#productName').val(),
      description: $('#productDescription').val(),
      price: parseFloat($('#productPrice').val()),
      size: $('#productSize').val(),
      usage: $('#productUsage').val()
    };

    const productId = $('#productId').val();
    const fileInput = $('#productImage')[0];

    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      compressImage(file, function(compressedImage) {
        product.image = compressedImage;
        saveProduct(product, productId);
      });
    } else {
      saveProduct(product, productId);
    }
  });

  function saveProduct(product, productId) {
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
  }

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
