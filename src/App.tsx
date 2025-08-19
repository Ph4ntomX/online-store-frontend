import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import { ThemeProvider } from "@/components/theme-provider"

import Home from "./pages/Home"
import Products from "./pages/Products"

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
