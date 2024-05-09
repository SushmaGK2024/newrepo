// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';

const linkStyle = {
  textDecoration: 'none',  // Remove the default underline
  color: 'black',          // Set the text color (adjust as needed)
  fontSize: '16px',        // Increase the font size (adjust as needed)
  marginBottom: '3px',    // Increase the gap between items (adjust as needed)
};

const Sidebar = () => {
  return (
    <aside style={{ backgroundColor: "#e3f2fd", position: "fixed", height: "100%", width: "200px", padding: "20px", display: "flex", flexDirection: "column" }}>

      <Link to="/home" style={linkStyle}>
        <div ><h3>Home</h3></div>
      </Link>
      <Link to="/profile" style={linkStyle}>
        <div><h3>Profile</h3></div>
      </Link>
      {/*<Link to="/latest" style={linkStyle}>
        <div><h3>Latest</h3></div>
  </Link>*/}
      <Link to="/share-experience" style={linkStyle}>
        <div><h3>Share Experience</h3></div>
      </Link>
      <Link to="/search-experience" style={linkStyle}>
        <div><h3>Search Experience</h3></div>
      </Link>
      <Link to="/about-us" style={linkStyle}>
        <div><h3>About Us</h3></div>
      </Link>
      <Link to="/contact-us" style={linkStyle}>
        <div><h3>Contact Us</h3></div>
      </Link>
      {/* Add more items as needed */}
      <Link to="/" style={linkStyle}>
        <div style={{color:"#d26969", marginBottom:"0%"}}><h3>Logout</h3></div>
      </Link>
    </aside>
  );
};

export default Sidebar;
