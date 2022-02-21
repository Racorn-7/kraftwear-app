/**
 * Functions for staff for the live DB
 */
const SERVER_URL = 'http://localhost:5000/';

/**
 * JOBS
 */
//get jobs from database for users assigned to this staff
export function fetchJobs(userToken, setJobs) {
  console.log("fetching jobs..");

  fetch(`${SERVER_URL}api/jobs/my-jobs`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
    })
  }).then(res => res.json())
    .then(res => {
      console.log("authorised access to jobs");
      setJobs(res);
      //console.log("staff.jobs: ",res);
    })
    .catch(err => {
      return { error: err }
    })
}

//UPDATE job status (also order status)
export async function updateJobStatus(userToken, id, newValue, setJobs) {
  console.log("updating job status..");

  fetch(`${SERVER_URL}api/jobs/update-job-status`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      id: id,
      newValue: newValue
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) console.log(res.error);
      else {
        console.log("authorised access to jobs");
        console.log(res);
        setJobs(res);
      }
    })
    .catch(err => {
      console.log({ error: err });
    })
}

//UPDATE job status (also order status)
export async function bookDeliveryForJob(userToken, id, setJobs) {
  console.log("updating job status..");

  fetch(`${SERVER_URL}api/jobs/book-delivery`, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
      'auth-token': userToken
    },
    body: JSON.stringify({
      id: id,
    })
  }).then(res => res.json())
    .then(res => {
      if (res.error) res.status(400).send({error: "Not found"})
      else {
        console.log("authorised access to jobs");
        console.log(res);
        setJobs(res);
      }
    })
    .catch(err => {
      console.log({ error: err });
    })
}

