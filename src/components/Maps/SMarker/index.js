import React from "react";
import styles from "./SMarker.module.scss";

import { Marker, Popup } from "react-leaflet";

export default props => {
  console.log(props.bike.location, props.bike, "ss");
  if (props.bike.location && props.bike.location.latitude) {
    const position = [
      props.bike.location.latitude,
      props.bike.location.longitude
    ];
    return (
      <Marker position={position}>
        <Popup>
          <div className={styles.container}>
            <div className={styles.header}>
              <h1>Bike {`>>${props.bike.name}<<`}</h1>
              <span className={styles.description}>
                {props.bike.isRented
                  ? "This bike is not for rent"
                  : "This bike is for rent"}
              </span>
            </div>
            {props.bike.isRented ? (
              <ol>
                <li>Click on "Rent Bicycle"</li>
                <li>Bicycle lock will unlock automatically</li>
                <li>Adjust saddle height</li>
              </ol>
            ) : null}
            <div className={styles.buttonContainer}>
              <button>Rent Bike</button>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  } else return null;
};
