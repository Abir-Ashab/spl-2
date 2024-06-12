import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Card, Select } from 'antd';
import "./jobs.css"; // Import CSS file for styling

const { Option } = Select;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [countryFilter, setCountryFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
          params: {
            category: categoryFilter,
            country: countryFilter,
            city: cityFilter
          }
        });
        const filteredJobs = response.data.jobs.filter(job => (
          (!categoryFilter || job.category === categoryFilter) &&
          (!countryFilter || job.country === countryFilter) &&
          (!cityFilter || job.city === cityFilter)
        ));
        setJobs(filteredJobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, [categoryFilter, countryFilter, cityFilter]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleCategoryChange = (value) => {
    setCategoryFilter(value);
  };

  const handleCountryChange = (value) => {
    setCountryFilter(value === "null" ? null : value);
    setCityFilter(null);
  };

  const handleCityChange = (value) => {
    setCityFilter(value === "null" ? null : value);
  };

  return (
    <section className="jobs-page">
      <div className="container">
        <h1 className="page-title">ALL AVAILABLE JOBS</h1>
        <div className="filters">
          <Select
            placeholder="Select Category"
            onChange={handleCategoryChange}
            allowClear
          >
            {jobs.map((element) => (
              <Option key={element.id} value={element.category}>
                {element.category}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select Country"
            onChange={handleCountryChange}
            allowClear
          >
            {jobs.map((element) => (
              <Option key={element.id} value={element.country}>
                {element.country}
              </Option>
            ))}
          </Select>
          <Select
            placeholder="Select City"
            onChange={handleCityChange}
            allowClear
          >
            {jobs.map((element) => (
              <Option key={element.id} value={element.city}>
                {element.city}
              </Option>
            ))}
          </Select>
        </div>
        <div className="job-cards">
          {jobs.map((element) => (
            <Card
              key={element._id}
              title={element.title}
              extra={<Link to={`/job/${element._id}`}>More</Link>}
              className="job-card"
            >
              <div className="job-info">
                <p><strong>Category:</strong> {element.category}</p>
                <p><strong>Country:</strong> {element.country}</p>
                <p><strong>City:</strong> {element.city}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
