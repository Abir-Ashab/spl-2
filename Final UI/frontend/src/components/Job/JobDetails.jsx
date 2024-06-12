import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../main";
import DataInputForm from "./getData";
import "./jobDetails.css"; // Import the CSS file

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [hasApplied, setHasApplied] = useState(false);
  const navigateTo = useNavigate();
  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
      return;
    }

    // Fetch the job details
    axios
      .get(`http://localhost:4000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });

    // Fetch the user's applications to check if they have already applied
    axios
      .get("http://localhost:4000/api/v1/application/jobseeker/getall", {
        withCredentials: true,
      })
      .then((res) => {
        const applications = res.data.applications;
        const applied = applications.some((app) => app.jobId === id);
        setHasApplied(applied);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, [id, isAuthorized, navigateTo]);

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span>{job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
          </p>
          {user && user.role === "Employer" ? (
            <div className="job-actions">
              <DataInputForm inputValue={job.category} />
            </div>
          ) : (
            <>
              {hasApplied ? (
                <p className="applied-message">You have already applied to this job.</p>
              ) : (
                <div className="job-actions">
                  <Link to={`/application/${job._id}`}>Apply Now</Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;
