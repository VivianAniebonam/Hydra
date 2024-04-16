import React, { useState } from "react";
import "styles/footer.css"; // Import your CSS file
// react-router-dom components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

//  React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";

//  React example components
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

//  React page layout routes
import routes from "routes";

// Images
import bgImage from "assets/images/drink.jpg";
// Additional imports
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

let backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

function SignInBasic() {
  const [rememberMe, setRememberMe] = useState(false);

  let navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    phoneNumber: "",
    countryCode: "+1", // Add the countryCode field
    address: {
      street: "",
      city: "",
      country: "",
      postalCode: "",
      state: "",
    },
    password: "",
    confirmPassword: "", // Added confirmPassword field
  });

  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  //const ctx = useContext(UserContext);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const toggleVisibility = () => setVisible(!visible);

  const changeHandler = (e) => {
    const { name, value } = e.target;

    // Check if the password field is being updated
    if (name === "password") {
      // Check if the password length is less than 6 characters
      if (value.length < 6) {
        // Display a message informing the user about the password length requirement
        console.log("Password must be more than 6 characters.");
        // You can also set a state variable to display this message in the UI
      }
    }

    if (name === "countryCode") {
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // If the name contains a dot, it indicates a nested property
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setUserData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      // If not nested, update directly
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const signUpHandler = async (data) => {
    console.log("Sign-up data:", data);
    try {
      const response = await fetch(`${backendUrl}/users/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const resData = await response.json();
        // Check for the duplicate key error
        if (resData.error && resData.error.includes("duplicate key")) {
          throw new Error("A user with this username or email already exists.");
        } else {
          throw new Error(resData.message || "Unable to create user. Please try again.");
        }
      }

      //setError(''); // Clear any existing error
      return true;
    } catch (error) {
      console.error(error.message);
      // setError("A user with this username or email already exists."); // Example error message
      return false;
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("onSubmit handler triggered");

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    // Passwords match, continue with form submission
    setPasswordMatch(true);

    // Ensure that countryCode is defined and is a string
    if (typeof userData.countryCode !== "string") {
      console.error("Country code is not defined or not a string");
      return;
    }

    console.log(userData.countryCode);
    // Correctly format the country code and phone number
    const formattedCountryCode = userData.countryCode.startsWith("+")
      ? userData.countryCode
      : `+${userData.countryCode}`;
    const phoneNumberFull = `${formattedCountryCode}${userData.phoneNumber}`;
    console.log(phoneNumberFull, formattedCountryCode);
    // Prepare the data for submission, including the phoneNumberFull
    const updatedUserData = {
      ...userData,
      phoneNumberFull, // Add this instead of phoneNumber
    };

    // Remove properties not needed or expected by the backend
    delete updatedUserData.phoneNumber; // Since we're using phoneNumberFull
    delete updatedUserData.countryCode; // Assuming the backend doesn't need this separately

    try {
      console.log("Updated user data:", backendUrl);
      const response = await signUpHandler(updatedUserData);
      if (response) {
        // Handle successful sign-up alert("Message sent successfully!");

        console.log("Sign-up successful!");
        alert("Registeration was Succesful, You can now proceed to LogIn");

        // Redirect to home page
        navigate("/"); // replaces history.push(target)

        //  window.alert("Registered User Successfully To Our Database");
        //Upon successful registration, alerts the user
        navigate("/users/signin");
        // Possibly clear the form or redirect the user
      } else {
        // Handle errors or unsuccessful sign-up
        console.log("Sign-up failed.");
      }
    } catch (error) {
      // Handle any errors that occur during the sign-up process
      console.error("Sign-up failed with error:", error);
    }
  };

  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{ type: "external", label: "Login", color: "info" }}
        transparent
        light
      />
      {/* Adjusted MKBox for the background to be fixed and cover the full screen */}
      <MKBox
        position="fixed"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        height="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Adjusted MKBox for content positioning */}
      <MKBox
        position="absolute"
        top="45%"
        left="50%"
        zIndex={2}
        bottom="0"
        width="100%"
        maxWidth="2050px" // Adjust this to your preferred max width
        sx={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card sx={{ p: 2 }}>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  {" "}
                  Sign Up{" "}
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <FacebookIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GitHubIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                  <Grid item xs={2}>
                    <MKTypography component={MuiLink} href="#" variant="body1" color="white">
                      <GoogleIcon color="inherit" />
                    </MKTypography>
                  </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox pt={4} pb={3} px={3} component="form" role="form" onSubmit={onSubmitHandler}>
                  {/* Error Message Display */}
                  {/* You can put error message display code here */}
                  {/* First Name */}
                  <MKBox mb={2}>
                    <MKInput
                      name="firstName"
                      type="text"
                      label="First Name"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.firstName}
                    />
                  </MKBox>

                  {/* Last Name */}
                  <MKBox mb={2}>
                    <MKInput
                      name="lastName"
                      type="text"
                      label="Last Name"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.lastName}
                    />
                  </MKBox>

                  {/* Email */}
                  <MKBox mb={2}>
                    <MKInput
                      name="email"
                      type="email"
                      label="Email"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.email}
                    />
                  </MKBox>

                  {/* Username */}
                  <MKBox mb={2}>
                    <MKInput
                      name="username"
                      type="text"
                      label="Username"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.username}
                      required // Add this attribute to mark the field as required
                      error={userData.username.trim() === ""} // Add error prop to highlight if the field is empty
                      helperText={userData.username.trim() === "" ? "Username is required" : ""} // Display error message if the field is empty
                    />
                  </MKBox>

                  {/* Country Code and Phone */}
                  <MKBox mb={2} display="flex" gap={2}>
                    <MKInput
                      name="countryCode"
                      type="text"
                      label=" "
                      select
                      SelectProps={{ native: true }}
                      onChange={changeHandler}
                      value={userData.countryCode}
                      sx={{ minWidth: "100px" }}
                    >
                      <option value="+1">+1</option>
                      <option value="+234">+234</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      <option value="+61">+61</option>
                      <option value="+49">+49</option>
                      <option value="+81">+81</option>
                      <option value="+33">+33</option>
                      <option value="+39">+39</option>
                      <option value="+7">+7</option>
                      {/* Add more country codes as needed */}
                    </MKInput>
                    <MKInput
                      name="phoneNumber"
                      type="text"
                      label="PhoneNumber"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.phoneNumber}
                    />
                  </MKBox>
                  {/* Address */}
                  <MKBox mb={2}>
                    <MKInput
                      name="address.street"
                      type="text"
                      label="Street"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.address.street}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="address.city"
                      type="text"
                      label="City"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.address.city}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="address.country"
                      type="text"
                      label="Country"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.address.country}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="address.postalCode"
                      type="text"
                      label="Postal Code"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.address.postalCode}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="address.state"
                      type="text"
                      label="State"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.address.state}
                    />
                  </MKBox>

                  {/* Password */}
                  <MKBox mb={2} position="relative">
                    <MKInput
                      name="password"
                      type={visible ? "text" : "password"}
                      label="Password"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.password}
                      required // Add this attribute to mark the field as required
                      error={userData.password.length < 6} // Add error prop to highlight if the password is less than 6 characters
                      helperText={
                        userData.password.length < 6 ? "Password must be at least 6 characters" : ""
                      } // Display error message if the password is less than 6 characters
                    />
                    <MKBox
                      position="absolute"
                      top="50%"
                      right="10px"
                      sx={{ transform: "translateY(-50%)" }}
                    >
                      {visible ? (
                        <VisibilityOffIcon
                          onClick={toggleVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityIcon onClick={toggleVisibility} style={{ cursor: "pointer" }} />
                      )}
                    </MKBox>
                  </MKBox>
                  {/* Confirm Password */}
                  <MKBox mb={2} position="relative">
                    <MKInput
                      name="confirmPassword"
                      type={visible ? "text" : "password"}
                      label="Confirm Password"
                      fullWidth
                      onChange={changeHandler}
                      value={userData.confirmPassword}
                    />
                    <MKBox
                      position="absolute"
                      top="50%"
                      right="10px"
                      sx={{ transform: "translateY(-50%)" }}
                    >
                      {visible ? (
                        <VisibilityOffIcon
                          onClick={toggleVisibility}
                          style={{ cursor: "pointer" }}
                        />
                      ) : (
                        <VisibilityIcon onClick={toggleVisibility} style={{ cursor: "pointer" }} />
                      )}
                    </MKBox>
                  </MKBox>

                  {/* Password match error message */}
                  {!passwordMatch && <p style={{ color: "red" }}>Passwords do not match</p>}

                  {/* Remember Me Switch */}
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>

                  {/* Register Button */}
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      variant="gradient"
                      color="info"
                      fullWidth
                      type="submit"
                      onClick={onSubmitHandler}
                    >
                      Register
                    </MKButton>
                  </MKBox>

                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Already have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/ges/autpahentication/sign-in"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign In
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="0"></MKBox>
    </>
  );
}

export default SignInBasic;
