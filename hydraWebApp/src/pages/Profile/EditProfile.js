import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import MKBox from "components/MKBox";
import MKAvatar from "components/MKAvatar";
import MKTypography from "components/MKTypography";
import profilePicture from "assets/images/bruce-mars.jpg";

const API_URI = process.env.REACT_APP_BACKEND_URL || "http://localhost:3000";

function EditProfile() {
  const [userData, setUserData] = useState({
    profilePicture: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
  });

  useEffect(() => {
    fetch(`${API_URI}/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        setUserData({
          profilePicture: data.profilePicture,
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          email: data.email,
          phoneNumber: data.phoneNumber,
          dateOfBirth: data.dateOfBirth,
          password: "", // Since we shouldn't fetch the password, keep it empty
        });
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  const handleSave = () => {
    console.log("Saving changes...");
    fetch(`${API_URI}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('authToken')}`,
      },
      body: JSON.stringify(userData),
    })
      .then(response => {
        if (response.ok) {
          console.log('User data updated successfully');
          // Optionally, redirect the user to another page or show a success message
        } else {
          console.error('Failed to update user data');
          // Optionally, show an error message to the user
        }
      })
      .catch(error => {
        console.error('Error updating user data:', error);
      });
  };

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setUserData({ ...userData, profilePicture: reader.result });
    };

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        console.error("File size exceeds the limit");
        return;
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -16, md: -20 }} textAlign="center">
            <MKAvatar src={profilePicture} alt="Bruce Mars" size="xxl" shadow="xl" />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Link to="/pages/landing-pages/author" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" color="info" size="small">
                    <Icon sx={{ fontWeight: "bold" }}>arrow_backward</Icon> Dashboard
                  </Button>
                </Link>
                <MKTypography variant="h3">Bruce Mars</MKTypography>
                <Button variant="outlined" color="info" size="small" onClick={handleSave}>
                  Save
                </Button>
              </MKBox>
              <Container>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleProfilePictureChange}
                      id="profilePictureInput"
                    />
                    <label htmlFor="profilePictureInput">
                      <IconButton color="primary" aria-label="edit profile picture" component="span">
                        <EditIcon />
                      </IconButton>
                    </label>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userData.firstName}
                      onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userData.lastName}
                      onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userData.username}
                      onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      value={userData.phoneNumber}
                      onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Date of Birth (YYYY/MM/DD)"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      placeholder="YYYY/MM/DD"
                      value={userData.dateOfBirth}
                      onChange={(e) => setUserData({ ...userData, dateOfBirth: e.target.value })}
                    />
                  </Grid>
                </Grid>
              </Container>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default EditProfile;
