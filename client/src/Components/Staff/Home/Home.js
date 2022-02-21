import React, { useEffect, useContext, useState } from 'react'
import './Home.css'
import { useHistory } from 'react-router-dom'
import PageContext from '../../../Context/PageContext';
import UserContext from '../../../Context/UserContext';
import OfficeImg from './OfficeImg'

const Home = () => {
  const history = useHistory();
  const { staffName } = useContext(UserContext);
  const { jobs } = useContext(PageContext);
  const [numOfincomingJobs, setNumOfincomingJobs] = useState(0);
  const [jobcounters, setJobcounters] = useState([]);
  //redirect to different page
  const redirect = (slashTo) => {
    history.push(slashTo);
  }

  //
  const getNumberOfNewJobs = (jobs) => {
    return jobs.filter(job => (job.status === "Paid For")).length
  }

  //
  const getjobcounts = (jobs)=>{
    console.log(jobs);
    
    let array = [0,0];
    jobs.forEach(job => {
      if (job.status == "Paid For") array[0]+=1;
      else if (job.status != "Cancelled" && job.status != "Completed") array[1]+=1;
    });
    return array;
  }

  useEffect(() => {
    //console.log(`You have ${getNumberOfNewJobs(jobs)} incoming job(s)!`);
    //setNumOfincomingJobs(getNumberOfNewJobs(jobs));
    setJobcounters(getjobcounts(jobs));
    return () => {
      //
    }
  }, [jobs])

  return (
    <div className="StaffHome page">
      <OfficeImg />
      <h2>Hello {staffName} !</h2>
      <p>Today you have</p>
      <div className="JobsCounter">
        <p className="IncomingCounter"><span>{jobcounters[0]}</span> {`incoming job${(jobcounters[0] > 1) ? "s " : " "} and`}</p>
        <p className="InProgressJobs"><span>{jobcounters[1]}</span> job{(jobcounters[1] > 1) ? "s " : " "}in progress</p>
      </div>
      <button className="PsyButton" onClick={(e) => {
        e.preventDefault();
        redirect('/myjobs');
      }}>Go to your jobs</button>
    </div>
  )
}

export default Home
