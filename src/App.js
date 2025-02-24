import './App.css';

import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News  from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App=(props)=> {
  const pageSize=15;
  const apiKey=process.env.REACT_APP_NEWS_API;
  const[progress,setProgress]=useState(10);
  const set_Progress = (progress)=>{
    setProgress(progress)
  }
    return (
      <div>
        <Router>
        <LoadingBar
        height={3}
        color="#f11946"
        progress={progress}
      />
        <Navbar />
        <Routes>
          <Route exact path='/' element={<News setProgress={set_Progress} apiKey={apiKey}  key="general" pageSize={pageSize} catagory="general"/>}></Route>
          <Route exact path='/entertainment' element={<News setProgress={set_Progress} apiKey={apiKey}  key="entertainment" pageSize={pageSize} catagory="entertainment"/>}></Route>
          <Route exact path='/business' element={<News setProgress={set_Progress} apiKey={apiKey}  key="business" pageSize={pageSize} catagory="business"/>}></Route>
          <Route exact path='/sports' element={<News setProgress={set_Progress} apiKey={apiKey} key="sports" pageSize={pageSize} catagory="sports"/>}></Route>
          <Route exact path='/technology' element={<News setProgress={set_Progress} apiKey={apiKey} key="technology" pageSize={pageSize} catagory="technology"/>}></Route>
          <Route exact path='/health' element={<News setProgress={set_Progress} apiKey={apiKey} key="health" pageSize={pageSize} catagory="health"/>}></Route>
          <Route exact path='/science' element={<News setProgress={set_Progress} apiKey={apiKey} key="science" pageSize={pageSize} catagory="science"/>}></Route>
        </Routes>
        </Router>
      </div>
    )
}
export default App