import axios from "axios";

export const bikeRent = async params => {
  console.log(process.env, process.env.REACT_APP_BIKE_RENT_URL);
  let respone = await axios
    .post(process.env.REACT_APP_BIKE_RENT_URL, params)
    .catch(error => {
      console.log(error);
    });
  return respone;
};

export const bikeReturn = async params => {
  let respone = await axios
    .post(process.env.REACT_APP_BIKE_RETURN_URL, params)
    .catch(error => {
      console.log(error);
    });
  return respone;
};
