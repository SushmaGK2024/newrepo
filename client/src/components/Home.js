import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Form, Button } from 'react-bootstrap';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import Sentiment from 'sentiment';

import './Home.css';

const sentiment = new Sentiment();

const calculateSentiment = (experiences) => {
  let totalScore = 0;
  let positiveCount = 0;
  let negativeCount = 0;
  let neutralCount = 0;

  experiences.forEach((experience) => {
    const result = sentiment.analyze(experience.overall_experience);
    totalScore += result.score;

    if (result.score > 0) {
      positiveCount++;
    } else if (result.score < 0) {
      negativeCount++;
    } else {
      neutralCount++;
    }
  });

  const totalCount = experiences.length;
  const positivePercentage = (positiveCount / totalCount) * 100;
  const negativePercentage = (negativeCount / totalCount) * 100;
  const neutralPercentage = (neutralCount / totalCount) * 100;

  return {
    sentimentScore: totalScore / totalCount,
    positivePercentage,
    negativePercentage,
    neutralPercentage,
  };
};

const calculateHiringPercentage = (experiences) => {
  let hiredCount = 0;

  experiences.forEach((experience) => {
    if (experience.hired) {
      hiredCount++;
    }
  });

  const totalCount = experiences.length;
  return (hiredCount / totalCount) * 100;
};

const ExperienceCard = ({ experience }) => {
  const { company_name, rollno, role_offered, overall_experience } = experience;
  const truncatedOverallExperience = overall_experience.slice(0, 150) + '...';
  const sentimentResult = sentiment.analyze(overall_experience);
  const sentimentColor = sentimentResult.score > 0 ? 'green' : sentimentResult.score < 0 ? 'red' : 'grey';

  return (
    <Card className="experiencecard" style={{ width: "95%" }}>
      <Card.Body>
        <Card.Title style={{ fontSize: "large", fontWeight: "bold" }}>{company_name}</Card.Title>
        <Card.Text>Batch : {experience.batch}</Card.Text>
        <Card.Text>Role Offered : {role_offered}</Card.Text>
        <Card.Text>{truncatedOverallExperience}</Card.Text>
        <div style={{ color: sentimentColor , paddingBottom:"5px"}}>
          Sentiment: {sentimentResult.score > 0 ? 'Positive' : sentimentResult.score < 0 ? 'Negative' : 'Neutral'}
        </div>
        <Link to={`/getexperience/${experience.experience_id}`}>
          <Button variant="primary">Read More</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

const Home = () => {
  const history = useNavigate();
  const quotes = [
    { text: "Connecting students with the best opportunities, one story at a time." },
    { text: "Empowering students to make informed decisions through shared experiences." },
    { text: "Explore, learn, and grow with the Placement Experience Portal." }
  ];
  const [recentExperiences, setRecentExperiences] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/experiences/experience`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setRecentExperiences(response.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchData();
  }, []);

  const { sentimentScore, positivePercentage, negativePercentage, neutralPercentage } = useMemo(() => {
    return calculateSentiment(recentExperiences);
  }, [recentExperiences]);

  const hiringPercentage = useMemo(() => {
    return calculateHiringPercentage(recentExperiences);
  }, [recentExperiences]);

  const doughnutData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [{
      data: [positivePercentage, neutralPercentage, negativePercentage],
      backgroundColor: ['green', 'grey', 'red'],
      hoverOffset: 4
    }]
  };

  return (
    <div className="home-container">
      <h1 className="welcome-message">Placement Experience Sharing Portal</h1>
      <div className="quotes-container">
        {quotes.map((quote, index) => (
          <p key={index} className="quote-text">"{quote.text}"</p>
        ))}
      </div>
      <div className="content-container">
        <p className="content-description">
          Welcome to our platform where you can share, learn, and grow through the experiences of your peers.
          <br />
          <br />
          Discover valuable insights, gain confidence, and navigate your career path with wisdom from those who've walked it before.
        </p>
        <div className="buttons-container">
          <button className="share-experience-button" onClick={() => history('/share-experience')}>
            Share Your Experience
          </button>
          <button className="search-button" onClick={() => history('/search-experience')}>
            Search for an experience
          </button>
        </div>
        <div className="charts-container">
          <div className="sentiment-chart">
            <Doughnut data={doughnutData} />
            <p className="sentiment-summary">Average sentiment of recent experiences is {sentimentScore.toFixed(2)}</p>
          </div>
          <div className="hiring-chart">
            <Doughnut
              data={{
                labels: ['Hired', 'Not Hired'],
                datasets: [{
                  data: [hiringPercentage, 100 - hiringPercentage],
                  backgroundColor: ['green', 'grey'],
                  hoverOffset: 4
                }]
              }}
            />
            <p className="hiring-summary">Hiring percentage of recent experiences is {hiringPercentage.toFixed(2)}%</p>
          </div>
        </div>
        <div className="recent-experiences-title">Top 10 Recent Experiences</div>
        <div className="recent-experiences-container">
          <div className="experience-row">
            {recentExperiences.map((experience, index) => (
              <div className="experience-card" key={experience.experience_id}>
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
