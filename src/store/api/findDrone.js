import "isomorphic-fetch";

import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const findDrone = async() => {
  // Using the create-react-app's proxy for CORS issues
  const response = await fetch(
     `https://react-assessment-api.herokuapp.com/api/drone`
  );
  if (!response.ok) {
    toast("Error found during Api call!");
    return {  error: { code: response.status } };
  }
  toast("Drone Api call is successfully called!");
  const json = await response.json();
  const dataLength = (json.data.length) - 1;
  //console.log("This is from drone!");
  //console.log(json);
  return { data: json.data[dataLength] }; //return the last object
};

export default findDrone;
