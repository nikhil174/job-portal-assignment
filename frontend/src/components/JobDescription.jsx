import React, { useState } from 'react'
import './jobDescription.css'

function JobDescription({ selectedJob }) {
  console.log(selectedJob);
  const [jobs, setJobs] = useState(
    [
      {
        "id": 4,
        "title": "SDE1",
        "description": "frontend developer",
        "organization": "Test Org 1",
        "stack": [
          "reactjs",
          "nextjs"
        ],
        "postedById": 6,
        "createdAt": "2024-02-11T07:25:57.879Z",
        "updatedAt": "2024-02-11T07:25:57.879Z",
        "postedBy": {
          "email": "amansingh@gmail.com",
          "name": "Aman Singh"
        }
      },
      {
        "id": 5,
        "title": "HR Manager",
        "description": "HR manager",
        "organization": "Test Org 1",
        "stack": [
          "Communiction"
        ],
        "postedById": 6,
        "createdAt": "2024-02-11T07:27:22.666Z",
        "updatedAt": "2024-02-11T07:27:22.666Z",
        "postedBy": {
          "email": "amansingh@gmail.com",
          "name": "Aman Singh"
        }
      },
      {
        "id": 6,
        "title": "SDE2",
        "description": "Backend Engineer",
        "organization": "Test Org 1",
        "stack": [
          "nodejs",
          "mongodb"
        ],
        "postedById": 6,
        "createdAt": "2024-02-11T07:28:08.043Z",
        "updatedAt": "2024-02-11T07:28:08.043Z",
        "postedBy": {
          "email": "amansingh@gmail.com",
          "name": "Aman Singh"
        }
      },
      {
        "id": 7,
        "title": "SDE1",
        "description": "Frontend Developer",
        "organization": "Test Org 2",
        "stack": [
          "reactjs",
          "Javascript"
        ],
        "postedById": 7,
        "createdAt": "2024-02-11T07:30:44.786Z",
        "updatedAt": "2024-02-11T07:30:44.786Z",
        "postedBy": {
          "email": "priya@gmail.com",
          "name": "Priya Keshari"
        }
      },
      {
        "id": 8,
        "title": "SDE2",
        "description": "Frontend Developer",
        "organization": "Test Org 2",
        "stack": [
          "reactjs",
          "Javascript",
          "nextjs",
          "sytem design"
        ],
        "postedById": 7,
        "createdAt": "2024-02-11T07:31:28.385Z",
        "updatedAt": "2024-02-11T07:31:28.385Z",
        "postedBy": {
          "email": "priya@gmail.com",
          "name": "Priya Keshari"
        }
      }
    ]
  );

  const data = jobs.find(job => job.id == selectedJob)

  return (
    <div className='job-description'>
      {/* {!selectedJob && (
        <div className="empty-container">
          Select a Job to Display
        </div>
      )} */}
      <div className="job-container">
        <div className='job-header'>
          <div className="job-about">
            <div>
              <p id="job-title">{data.title}</p>
              <p id="job-org">{data.organization}</p>
            </div>
            <div>
              <p>Posted on : {data.createdAt}</p>
            </div>
          </div>
          <div className="recruiter">
            <div>
              <p>Recuiter</p>
              <p>{data.postedBy.name}</p>
              <p>{data.postedBy.email}</p>
            </div>
            <div className='applybtn_container'>
              <button id="applybtn">Apply</button>
            </div>
          </div>
        </div>
        <div className="description-section">
          <h2>Description</h2>
          <div className="des-stack">
            {data.stack.map(item => (
              <div className='stack-item'>{item}</div>
            ))}
          </div>
          <div className="des-description">
            {data.description}
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobDescription
