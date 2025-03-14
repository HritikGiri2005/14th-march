import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductForm from './components/ProductForm';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ProductForm></ProductForm>
    </>
  )
}

export default App
