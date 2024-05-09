// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import Profile from './components/Profile';
import Latest from './components/Latest';
import ExperienceDetail from './components/ExperienceDetail';
import Shareexperience from './components/Shareexperience';
import Searchexperience from './components/Searchexperience';
import Aboutus from './components/Aboutus';
import Contactus from './components/Contactus';
import SignIn from './components/SignIn';
import Page2 from './components/Page2';
import UpdateExperience from './components/UpdateExperience';
const App = () => {
  const [currrollno , setcurrrollno]=useState(null);
  return (
    <Router>
       
        
       {/* <Header /> */}
      
       <div style={{ display: 'flex'}}>
        <Sidebar />
        <div style={{flex: '1',  padding: '20px',  marginLeft: '250px' }}>
      <Routes>
      <Route path="/" element={<SignIn setcurrrollno = {setcurrrollno} />}></Route>
      <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile currrollno= {currrollno}/>} ></Route>
        <Route path="/latest" element={<Latest />} />
        <Route path="/getexperience/:id" element={<ExperienceDetail />} />
        <Route path="/updateexperience/:id" element={<UpdateExperience />} />
        <Route path="/share-experience" element={<Shareexperience currrollno= {currrollno} />} />
        <Route path="/search-experience" element={<Searchexperience />} />
        <Route path="/page2" element={<Page2 currrollno= {currrollno} />} />
        <Route path="/about-us" element={<Aboutus />} />
        <Route path="/contact-us" element={<Contactus />} />
      </Routes>
      </div>
      </div>
      {/* <Footer /> */}
       
    </Router>
  );
};

export default App;
