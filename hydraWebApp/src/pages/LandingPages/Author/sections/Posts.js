import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import { FormControl, InputLabel, Select, MenuItem, TextField } from "@mui/material";

const API_URI = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

const AddWaterLogForm = () => {
  const { state } = useLocation();
  console.log("Location state:", state);
  const initialUserId = state && state.userId ? state.userId : ""; // Retrieve userId from location state
  console.log("Initial userId:", initialUserId);
  const [userId, setUserId] = useState(initialUserId);
  const [date, setDate] = useState("");
  const [dailyAmount, setDailyAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [therapyDuration, setTherapyDuration] = useState("");
  const [sleepTimeStarts, setSleepTimeStarts] = useState("");
  const [sleepTimeEnds, setSleepTimeEnds] = useState("");
  const [totalSleepTime, setTotalSleepTime] = useState("");
  const [reminderMode, setReminderMode] = useState("email");
  const [amountPerHour, setAmountPerHour] = useState("");
  const [reminderInterval, setReminderInterval] = useState(60); // Default to 60 minutes
  const [napStartTime, setNapStartTime] = useState("");
  const [napDuration, setNapDuration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const waterLogEntry = {
      userId,
      date,
      dailyAmount: Number(dailyAmount),
      therapyDuration: Number(therapyDuration),
      sleepTimeStarts: Number(sleepTimeStarts),
      sleepTimeEnds: Number(sleepTimeEnds),
      totalSleepTime: Number(totalSleepTime),
      reminderMode,
      amountPerHour: dailyAmount / therapyDuration, // Calculate amountPerHour
      totalAmount: dailyAmount * therapyDuration,
    };

    try {
      const response = await fetch(`${API_URI}/Waterlogs/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(waterLogEntry),
      });

      if (response.ok) {
        alert("Water log entry was added successfully");
      } else {
        alert("Failed to create water log");
      }
    } catch (error) {
      console.error("Failed to submit the water log entry:", error);
      alert("Error submitting water log entry into the database. Please try again!");
    }
  };

  useEffect(() => {
    if (dailyAmount && therapyDuration) {
      const calculatedTotalAmount = Number(dailyAmount) * Number(therapyDuration);
      setTotalAmount(calculatedTotalAmount.toString());
    }
  }, [dailyAmount, therapyDuration]);

  useEffect(() => {
    if (sleepTimeStarts && sleepTimeEnds) {
      // Convert time strings to Date objects for easier calculation
      const startTime = new Date(`2000-01-01T${sleepTimeStarts}`);
      const endTime = new Date(`2000-01-01T${sleepTimeEnds}`);

      // Calculate the difference in milliseconds
      let timeDifference = endTime - startTime;

      // Handle the case when sleep time ends on the next day
      if (timeDifference < 0) {
        const midnight = new Date(`2000-01-02T00:00:00`);
        timeDifference = midnight - startTime + (endTime - midnight);
      }

      // Convert milliseconds to hours and minutes
      const hours = Math.floor(timeDifference / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

      // Format total sleep time as HH:MM
      const formattedTotalSleepTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
      setTotalSleepTime(formattedTotalSleepTime);
    }
  }, [sleepTimeStarts, sleepTimeEnds]);

  useEffect(() => {
    if (dailyAmount && sleepTimeStarts && sleepTimeEnds && napDuration) {
      const sleepStartTime = new Date(`2000-01-01T${sleepTimeStarts}`);
      const sleepEndTime = new Date(`2000-01-01T${sleepTimeEnds}`);

      const sleepDurationHours = (sleepEndTime - sleepStartTime) / (1000 * 60 * 60);

      // Assuming napDuration is in hours
      const totalSleepDurationHours = sleepDurationHours + Number(napDuration);

      const wakingHours = 24 - totalSleepDurationHours;

      if (wakingHours <= 0) {
        alert("Invalid total sleep and nap duration; waking hours cannot be zero or negative.");
        return;
      }

      // Calculate the amount of water to consume per hour during waking hours
      const calculatedAmountPerHour = dailyAmount / wakingHours;
      // Rounding to the nearest whole number
      const roundedAmountPerHour = Math.round(calculatedAmountPerHour);
      setAmountPerHour(roundedAmountPerHour);
    }
  }, [dailyAmount, sleepTimeStarts, sleepTimeEnds, napDuration]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Stored userId:", storedUserId); // Add this line to check the stored userId
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return (
    <MKBox component="section" py={2}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MKTypography variant="h3" mb={6}>
              Create Hydration Alert
            </MKTypography>
          </Grid>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormControl fullWidth sx={{ ".MuiInputBase-root": { height: "45px" } }}>
                  <InputLabel id="reminder-mode-label">Preferred Reminder Method</InputLabel>
                  <Select
                    labelId="reminder-mode-label"
                    id="reminderMode"
                    value={reminderMode}
                    label="Preferred Reminder Method"
                    onChange={(e) => setReminderMode(e.target.value)}
                    required
                  >
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="phone">Phone</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <MKInput
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  label="Date"
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <MKInput
                  type="number"
                  value={dailyAmount}
                  onChange={(e) => setDailyAmount(e.target.value)}
                  label="Daily Amount (ml)"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <MKInput
                  type="number"
                  value={therapyDuration}
                  onChange={(e) => setTherapyDuration(e.target.value)}
                  label="Therapy Duration (days)"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <MKInput
                  type="text"
                  value={totalAmount}
                  label="Total Amount (ml)"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Night Sleep Starts (hours)"
                  type="time"
                  value={sleepTimeStarts}
                  onChange={(e) => setSleepTimeStarts(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Night Sleep Ends (hours)"
                  type="time"
                  value={sleepTimeEnds}
                  onChange={(e) => setSleepTimeEnds(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <MKInput
                  type="text"
                  value={totalSleepTime}
                  label="Total Sleep Time (hours)"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Nap Start Time"
                  type="time"
                  value={napStartTime}
                  onChange={(e) => setNapStartTime(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={6}>
                <MKInput
                  type="number"
                  value={napDuration}
                  onChange={(e) => setNapDuration(e.target.value)}
                  label="Nap Duration (hours)"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sx={{ ".MuiInputBase-root": { height: "45px" } }}>
                <FormControl fullWidth>
                  <InputLabel id="reminder-interval-label">Reminder Interval</InputLabel>
                  <Select
                    labelId="reminder-interval-label"
                    id="reminderInterval"
                    value={reminderInterval}
                    label="Reminder Interval"
                    onChange={(e) => setReminderInterval(e.target.value)}
                    required
                  >
                    <MenuItem value={2}>2 mins</MenuItem>
                    <MenuItem value={5}>5 mins</MenuItem>
                    <MenuItem value={30}>30 mins</MenuItem>
                    <MenuItem value={60}>1 hr (60 mins)</MenuItem>
                    <MenuItem value={90}>1 hr 30 mins (90 mins)</MenuItem>
                    <MenuItem value={120}>2 hrs (120 mins)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <MKInput
                  type="number"
                  value={amountPerHour}
                  onChange={(e) => setAmountPerHour(e.target.value)}
                  label="Drinks Per Alert (ml)"
                  required
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <MKButton type="submit" color="primary">
                  Create Alert
                </MKButton>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Container>
    </MKBox>
  );
};

export default AddWaterLogForm;
