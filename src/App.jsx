import './App.css'
import Home from '../pages/Home'
import Upcoming from '../pages/Upcoming'
import TopRated from '../pages/TopRated'
import DetailPage from '../pages/DetailPage'
import SearchResult from '../pages/SearchResult'
import Navbar from '../components/Navbar'

import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <>
    <div>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} /> 
          <Route path='/upcoming' element={<Upcoming/>} /> 
          <Route path='/toprated' element={<TopRated/>} /> 
          <Route path='/movie/:movieId' element={<DetailPage/>} /> 
          <Route path='/searchresult' element={<SearchResult/>} /> 
        </Routes>
    </div> 
    </>
  )
}

export default App
