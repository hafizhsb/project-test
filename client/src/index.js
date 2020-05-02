import React from "react"
import ReactDOM from "react-dom"
import "semantic-ui-css/semantic.min.css"
import App from "./components/App"
import * as serviceWorker from "./serviceWorker"
import ProductInstance from "./stores/ProductStore"
import {ProductProvider} from "./contexts/ProductContext"

ReactDOM.render(
  <React.StrictMode>
    <ProductProvider value={ProductInstance}>
      <App />
    </ProductProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
