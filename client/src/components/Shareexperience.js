import {React, useState} from 'react';
import './Shareexperience.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { useAlert } from './Alert';
import { useDispatch } from 'react-redux';
// Inside your component
import Page2 from './Page2';


// Inside your component
//onst setAlert = useAlert();
const Shareexperience = (props) =>{
  const dispatch = useDispatch();
 // const setAlert = useAlert();
  const {currrollno}=props;
  console.log("rollno : ", currrollno);
  const navigate = useNavigate();

  const [companyName,setCompanyName] =useState('');
  const [location,setLocation] =useState('');
  const [batch , setBatch]=useState('');
  const[educationalCriteria, setEducationalCriteria]=useState('');
  const[roleOffered, setRoleOffered]=useState('');
  const [overallExperience,setOverallExperience] = useState('');
  const [tips, setTips] = useState('');
  const [overallRows, setOverallRows] = useState(4);
  const [tipsRows, setTipsRows] = useState(4);

  async function handleSubmit(e) {
    e.preventDefault();
  
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    console.log(token);
  
    const newExperience = {
      userId: userId,
      rollno : currrollno,
      company: companyName,

      batch :batch,
      roleOffered : roleOffered,
      educationalCriteria : educationalCriteria,
      overallExperience : overallExperience,
      tips : tips,
    
    };
    console.log(newExperience);
  
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
  
      const body = JSON.stringify(newExperience);
  
      const res = await axios.post('http://localhost:3001/experiences/add-experience', body, config);
      
      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: res.data
      });
  
     // setAlert('Experience Added', 'success');
     console.log("experience added successfully")
    } catch (err) {
      dispatch({
        type: 'EXPERIENCE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }

  return (
    
     <div style={{justifyContent : "center",  display:"flex", width :"100%"}}>
    <div className="share-experience-container">
      
      <h2 className="share-experience-title">Share Your Experience</h2>
      <form onSubmit={handleSubmit}>
  <label htmlFor="company-name">Company name: <span style={{ color: 'red' }}>*</span></label>
  <input
    type="text"
    id="company-name"
    name="company-name"
    value={companyName}
    onChange={(event) => setCompanyName(event.target.value)}
    required
  />
  <div style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'space-between'}}>
    <div className="role-offered-container">
      <label htmlFor="role-offered">Role offered: <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        id="role-offered"
        name="role-offered"
        value={roleOffered}
        onChange={(event) => setRoleOffered(event.target.value)}
        required
      />
    </div>
    <div className="batch-container">
      <label htmlFor="batch">Batch: <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        id="batch"
        name="batch"
        value={batch}
        onChange={(event) => setBatch(event.target.value)}
        required
      />
    </div>
    
  </div>
  <div style={{ display: 'flex', flexDirection: 'row' , justifyContent: 'space-between', width:"100%"}}>
  <div className="location-container">
      <label htmlFor="location">Company location: <span style={{ color: 'red' }}>*</span></label>
      <input
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        required
      />
    </div>
    <div className="placed-container">
    <label htmlFor="placed">Are you placed in this company ?</label>
    <div style={{display:"flex", flexDirection : "row", justifyContent:"space-between", alignItems:"center"}}>
      <label htmlFor="placed">yes </label>
      <input
        type="radio"
        id="placed-yes"
        name="placed"
        value="yes"
        required
      />
      <label htmlFor="placed-no">No</label>
      <input
        type="radio"
        id="placed-no"
        name="placed"
        value="no"
      />
      </div>
    </div>
    </div>
    <br/>
    <button type="button" onClick={() => navigate(`/page2`, { state: { companyName, location, batch, roleOffered } })}>Next</button>
        </form>
      </div>
      {/*<Switch>
        <Route path="/page2" component={() => <Page2 currrollno={currrollno} dispatch={dispatch} navigate={navigate} />} />
      </Switch>
  */}
    </div>
  );
};

export default Shareexperience;