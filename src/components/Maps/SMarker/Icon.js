import L from "leaflet";

const icon = new L.Icon({
  iconRetinaUrl: require("./maps/map-marker-sight.png"),
  className: "leaflet-div-icon-h"
});

const grayIcon = new L.Icon({
  iconRetinaUrl: require("./maps/map-gray.png"),
  className: "leaflet-div-icon-h"
});

const greenIcon = new L.Icon({
  iconRetinaUrl: require("./maps/map-green.png"),
  className: "leaflet-div-icon-h"
});
export { icon, grayIcon, greenIcon };
