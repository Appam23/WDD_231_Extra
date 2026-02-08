
import "../css/style.css"; //  Vite makes the import possible
import "../css/partials/conditions.css";

import { getParkAlerts, 
         getParkData, 
         getVisitorCenterData, 
        getActivitiesData } from "./parkService.mjs";
import { alertTemplate, visitorCenterTemplate, activityTemplate } from "./templates.mjs";
import setHeaderFooter from "./setHeaderFooter.mjs";

function setAlerts(alerts) {
  const alertsContainer = document.querySelector(".alerts > ul");
  if (!alertsContainer) return;

  alertsContainer.innerHTML = "";
  const html = alerts.map(alertTemplate);
  alertsContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setVisitorCenters(centers) {
  const centersContainer = document.querySelector(".visitor ul");
  if (!centersContainer) return;

  centersContainer.innerHTML = "";
  const html = centers.map(visitorCenterTemplate);
  centersContainer.insertAdjacentHTML("beforeend", html.join(""));
}

function setActivities(activities) {
  const activitiesContainer = document.querySelector(".activities ul");
  if (!activitiesContainer) return;

  activitiesContainer.innerHTML = "";
  const html = activities.map(activityTemplate);
  activitiesContainer.insertAdjacentHTML("beforeend", html.join(""));
}

async function init() {
  const parkData = await getParkData();
  const alerts = await getParkAlerts(parkData.parkCode);
  const centers = await getVisitorCenterData(parkData.parkCode);
  const activities = await getActivitiesData(parkData.parkCode);
  setHeaderFooter(parkData);
  setAlerts(alerts);
  setVisitorCenters(centers);
  setActivities(activities);
}

init();

