import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import ProductList from "./products/ProductList"
import ProductCreate from "./products/ProductCreate"
import ProductFormPage from "./products/ProductFormPage"

const App = () => {
  return (
    <div>
      <Router>
        <Route path="/" exact component={ProductList} />
        <Route path="/create" exact component={ProductCreate} />
        <Route path="/edit/:id" exact component={ProductFormPage} />
      </Router>
    </div>
  )
}

export default App
