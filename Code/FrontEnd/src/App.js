import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import Complete from './Components/CompleteDetail/Complete'
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/model/:id' element={<Complete />}></Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
