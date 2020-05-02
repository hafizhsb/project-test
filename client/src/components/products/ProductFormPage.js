import React from 'react'
import {observer} from 'mobx-react'
import {Button, Icon, Label, Form, Container, Message} from 'semantic-ui-react'
import {Formik, Field, ErrorMessage} from 'formik'
import {Redirect} from 'react-router-dom'
import ProductContext from '../../contexts/ProductContext'

class ProductFormPage extends React.Component {
  static contextType = ProductContext

  componentDidMount() {
    const {id} = this.props.match.params
    if (id) {
      this.context.fetchProduct(id)
    }
  }

  errorMessages = () => {
    return <Message negative header={this.context.errors} />
  }

  render() {
    if (!this.context.product) return <div>Loading...</div>
    if (this.context.redirect) return <Redirect to="/" />
    return (
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: this.context.product.name,
          sku: this.context.product.sku,
          price: this.context.product.price,
          description: this.context.product.description,
          id: this.context.product.id,
        }}
        validate={(values) => {
          const errors = {}
          // if (!values.name) {
          //     errors.name = "Required"
          //   }
          return errors
        }}
        onSubmit={(values, {setSubmitting}) => {
          if (values.id === '') {
          } else {
            this.context.update(values)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Container style={{margin: 20}}>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                style={{marginBottom: 10}}
              />
              {errors.name && touched.name && errors.name}
              <input
                type="text"
                name="sku"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.sku}
                style={{marginBottom: 10}}
              />
              <input
                type="text"
                name="price"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                style={{marginBottom: 10}}
              />
              {errors.price && touched.price && errors.price}
              <textarea
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                style={{marginBottom: 10}}
              />
              {errors.description && touched.description && errors.description}
              <input
                type="hidden"
                name="id"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.id}
                style={{marginBottom: 10}}
              />
              <img src={this.context.imageProduct} width="300" height="300" />
              <input
                id="image"
                name="image"
                type="file"
                onChange={(event) => {
                  setFieldValue('image', event.currentTarget.files[0])
                }}
                style={{marginBottom: 10}}
              />

              <Button type="submit" color="blue">
                Submit
              </Button>
            </Form>
          </Container>
        )}
      </Formik>
    )
  }
}

export default observer(ProductFormPage)
