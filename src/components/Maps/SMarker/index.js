import React from "react";
import styles from "./SMarker.module.scss";

import { Marker, Popup } from "react-leaflet";
import { bikeRent, bikeReturn } from "../../../utils/apiService";
import { icon, grayIcon, greenIcon } from "./Icon";
export default ({ bike, user, bike_document }) => {
  if (bike.location && bike.location.latitude) {
    const position = [bike.location.latitude, bike.location.longitude];
    let icon_ = icon;
    let returnBtn, returnText, rentBtn;
    if (bike.isRented) {
      returnText = "This bike is not available";
      icon_ = grayIcon;

      if (bike.userId === user.uid) {
        icon_ = greenIcon;
        returnBtn = (
          <div className={styles.buttonContainer}>
            <button
              className={styles.greenButton}
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
        );
        returnText = "Its yours! Click return bike to return this bike";
      }
    } else {
      rentBtn = (
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
      );
      returnText = "This bike is available for rent";
    }
    return (
      <Marker position={position} icon={icon_}>
        <Popup>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Bike {`>>${bike.name}<<`}</h1>
              <span className={styles.description}>{returnText}</span>
            </div>
            {!bike.isRented ? (
              <ol>
                <li>Click on "Rent Bicycle"</li>
                <li>Bicycle lock will unlock automatically</li>
                <li>Adjust saddle height</li>
              </ol>
            ) : null}
            {rentBtn}
            {returnBtn}
          </div>
        </Popup>
      </Marker>
    );
  } else return null;
};
