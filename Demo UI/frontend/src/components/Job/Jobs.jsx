import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import { Card, Space, Select } from 'antd';

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
        // Filter jobs based on selected filters
        const filteredJobs = response.data.jobs.filter(job => {
          return (
            (!categoryFilter || job.category === categoryFilter) &&
            (!countryFilter || job.country === countryFilter) &&
            (!cityFilter || job.city === cityFilter)
          );
        });
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
    setCountryFilter(value === "null" ? null : value); // Convert "null" string to null
    setCityFilter(null); // Reset city filter when country changes
  };

  const handleCityChange = (value) => {
    setCityFilter(value === "null" ? null : value); // Convert "null" string to null
  };

  return (
    <section className="jobs page">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">ALL AVAILABLE JOBS</h1>
        <div className="flex justify-between mb-4">
          <Select
            placeholder="Select Category"
            style={{ width: 200 }}
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
            style={{ width: 200 }}
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
            style={{ width: 200 }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {jobs.map((element) => (
            <div key={element._id}>
              <Card
                title={element.title}
                extra={<Link to={`/job/${element._id}`}>More</Link>}
                style={{ width: 300 }}
              >
                <Space direction="vertical" size={16}>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <p>{element.city}</p>
                </Space>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
