import React from 'react';
import './index.css'; // Import the CSS file for styling

const teamMembers = [
  { name: 'Kun Li', email: 'li.kun1@northeastern.edu', role: 'Team Leader' },
  { name: 'Boyuan Ye', email: 'ye.boy@northeastern.edu', role: 'Member' },
  { name: 'Qiang Jiang', email: 'jiang.qian@northeastern.edu', role: 'Member' },
  { name: 'Liangshun Dong', email: 'dong.lia@northeastern.edu', role: 'Member' },
  { name: 'Jinming Zhang', email: 'zhang.jinmin@northeastern.edu', role: 'Member' },
];

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>

      <p className="about-description">
        Welcome to our team! We are a group of dedicated individuals working together to achieve our goals.
      </p>

      <div className="about-team">
        <h2>Meet Our Team</h2>
        <ul className="team-members">
          {teamMembers.map((member, index) => (
            <li key={index}>
              <strong>{member.name}</strong> - {member.role}
              <br />
              Email: {member.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default About;
