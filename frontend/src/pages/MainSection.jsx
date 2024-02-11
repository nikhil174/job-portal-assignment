import React, { useState, useEffect } from 'react';
import JobDescription from '../components/JobDescription';
import JobList from '../components/JobList';
import './mainSection.css';
import axios from 'axios';

const MainSection = () => {
    const [selectedJob, setSelectedJob] = useState(6);
    const [jobs, setJobs] = useState([]);

      useEffect(() => {
        // Fetch jobs data from an API
        // Replace this with your API endpoint to fetch jobs
        const fetchData = async () => {
            const response = await axios.get('http://localhost:5000/jobs/');
            console.log(response.data);
        }
        fetchData();
      }, []);

    const handleJobSelect = jobId => {
        setSelectedJob(jobId);
    };

    return (
        <div className="jobs_container">
            <JobList jobs={jobs} handleJobSelect={handleJobSelect} />
            <JobDescription selectedJob={selectedJob} handleJobSelect={handleJobSelect} />
        </div>
    );
};

export default MainSection;