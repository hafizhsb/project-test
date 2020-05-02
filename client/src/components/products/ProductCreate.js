import React from "react"
import ProductFormPage from "./ProductFormPage"

class ProductCreate extends React.Component {
  onSubmit = (event) => {
    event.preventDefault()
    console.log(event.target.value)
  }

  render() {
    return (
      <div>
        <ProductFormPage onSubmit={this.onSubmit} />
      </div>
    )
  }
}

export default ProductCreate
