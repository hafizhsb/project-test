import React from "react"
import {observer} from "mobx-react"
import ProductContext from "../../contexts/ProductContext"
import {
  Container,
  Button,
  Card,
  Icon,
  Header,
  Message,
} from "semantic-ui-react"
import ProductCard from "./ProductCard"

class ProductList extends React.Component {
  static contextType = ProductContext

  componentDidMount() {
    this.context.fetchProducts()
  }

  handleClick = () => {
    this.context.create()
    alert("ok")
  }

  handleDelete = (id) => {
    if (window.confirm("Anda yakin akan menghapus produk ini ?"))
      this.context.delete(id)
  }

  emptyMessage = () => {
    return (
      <Message icon info>
        <Icon name="warning circle" />
        <Message.Content>
          <Message.Header>No Products Found</Message.Header>
          <span>Add some new products to get started..</span>
        </Message.Content>
      </Message>
    )
  }

  errorMessages = () => {
    return <Message negative header={this.context.errors} />
  }

  renderList() {
    return this.context.products.map((product) => {
      return (
        <ProductCard product={product} onhandleDelete={this.handleDelete} />
      )
    })
  }

  render() {
    return (
      <Container style={{margin: 20}}>
        {this.context.errors && this.errorMessages()}
        <Header>
          {/* <Button positive onClick={this.handleClick}>
            Create
          </Button> */}
        </Header>
        <Card.Group>
          {this.context.products.length === 0 &&
            !this.context.errors &&
            this.emptyMessage()}

          {this.renderList()}
        </Card.Group>
      </Container>
    )
  }
}

export default observer(ProductList)
