import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const UpdateExperience = ({ match }) => {
    const [experience, setExperience] = useState({});
    const [overallExperience, setOverallExperience] = useState('');
    const [tips, setTips] = useState('');
    const { id } = useParams();
    //console.log("id : ", id)
    //onst id = parseInt(paramid,11)
    console.log("id : ", id)
    const token = localStorage.getItem('token');

    useEffect(() => {
      const fetchExperience = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/experiences/getexperience/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setExperience(response.data[0]);
          console.log("exp in up" , response.data)
          setOverallExperience(response.data[0].overall_experience);
              setTips(response.data[0].tips);
          //setLoading(false);
        } catch (error) {
          console.error('Error fetching experience:', error);
        }
      };
  
      fetchExperience();
    }, [id]);
    const handleSaveChanges = async () => {
        try {
            const response = await axios.put(`http://localhost:3001/experiences/experiences/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
           alert("updates are saved successfully!!")
          } catch (error) {
            console.error('Error fetching experience:', error);
          }
    };

    return (
        <div>
            <h2>Update Experience</h2>
            <div>
                <label>Overall Experience:</label>
                <textarea 
                    value={overallExperience}
                    onChange={(e) => setOverallExperience(e.target.value)}
                ></textarea>
            </div>
            <div>
                <label>Tips:</label>
                <textarea 
                    value={tips}
                    onChange={(e) => setTips(e.target.value)}
                ></textarea>
            </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
    );
};

export default UpdateExperience;
