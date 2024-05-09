import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const ExperienceCard = ({ experience }) => {
  const { title, description, readMore } = experience;
  const company = experience.company_name;
  const rollNo = experience.rollno;
  const roleOffered = experience.role_offered;
  const overall_experience = experience.overall_experience;
  const truncatedOverallExperience = overall_experience.slice(0, 150) + '...';

 /* const sentimentResult = sentiment.analyze(experience.overall_experience);
  const sentimentColor = sentimentResult.score > 0 ? 'green' : sentimentResult.score < 0 ? 'red' : 'grey';

  const difficultyLevel = getDifficultyLevel([experience]);
  let difficultyGradient;

  switch (difficultyLevel) {
    case 'Easy':
      difficultyGradient = 'linear-gradient(to right, #b9e68c, #69db7c)';
      break;
    case 'Moderate':
      difficultyGradient = 'linear-gradient(to right, #ffeaa7, #ff9f43)';
      break;
    case 'Difficult':
      difficultyGradient = 'linear-gradient(to right, #ff7979, #eb4d4b)';
      break;
    default:
      difficultyGradient = 'linear-gradient(to right, #dcdde1, #b2bec3)';
      break;
  }
*/
  return (
    <Card className="experiencecard" style={{ width: "95%" }}>
      <Card.Body style={{width : "100%"}}>
        <Card.Title style={{ fontSize: "large", fontWeight: "bold" }}>{company}</Card.Title>
        <Card.Text>Batch : {experience.batch}</Card.Text>
        <Card.Text>Role Offered : {roleOffered}</Card.Text>
        <Card.Text>{truncatedOverallExperience}</Card.Text>
        {/*<div style={{ color: sentimentColor }}>
          Sentiment: {sentimentResult.score > 0 ? 'Positive' : sentimentResult.score < 0 ? 'Negative' : 'Neutral'}
        </div>
        <div style={{ marginTop: '10px', marginBottom:'8px',display: 'flex', alignItems: 'center' }}>
          Difficulty : {difficultyLevel}
          <span 
            style={{ 
              backgroundImage: difficultyGradient,
              width: '50px', 
              height: '10px', 
              marginLeft: '10px', 
              display: 'inline-block',
              borderRadius: '5px'
            }}>
          </span>
          </div>*/}
          <div>
        <Link to={`/getexperience/${experience.experience_id}`}>
          <Button variant="primary">Read More</Button>
        </Link>
        <Link to={`/getexperience/${experience.experience_id}`}>
          <Button variant="primary" style={{float: "right"}}>Delete</Button>
        </Link>
        <Link to={`/updateexperience/${experience.experience_id}`}>
          <Button variant="primary" style={{float: "right"}}>Update</Button>
        </Link>
        </div>
      </Card.Body>
    </Card>
  );
};

const Profile = (props) => {
  const {currrollno}=props;
    const [user, setUser] = useState(null);
    const history = useNavigate();
  
    useEffect(() => {
      if (!currrollno) {
        // Redirect to sign-in if currrollno is null
        history('/');
      } else {
        // Fetch user profile
        const fetchUserProfile = async () => {
          try {
            const response = await axios.get(`http://localhost:3001/users/profile/${currrollno}`);
            setUser(response.data);
          } catch (error) {
            console.error('Error fetching user profile:', error);
          }
        };
  
        fetchUserProfile();
      }
    }, [currrollno, history]);
  
    const handleLogout = () => {
      // Clear local storage and redirect to sign-in page
      localStorage.removeItem('token');
      localStorage.removeItem('currrollno');
      history('/');
    };
  
  console.log(props);
  
  const token= localStorage.getItem("token");
  console.log(currrollno);
  //const [user, setUser] = useState(null);
  const [academicDetails, setAcademicDetails] = useState(null);
  const [placementRecords, setPlacementRecords] = useState(null);
  const [experiences, setExperiences] = useState(null);
  console.log("in profile");
  useEffect(() => {
    //console.log("rollno : ",rollno)
    
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/users/profile/${currrollno}`);
       
        setUser(response.data);
        console.log("in fectch")
        console.log("user : ",user);
       // setAcademicDetails(response.data.academic_info);
       // setPlacementRecords(response.data.placementRecords);
        //setExperiences(response.data.experiences);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();

    const fetchExperiences = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/experiences/experience/${currrollno}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
        setExperiences(response.data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      }
    };

    fetchExperiences();

    const fetchPlacementRecords = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/placements/placementrecord/${currrollno}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPlacementRecords(response.data);
        console.log("placement records : ",placementRecords)
      } catch (error) {
        console.error('Error fetching placement records:', error);
      }
    };
    fetchPlacementRecords();
  }, [currrollno]);
  if (!user) {
    return <div>Loading...</div>;
  }
 
 
  return (
    <div>
      <div className="profile-container">
      <div style={{display:"flex", flexDirection: "column"}}>
      
      <h2 className="profile-title">User Profile</h2>
      <div style={{marginBottom:"5px"}}>
      <button onClick={handleLogout}style={{ display : "flex",float:"left", marginRight:"10px", }} >Change Password</button>
      <button onClick={handleLogout}style={{ display : "flex",float:"right"}} >Logout</button>
      <button onClick={handleLogout}style={{ display : "flex",float:"right", marginRight:"10px"}} >Edit</button>
      </div>
      </div>
     <div className="profile-row">
   

      <h3 className="profile-section-title">User Information:</h3>
      
      <div className="profile-section-row">
        <div className="profile-pic-col" style={{display:"flex",justifyContent:"space-between"}}>
        <img class="profile_image" src="https://www.pngkey.com/png/detail/52-523516_empty-profile-picture-circle.png" alt="thanujathrgyt" />
      
        </div>
        <div className="profile-info-username-col">
          <div>Name: {user.full_name} </div>
          <br/>
          <div className="profile-info-item">RollNo: {currrollno}</div>
         
        </div>

      </div>
      </div>
      <hr style={{border: "1px solid #EAEBEF",margin:"20px 0px"}}></hr>
      <div className="profile-section-academic">
        <h3 className="profile-section-title">Academic Details:</h3>
       <div className="profile-info-item">Degree: {user.degree}</div>
        <div className="profile-info-item">Major: {user.major}</div>
        <div className="profile-info-item">{user.academic_info}</div>

      </div>
     {/*} <div className="profile-section">
  <h3 className="profile-section-title">Placement Records:</h3>
  {placementRecords && placementRecords.length > 0 ? (
    <ul className="experience-list">
      {placementRecords.map((record, index) => (
        <li key={index} className="experience-item">
          <h3 className="experience-company">Company : {record.company_name}</h3>
          <div className="profile-info-item">Role : {record.role}</div>
          <div className="profile-info-item">CTC : {record.ctc}</div>
        </li>
      ))}
    </ul>
  ) : (
    <div className="profile-info-item">No placement records found.</div>
  )}
</div>
  */}
    <hr style={{border: "1px solid #EAEBEF",margin:"20px 0px"}}></hr>
      
      <div className="profile-section-experience">
        <h3 className="profile-section-title">Experiences</h3>
        {experiences && experiences.length > 0 ? (
          <ul className="experience-list">
            {experiences.map((experience) => (
               <ExperienceCard key={experience.experience_id} experience={experience} />
            ))}
          </ul>
        ) : (
          <div className="profile-info-item">No experiences found.</div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Profile;