import React, { useState, useEffect, useCallback } from 'react';
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
            try {
                const response = await axios.get('http://localhost:5000/jobs/');
                setJobs(response.data);
            } catch (error) {
                console.log(error);
                setJobs([]);
            }
        }
        fetchData();
    }, []);

    const handleJobSelect = jobId => {
        setSelectedJob(jobId);
    };

    const handleJobSearch = useCallback(async (key, value) => {
        try {
            let data = JSON.stringify({
                [key]: value
            });
            const response = await axios.post('http://localhost:5000/jobs/search', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setJobs(response.data);
        } catch (error) {
            console.log(error);
            setJobs([]);
        }
    }, []);

    return (
        <div className="jobs_container">
            <JobList jobs={jobs} handleJobSelect={handleJobSelect} handleSearch={handleJobSearch} />
            <JobDescription selectedJob={selectedJob} handleJobSelect={handleJobSelect} />
        </div>
    );
};

export default MainSection;