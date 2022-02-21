import React, { useState, useContext, useEffect } from 'react'
import '../../../css/ListItem.css'
import ListButton from '../../_ReusableComponents/ListButton'
import Logo from '../../_ReusableComponents/Logo'
import ProductLines from './JobProductLines'
import DropDown from '../../Cart/DropDown'
import {
  updateJobStatus,
  bookDeliveryForJob
} from '../../../Functions/staffDBfunctions'
import PageContext from '../../../Context/PageContext'
import UserContext from '../../../Context/UserContext'

const JobListItem = (props) => {
  const { staff } = useContext(UserContext);
  const { jobs, setJobs, stock } = useContext(PageContext);
  const [productLinesVisible, setProductLinesVisible] = useState(false);
  const [messageBtnClicked, setMessageBtnClicked] = useState(false);
  const [productionBtnClicked, setProductionBtnClicked] = useState(false);
  const [deliveryBtnClicked, setDeliveryBtnClicked] = useState(false);

  //format time to 2 digits
  const addZero = (time) => {
    return (time < 10) ? "0" + time : time;
  }

  //get a displayable date format
  const formatDate = (date) => {
    var d = new Date(date);
    return (
      addZero(d.getHours()) +
      ":" +
      addZero(d.getMinutes()) +
      " " +
      d.getDate() +
      "/" +
      d.getMonth() +
      "/" +
      d.getFullYear()
    )
  }

  //message button handler
  const clickMessageBtn = () => {
    console.log("Message to user with id: " + props.job.user + ", about order with id: " + props.job._id);

    setMessageBtnClicked(true);
    setTimeout(() => {
      setMessageBtnClicked(false);
    }, 2000);
  }

  //get user's design with id
  const fetchThisDesign = (id) => {
    console.log("TODO fetch design with id: ", id, "of user id: ", props.job.user);
  }

  //TODO
  //update job status (also order status)
  const handleJobStatusChange = (newValue, key) => {
    updateJobStatus(staff, props.job._id, newValue, setJobs);
  }

  //TODO 
  //book delivery service for order
  const bookDeliveryHandler = () => {
    console.log("booking delivery..");
    //updateJobStatus(staff, props.job._id, "In Transit", setJobs);
    bookDeliveryForJob(staff, props.job._id, setJobs);
  }

  //TODO
  //send job to production
  const sendToProduction = () => {
    console.log("job sent to production ..");
    updateJobStatus(staff, props.job._id, "In Progress", setJobs);
  }

  return (
    <>
      <li className="ListItem">
        <div className="ListItemLeft">
          <img src="" alt="." />
        </div>
        <div className="ListItemMid"
          onClick={() => {
            setProductLinesVisible(!productLinesVisible)
          }}
        >
          <p>{props.job.name || "job"}</p>
        </div>
        <div className="ListItemRight">
          <p className="itemCount">
            {`${props.job.productLines.length} item ${(props.job.productLines.length > 1) ? "s" : ""}`}
          </p>
          <p className="costDetails">
            {`£ ${props.job.productTotal + props.job.deliveryCost} / £ ${props.job.deliveryCost}`}
          </p>
          <p className="dateDetail">{formatDate(props.job.placed)}</p>
          {(!messageBtnClicked) ?
            <ListButton
              text={(props.job.status === "Completed") ? "Check feedback" : "Message about job"}
              icon={<Logo />/* replace */}
              onClick={() => clickMessageBtn()} />
            : <p>Feature coming soon</p>
          }
          {
            (props.job.status != "Paid For") ?
              <DropDown
                key={`${props.job.status}_props.job._id`}
                selected={props.job.status}
                keyString={"status"}
                options={[
                  "Paid For",
                  "In Progress",
                  "Completed",
                  "Cancelled",
                ] || []}
                onChange={handleJobStatusChange}
              />
              : <ListButton
                text="Send job to Production"
                onClick={() => sendToProduction()}
              />
          }
          {(props.job.status === "In Progress") ?
            <ListButton
              text="Book delivery"
              onClick={() => bookDeliveryHandler()}
            />
            :
            null
          }
        </div>
      </li>
      {/* TODO rename to jobProductLines */}
      <ProductLines productLines={props.job.productLines} open={productLinesVisible} fetchDesign={fetchThisDesign} />
    </>
  )
}

export default JobListItem