import React from 'react'
import './jobCard.css';

const JobCard = ({ id, title, description, org, stack, postedOn, handleJobSelect }) => {
  // Format the postedOn date to display only the date part
  const formattedDate = new Date(postedOn).toLocaleDateString();

  return (
    <div 
    className='job-card'
    onClick={() => handleJobSelect(id)}
    >
      <h3>{title}</h3>
      <h4>{org}</h4>
      <p>{description}</p>
      <div className='stack'>
        {stack.map((item, index) => (
          <div key={index} className='stack-item'>{item}</div>
        ))}
      </div>
      <p className='posted-on'>Posted: {formattedDate}</p>
    </div>
  );
};

export default JobCard;
