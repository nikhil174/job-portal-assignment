// JobList.js
import React, { useState } from 'react';
import JobCard from './JobCard';
import './jobList.css';

const JobList = ({ jobs, handleJobSelect }) => {
  const [searchCriteria, setSearchCriteria] = useState('title');
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchCriteriaChange = e => {
    setSearchCriteria(e.target.value);
  };

  const handleSearchKeywordChange = e => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className='job-list-container'>
      <div className='search-container'>
        <select value={searchCriteria} onChange={handleSearchCriteriaChange}>
          <option value='title'>Title</option>
          <option value='recruiter'>Recruiter Name</option>
          <option value='description'>Description</option>
        </select>
        <input
          type='text'
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          placeholder='Search...'
        />
        <button>Search</button>
      </div>
      <div className='job-list'>
        {jobs.map(job => (
          <JobCard
            id={job.id}
            key={job.id}
            title={job.title}
            description={job.description}
            org={job.organization}
            stack={job.stack}
            postedOn={job.createdAt}
            handleJobSelect={handleJobSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default JobList;
