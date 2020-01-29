import React from "react";
import styles from "./SMarker.module.scss";

import { Marker, Popup } from "react-leaflet";
import { bikeRent, bikeReturn } from "../../../utils/apiService";
export default ({ bike, user, bike_document }) => {
  console.log(bike.location, bike, "ss");
  if (bike.location && bike.location.latitude) {
    const position = [bike.location.latitude, bike.location.longitude];
    return (
      <Marker position={position}>
        <Popup>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Bike {`>>${bike.name}<<`}</h1>
              <span className={styles.description}>
                {bike.isRented
                  ? "This bike is not for rent"
                  : "This bike is for rent"}
              </span>
            </div>
            {!bike.isRented ? (
              <ol>
                <li>Click on "Rent Bicycle"</li>
                <li>Bicycle lock will unlock automatically</li>
                <li>Adjust saddle height</li>
              </ol>
            ) : null}
            {bike.isRented ? (
              undefined
            ) : (
              <div className={styles.buttonContainer}>
                <button
                  onClick={() =>
                    bikeRent({
                      userEmail: user.email,
                      bikeId: bike_document
                    })
                  }
                >
                  Rent Bike
                </button>
              </div>
            )}
            {bike.userId === user.uid ? (
              <div className={styles.buttonContainer}>
                <button
                  onClick={() =>
                    bikeReturn({
                      userEmail: user.email,
                      bikeId: bike_document
                    })
                  }
                >
                  Return Bike
                </button>
              </div>
            ) : (
              undefined
            )}
          </div>
        </Popup>
      </Marker>
    );
  } else return null;
};
