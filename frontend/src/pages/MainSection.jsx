import React, { useState, useEffect, useCallback } from 'react';
import JobDescription from '../components/JobDescription';
import JobList from '../components/JobList';
import './mainSection.css';
import axios from 'axios';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/userReducer';
import Config from '../config';

const MainSection = () => {
    const accessToken = useSelector((state) => state.user.accessToken);
    const dispatch = useDispatch();
    const [jobs, setJobs] = useState([]);
    const [selectedJobDetail, setSelectedJobDetail] = useState(null);
    const [fetchJobData, setFetchJobData] = useState(false);

    useEffect(() => {
        // Fetch jobs data from an API
        // Replace this with your API endpoint to fetch jobs
        const fetchData = async () => {
            setFetchJobData(true);
            try {
                const response = await axios.get(`${Config.ip}jobs/`);
                setFetchJobData(false);
                setJobs(response.data);
            } catch (error) {
                setFetchJobData(false);
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
                        const response = await axios.get(`${Config.ip}users/aboutme`, {
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

    const handleJobSelect = useCallback(jobId => {
        const job = jobs.find(j => j.id === jobId);
        setSelectedJobDetail(job);
    }, [jobs]);

    const handleJobSearch = useCallback(async (key, value) => {
        try {
            let data = JSON.stringify({
                [key]: value
            });
            const response = await axios.post(`${Config.ip}jobs/search`, data, {
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
                <JobList jobs={jobs} handleJobSelect={handleJobSelect} handleSearch={handleJobSearch} fetchJobData={fetchJobData} />
                <JobDescription job={selectedJobDetail} handleJobSelect={handleJobSelect} />
            </div>
        </>
    );
};

export default MainSection;