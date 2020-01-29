import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Leaflet from "leaflet";

import Bikes from "../Bike";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";
delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

const position = [50.1109, 8.6821];
const DEFAULT_MAP = "http://{s}.tile.osm.org/{z}/{x}/{y}.png";
const zoom = 13;

class Maps extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <Map center={position} zoom={zoom} style={{ height: "100vh" }}>
        <TileLayer
          url={DEFAULT_MAP}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Bikes />
      </Map>
    );
  }
}

export default Maps;
