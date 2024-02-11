import React, { useMemo } from 'react'
import './jobDescription.css'
import { useDispatch, useSelector } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { addAppliedJob } from '../store/userReducer';

function JobDescription({ job }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.user.accessToken);
  const appliedJobs = useSelector((state) => state.user.appliedJobs);
  console.log(appliedJobs);
  const applied = appliedJobs.length && job ? appliedJobs.includes(job.id) : false;

  const handleApply = useMemo(() => {
    return async (id) => {
      try {
        await axios.post(`http://localhost:5000/jobs/${id}/apply`, {}, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        dispatch(addAppliedJob(id));
        toast.success('Applied to Job successfully');
      } catch (error) {
        toast.error('Failed to apply to job');
        console.log(error);
      }
    }
  }, []);

  return (
    <div className='job-description'>
      {!job ? (
        <div className="empty-container">
          Select a Job to Display
        </div>
      ) : (
        <div className="job-container">
          <div className='job-header'>
            <div className="job-about">
              <div>
                <p id="job-title">{job.title}</p>
                <p id="job-org">{job.organization}</p>
              </div>
              <div>
                <p>Posted on : {job.createdAt}</p>
              </div>
            </div>
            <div className="recruiter">
              <div>
                <p>Recuiter</p>
                <p>{job.postedBy.name}</p>
                <p>{job.postedBy.email}</p>
              </div>
              <div className='applybtn_container'>
                <button
                  id="applybtn"
                  className={applied ? "disabledbtn" : ""}
                  disabled={applied}
                  onClick={() => handleApply(job.id)}
                >
                  {applied ? "Applied" : "Apply"}
                </button>
              </div>
            </div>
          </div>
          <div className="description-section">
            <h2>Description</h2>
            <div className="des-stack">
              {job.stack.map(item => (
                <div className='stack-item'>{item}</div>
              ))}
            </div>
            <div className="des-description">
              {job.description}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobDescription
