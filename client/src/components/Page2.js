import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Page2 = ({ currrollno, dispatch, navigate }) => {
  const [educationalCriteria, setEducationalCriteria] = useState('')
  const [techInterviewRounds, setTechInterviewRounds] = useState(0)
  const [hrInterviewRounds, setHrInterviewRounds] = useState(0)
  const [overallExperience, setOverallExperience] = useState('')
  const [tips, setTips] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [location, setLocation] = useState('')
  const [batch, setBatch] = useState('')
  const [roleOffered, setRoleOffered] = useState('')

  dispatch = useDispatch()
   navigate = useNavigate()

  // extract data from props
  const { state } = useLocation()
  console.log("state : ", state);
  //const {  locationin, batchin, roleOfferedin } = state || {}
 const companyNamein=state.companyName;
 const locationin= state.location;
 const batchin = state.batch;
 const roleOfferedin=state.roleOffered;
  // initialize state variables with props data
  useEffect(() => {
    setCompanyName(companyNamein)
    setLocation(locationin)
    setBatch(batchin)
    setRoleOffered(roleOfferedin)
  }, [companyNamein, locationin, batchin, roleOfferedin])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("rollno in page 2 : ", currrollno);
    const newExperience = {
      userId: localStorage.getItem('userId'),
      rollno: currrollno,
      company: companyName,
      
      batch,
      roleOffered,
      educationalCriteria,
     
      overallExperience,
      tips,
    }
    console.log("expereince : ",newExperience);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }

      const body = JSON.stringify(newExperience)

      const res = await axios.post(
        'http://localhost:3001/experiences/add-experience',
        body,
        config
      )

      dispatch({
        type: 'ADD_EXPERIENCE',
        payload: res.data,
      })

      console.log('experience added successfully')

      // navigate back to the previous page
      navigate(-1)
    } catch (err) {
      dispatch({
        type: 'EXPERIENCE_ERROR',
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

  return (
    <div style={{justifyContent : "center",  display:"flex", width :"100%"}}>
     <div style={{display:"flex", flexDirection:"column",alignItems:"center",backgroundColor:"#eaf6f6", width : "100%"}}>
      <form onSubmit={handleSubmit}>
        <label htmlFor="educational-criteria">Educational criteria:</label>
        <input
          type="text"
          id="educational-criteria"
          name="educational-criteria"
          value={educationalCriteria}
          onChange={(event) => setEducationalCriteria(event.target.value)}
          required
        />
        <div style={{ display: 'flex', flexDirection: 'row' , justifyContent: "space-between"}}>
          <div className="tech-rounds-container" style={{paddingRight : "15px"}}>
            <label htmlFor="tech-rounds">Number of technical interview rounds:</label>
            <input
              type="number"
              id="tech-rounds"
              name="tech-rounds"
              value={techInterviewRounds}
              onChange={(event) => setTechInterviewRounds(event.target.value)}
              required
            />
          </div>
          <div className="hr-rounds-container" style={{paddingLeft:"15px"}}>
            <label htmlFor="hr-rounds">Number of HR interview rounds:</label>
            <input
              type="number"
              id="hr-rounds"
              name="hr-rounds"
              value={hrInterviewRounds}
              onChange={(event) => setHrInterviewRounds(event.target.value)}
              required
            />
          </div>
        </div>
        <label htmlFor="overall-experience">Overall experience:</label>
        <textarea
          id="overall-experience"
          name="overall-experience"
          value={overallExperience}
          onChange={(event) => setOverallExperience(event.target.value)}
          required
          rows={4}
        />
        <label htmlFor="tips">Tips:</label>
        <textarea
          id="tips"
          name="tips"
          value={tips}
          onChange={(event) => setTips(event.target.value)}
          required
          rows={4}
        />
        <button type="submit">Submit Experience
        </button> </form> </div>  </div>) }
export default Page2;