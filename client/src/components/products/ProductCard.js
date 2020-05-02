import React from "react"
import {Link} from "react-router-dom"
import {Button, Card, Image, Icon} from "semantic-ui-react"

class ProductCard extends React.Component {
  render() {
    const {id, name, sku, price, description, image} = this.props.product

    return (
      <Card>
        <Image
          src={image}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>
            <span className="date">{sku}</span>
          </Card.Meta>
          <Card.Content>
            <strong>RP. {price}</strong>
          </Card.Content>
          <Card.Description>{description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Link to={`/edit/${id}`} className="ui basic button yellow">
              Edit
            </Link>
            <Button
              basic
              color="red"
              onClick={() => this.props.onhandleDelete(id)}
            >
              Delete
            </Button>
          </div>
        </Card.Content>
      </Card>
    )
  }
}

export default ProductCard
