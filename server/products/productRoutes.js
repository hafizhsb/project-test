const {
  getProducts,
  getProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
} = require('./productHandlers')

const Routes = [
  {
    method: 'GET',
    path: '/products',
    handler: getProducts,
  },

  {
    method: 'GET',
    path: '/products/{id}',
    handler: getProduct,
  },

  {
    method: 'POST',
    path: '/products',
    config: {
      handler: insertProduct,
      payload: {
        maxBytes: process.env.MAX_UPLOAD_SIZE,
        output: 'file',
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },

  {
    method: 'PUT',
    path: '/products/{id}',
    config: {
      handler: updateProduct,
      payload: {
        maxBytes: process.env.MAX_UPLOAD_SIZE,
        output: 'file',
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },

  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: deleteProduct,
  },
]

module.exports = Routes
