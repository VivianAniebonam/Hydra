// AlertForm.js
import React, { useState, useEffect } from 'react';

const AlertForm = ({ existingAlert, onSave, onCancel }) => {
  const [alert, setAlert] = useState(existingAlert || { /* default alert structure */ });

  useEffect(() => {
    if (existingAlert) setAlert(existingAlert);
  }, [existingAlert]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAlert(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Code to save alert (POST for new or PUT for update)
    onSave(alert);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for alert properties */}
      <button type="submit">Save Alert</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AlertForm;
