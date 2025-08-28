import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"

import Cart from "./pages/Cart"
import Products from "./pages/Products"
import ProductCreation from "./pages/ProductCreation"
import Checkout from "./pages/Checkout"
import PaymentVerification from "./pages/PaymentVerification"
import Orders from "./pages/Orders"
import Categories from "./pages/Categories"

function App() {
  return (
    <ThemeProvider>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<ProductCreation />} />
          <Route path="/product/:id" element={<ProductCreation />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/verify-payment" element={<PaymentVerification />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
