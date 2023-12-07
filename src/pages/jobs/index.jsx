import React from 'react';
import './index.css'; // Import the CSS file for styling

const Jobs = () => {
  const jobExperiences = [
    {
      title: 'Full Stack Developer (Co-op) at Cargurus',
      date: 'Jan 2023 – Jun 2023',
      description: [
        'Developed RESTful APIs and client classes to support C2D offer evaluation, including checking offer eligibility, retrieving inventory listings, and triggering email events within Iterable. Also, performed Unit test with JUnit.',
        'Contributed to frontend development for C2D2, including loading animations, UI display changes in the preOffer form, data tracking analytics, and enhancing landing page elements.',
        'Optimized playwright automated E2E testing by implementing the self-scheduler feature and effectively addressing other issues such as flaky behavior and picture loading timeouts.',
        'Assisted team members in troubleshooting and resolved data format conflicts among different projects.',
      ],
    },
    {
      title: 'Frontend Developer (Full-time) at S.F. Express Co.LTD',
      date: 'Aug 2020 - Jun 2021',
      description: [
        'Developed new features for multiple cross-functional agile teams (Campus Delivery team) on a bi-weekly basis. Released 7 major version updates and 15 minor version updates.',
        'Designed and implemented JavaScript and React.js-based UI/UX, collaborating with the team to propose interface optimization solutions that resulted in a 23% increase in monthly delivery order volume.',
        'Collaborated cross-functionally to support the medicine delivery team and created a web application MVP for migrating 4 main features from other platforms.',
        'Contributed to the department\'s IT infrastructure (UI library) by developing and documenting 3 reusable front-end components, including a customized table and a signature pad, saving over 10 hours of development time per month.',
      ],
    },
    {
      title: 'Software Development Engineer (Internship) at Hangzhou Yuancheng Technology',
      date: 'Feb 2020 – Jun 2020',
      description: [
        'Communicated with the data warehouse team to identify common problems for products and revamped the data audit system with Vue.js, then integrated some technical solutions, such as data validation, and file import. The upgraded system helped to reduce the total rate of dirty data by 1.2%.',
        'Visualized data reports and developed 6 data charts with echarts.js and d3.js for the data analysis team.',
        'Deployed micro-services and CI/CD pipelines with Jenkins + GitLab to increase the scalability/reliability and deployment velocity of the platform.',
        'Participated actively in Scrum/code review meetings and made 2 presentations about the best practices of front-end tools.',
      ],
    },
  ];

  return (
    <div className="jobs-container">
      <h1 className="jobs-heading">Work Experience</h1>

      {jobExperiences.map((experience, index) => (
        <div key={index} className="job-experience">
          <h2>{experience.title}</h2>
          <p className="job-date">{experience.date}</p>
          <ul className="job-description">
            {experience.description.map((desc, i) => (
              <li key={i}>{desc}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Jobs;
