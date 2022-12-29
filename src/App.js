import React from 'react'
import { BrowserRouter as Router, Switch, Route, BrowserRouter , Routes} from 'react-router-dom'

//components
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App