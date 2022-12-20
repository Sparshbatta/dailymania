import './App.css';
import React, {useState} from 'react';
import Navbar from './components/Navbar';
import NewsBox from './components/NewsBox';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App =()=>{
  const pageSize=5;
  const apiKey=process.env.REACT_APP_NEWS_API;

  const [progress,setProgress] = useState(0);
    return(
      <div>
        <Router>
          <Navbar/>
          <LoadingBar height={3} color='#f11946' progress={progress}/>
            <Routes>
              <Route exact  path='/' element={<NewsBox setProgress={setProgress} key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general"/>}/>
              <Route exact  path='/business' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>}/>
              <Route exact  path='/technology' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
              <Route exact  path='/sports' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
              <Route exact  path='/entertainment' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
              <Route exact  path='/general' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>}/>
              <Route exact  path='/science' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>}/>
              <Route exact  path='/health' element={<NewsBox setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>}/>
            </Routes>
        </Router>
      </div>
    )
}


export default App;

