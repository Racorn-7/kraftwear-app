import React, { useContext, useEffect, useState } from 'react'
import List from '../../_ReusableComponents/List';
import './MyJobs.css'
import PageContext from '../../../Context/PageContext';
import {
  fetchJobs,
} from '../../../Functions/staffDBfunctions'
import UserContext from '../../../Context/UserContext';
import JobListItem from './JobListItem';

const MyJobs = () => {
  const { staff } = useContext(UserContext);
  const { jobs, setJobs } = useContext(PageContext);
  const [incomingJobs, setIncomingJobs] = useState([]);
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState([]);

  //fetch jobs on component mount
  useEffect(() => {
    console.log("TODO fetch my jobs..");
    fetchJobs(staff, setJobs);
    return () => {
      //
    }
  }, [])


  const renderListItems = (array)=>{
    return array.map(job=>
        <JobListItem
              job={job}
              key={job._id}
            />)
  }

  //every time jobs array changes render it into two component arrays
  useEffect(() => {
    console.log("jobs",jobs);
    
    const OGJ = jobs.filter(job=>
      job.status != "Completed" && job.status != "Cancelled" && job.status != "Paid For"
    );

    const PJ = jobs.filter(job=>
      job.status == "Completed" || job.status == "Cancelled"
    )
    
    const IJ = jobs.filter(job=>job.status == "Paid For");

    setOngoingJobs(renderListItems(OGJ));
    setCompletedJobs(renderListItems(PJ));
    setIncomingJobs(renderListItems(IJ));

    return () => {
      //cleanup
    }
  }, [jobs]);


  return (
    <div className="MyJobs page">
      <div className="JobsContainer">
        <List
          title="Incoming jobs" subtitle="All that is new"
          itemsArray={incomingJobs || []}
          messageIfEmpty={"No jobs to show"} />
        <List
          title="Ongoing jobs" subtitle="All your live jobs"
          itemsArray={ongoingJobs || []}
          messageIfEmpty={"No jobs to show"} />
        <List
          title="Completed jobs" subtitle="History of completed jobs"
          itemsArray={completedJobs || []}
          messageIfEmpty="No completed jobs to show" />
      </div>
      <div className="hangerFooter"></div>
    </div>
  )
}

export default MyJobs
