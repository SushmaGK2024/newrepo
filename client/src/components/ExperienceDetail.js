// components/ExperienceDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

const ExperienceDetail = () => {
    console.log("in expdetail");
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/experiences/getexperience/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExperience(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!experience) {
    return <p>Error fetching experience</p>;
  }

  console.log("experience : ", experience);
  const company_name=experience.company_name;
  const rollno= experience.rollno;
  const role_offered=experience.role_offered;
  const overall_experience=experience.overall_experience;
const tips= experience.tips;
  return (
    <div  style={{paddingTop:"30px", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      
      <div className="mb-3" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{width : "70%"}}>

          <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}><h1>{company_name}</h1></div>
          <h2>Added by: {rollno}</h2>
          <h3>Role Offered: {role_offered}</h3>
          <h3>Overall Experience : </h3>
          <p style={{fontSize:"large"}}>{overall_experience}</p>
          <h3>Tips : </h3>
          <p style={{fontSize:"large"}}>{tips}</p>
          </div>
      </div>
      <br/>
      <Button variant="secondary" onClick={() => window.history.back()}>Back</Button>
    </div>
  );
};

export default ExperienceDetail;