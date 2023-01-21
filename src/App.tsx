import "bootstrap/dist/css/bootstrap.min.css"
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import { Home } from "./components/Home"
import { Store } from "./components/Store"
import { About } from "./components/About"
import { Fragment } from "react"
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"
import { Product } from "./components/Product"


function App() {

  return (

   <ShoppingCartProvider>
   <Navbar/>
     <Container className="mb-4">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/store" element={<Store/>}/>
      <Route path="/product/:id" element={<Product/>}/>
        
     
      <Route path="/about" element={<About/>}/>
    </Routes>
   </Container>
   </ShoppingCartProvider>
  
  )
}

export default App
