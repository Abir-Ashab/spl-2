import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import ResumeModal from "./ResumeModal";

const MyApplications = () => {
  const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const [jobIDs, setJobIDs] = useState([]);
  const [selectedJobID, setSelectedJobID] = useState("");
  const navigateTo = useNavigate();


  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
      return;
    }

    const fetchApplications = async () => {
      try {
        const endpoint =
          user && user.role === "Employer"
            ? "http://localhost:4000/api/v1/application/employer/getall"
            : "http://localhost:4000/api/v1/application/jobseeker/getall";
        const res = await axios.get(endpoint, { withCredentials: true });
        setApplications(res.data.applications);

        // Fetching unique job IDs from applications
        const uniqueJobIDs = [...new Set(res.data.applications.map(app => app.jobId))];
        setJobIDs(uniqueJobIDs);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    fetchApplications();
  }, [isAuthorized, navigateTo, user]);

  const handleJobIDChange = (e) => {
    setSelectedJobID(e.target.value);
  };

  const deleteApplication = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:4000/api/v1/application/delete/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const filteredApplications = selectedJobID
    ? applications.filter((application) => application.jobId === selectedJobID)
    : applications;

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>{user && user.role === "Job Seeker" ? "My Applications" : "Applications From Job Seekers"}</h1>

      
          {
            user && user.role === "Employer" ? (
              <div>
                  <div className="job-id-dropdown">
                
                  <label htmlFor="job-id">Filter by Job ID:</label>
                <select id="job-id" value={selectedJobID} onChange={handleJobIDChange}>
                <option value="">All Job IDs</option>
                {jobIDs.map((jobID) => (
                  <option key={jobID} value={jobID}>{jobID}</option>
                ))}
                </select>
                  </div>
                  <div>
                  <Link to={`/applications/me/filter`}>Use Filter</Link>
                  </div>
              </div>

            ):(
              <></>
            )
          }
        {filteredApplications.length <= 0 ? (
          <h4>No Applications Found</h4>
        ) : (
          filteredApplications.map((element) => (
            user && user.role === "Job Seeker" ? (
              <JobSeekerCard
                element={element}
                key={element._id}
                deleteApplication={deleteApplication}
                openModal={openModal}
              />
            ) : (
              <EmployerCard
                element={element}
                key={element._id}
                openModal={openModal}
              />
            )
          ))
        )}
      </div>

      {modalOpen && (
        <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
      )}
    </section>
  );
};

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
 
  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
        <p><span>Job ID:</span> {element.jobId}</p>
        <div>
          <Link to={`/job/view/${element.jobId}`}>view</Link>
        </div>
      </div>
      <div className="resume">
        <a href={`http://localhost:4000/uploads/${element.resume.split('\\').pop()}`} target="_blank" rel="noreferrer">
          View Resume
        </a>
      </div>
      
      <div className="btn_area">
        <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
      </div>
    
    </div>
    
  );
};

const EmployerCard = ({ element, openModal }) => {
  const showPdf = (pdf) => {
    const pdfFileName = pdf.split('\\').pop();
    window.open(`http://localhost:4000/uploads/${pdfFileName}`, "_blank", "noreferrer");
  };

  return (
    <div className="job_seeker_card">
      <div className="detail">
        <p><span>Name:</span> {element.name}</p>
        <p><span>Email:</span> {element.email}</p>
        <p><span>Phone:</span> {element.phone}</p>
        <p><span>Address:</span> {element.address}</p>
        <p><span>CoverLetter:</span> {element.coverLetter}</p>
        <p><span>Job ID:</span> {element.jobId}</p>
        <div>
          <Link to={`/job/view/${element.jobId}`}>view</Link>
        </div>

      </div>
      <div className="resume">
        <button onClick={() => showPdf(element.resume)}>Show Resume</button>
      </div>
    </div>
  );
};

export default MyApplications;
