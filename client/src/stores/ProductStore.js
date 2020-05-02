import {observable, action, computed, decorate} from 'mobx'
import api from '../apis'

class ProductStore {
  errors = null
  message = null
  redirect = false
  imageProduct = ''
  products = []
  product = {}
  loading = false
  redirect = false
  test = 'test'

  async fetchProducts() {
    try {
      const response = await api.get('/products')
      const {data} = response.data
      this.products = data
    } catch (err) {
      this.errors = err.message
    }
  }

  async fetchProduct(id) {
    try {
      const response = await api.get(`/products/${id}`)
      const {data} = response.data
      this.product = data
      this.imageProduct = data.image
      this.redirect = false
      this.message = false
    } catch (err) {
      this.errors = err.message
    }
  }

  newProduct() {
    this.product = {}
    this.errors = null
  }

  create() {
    this.products.push({
      id: 999,
      name: 'Tes update 2',
      sku: 'sku-prod-1-update-2',
      image: '1.jpg',
      description:
        "Lorem update Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      price: 2223,
    })
  }

  async update(values) {
    try {
      const {id, name, sku, description, price} = values
      let formData = new FormData()
      formData.append('name', name)
      formData.append('sku', sku)
      formData.append('description', description)
      formData.append('price', price)

      if (values.image) {
        formData.append('image', values.image)
      }

      const response = await api.put(`/products/${id}`, formData)
      const {data, statusCode, message} = response.data
      this.redirect = true
    } catch (err) {
      this.errors = err.message
      alert(this.errors)
    }
  }

  async delete(id) {
    try {
      const response = await api.delete(`/products/${id}`)
      const {data, statusCode, message} = response.data
      this.products = this.products.filter((product) => product.id !== id)
    } catch (err) {
      this.errors = err.message
    }
  }
}

decorate(ProductStore, {
  errors: observable,
  entity: observable,
  products: observable,
  product: observable,
  loading: observable,
  redirect: observable,
  fetchProducts: action,
  fetchProduct: action,
  newProduct: action,
  create: action,
  update: action,
  delete: action,
  imageProduct: observable,
  test: observable,
})

const ProductInstance = new ProductStore()

export default ProductInstance
