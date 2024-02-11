import React, { useState, useEffect, useCallback } from 'react';
import JobDescription from '../components/JobDescription';
import JobList from '../components/JobList';
import './mainSection.css';
import axios from 'axios';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userReducer';

const MainSection = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);
    const [selectedJobDetail, setSelectedJobDetail] = useState(null);

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
        if (!accessToken) {
            const accessToken = localStorage.getItem('jobify_token');
            if (accessToken) {
                const fetchUserData = async () => {
                    try {
                        const response = await axios.get('http://localhost:5000/users/aboutme', {
                            headers: {
                                'Authorization': `Bearer ${accessToken}`
                            }
                        });
                        const { name, role, appliedJobs, postedJobs } = response.data;
                        // Dispatch action to store access token in Redux
                        dispatch(login({ accessToken, name, role, appliedJobs, postedJobs }));
                    } catch (error) {
                        console.log(error);
                    }
                }
                fetchUserData();
            }
        }
    }, []);

    const handleJobSelect = jobId => {
        const job = jobs.find(j => j.id === jobId);
        setSelectedJobDetail(job);
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
        <>
        <Header />
        <div className="jobs_container">
            <JobList jobs={jobs} handleJobSelect={handleJobSelect} handleSearch={handleJobSearch} />
            <JobDescription job={selectedJobDetail} handleJobSelect={handleJobSelect} />
        </div>
        </>
    );
};

export default MainSection;