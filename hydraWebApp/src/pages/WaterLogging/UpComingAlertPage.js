import React, { useState, useEffect } from "react";
import AlertItem from "./AlertItem"; // Create a separate component for displaying each alert item

const UpcomingAlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch alerts from the backend API
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    // Send a request to fetch alerts associated with the current user
    try {
      const response = await fetch(`${API_URI}/alerts`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include authorization token if required
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAlerts(data.alerts);
      } else {
        console.error("Failed to fetch alerts");
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const handleEditAlert = (alertId) => {
    // Navigate to the edit alert page with the alertId as a parameter
    // Implement navigation logic here using react-router-dom
  };

  const handleDeleteAlert = async (alertId) => {
    // Send a request to delete the alert from the database
    try {
      const response = await fetch(`${API_URI}/alerts/${alertId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include authorization token if required
        },
      });
      if (response.ok) {
        // Remove the deleted alert from the alerts state
        setAlerts(alerts.filter((alert) => alert.id !== alertId));
        console.log("Alert deleted successfully");
      } else {
        console.error("Failed to delete alert");
      }
    } catch (error) {
      console.error("Error deleting alert:", error);
    }
  };

  return (
    <div>
      <h1>Upcoming Alerts</h1>
      <ul>
        {alerts.map((alert) => (
          <AlertItem
            key={alert.id}
            alert={alert}
            onEdit={() => handleEditAlert(alert.id)}
            onDelete={() => handleDeleteAlert(alert.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default UpcomingAlertsPage;
