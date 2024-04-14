import React, { useState } from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import bgImage from "assets/images/examples/blog2.jpg";


function Contact() {
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const [firstName, ...lastNameArray] = fullName.split(' ');
    const payload = {
      firstName,
      lastName: lastNameArray.join(' '),
      title,
      content: message,
    };

    try {
      const response = await fetch('http://localhost:3000/testimonies/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok) {
        alert('Testimony posted successfully: ' + responseData.message);
        setFullName('');
        setTitle('');
        setMessage('');
      } else {
        alert('Failed to submit testimony: ' + responseData.message);
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the testimony');
    }
  };

  return (
    <MKBox component="section" py={{ xs: 0, lg: 6 }}>
      <Container>
        <Grid container item>
          <MKBox
            width="100%"
            bgColor="white"
            borderRadius="xl"
            shadow="xl"
            mb={6}
            sx={{ overflow: "hidden" }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                lg={5}
                position="relative"
                px={0}
                sx={{
                  backgroundImage: ({
                    palette: { gradients },
                    functions: { rgba, linearGradient },
                  }) =>
                    `${linearGradient(
                      rgba(gradients.dark.main, 0.8),
                      rgba(gradients.dark.state, 0.8)
                    )}, url(${bgImage})`,
                  backgroundSize: "cover",
                }}
              >
                <MKBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  height="100%"
                >
                  <MKBox py={6} pr={6} pl={{ xs: 6, sm: 12 }} my="auto">
                    <MKTypography variant="h3" color="white" mb={1}>
                      Contact Information
                    </MKTypography>
                    <MKTypography variant="body2" color="white" opacity={0.8} mb={3}>
                      Fill up the form and our Team will get back to you within 24 hours.
                    </MKTypography>
                    <MKBox display="flex" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-phone" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        (+1) 437 995 1990
                      </MKTypography>
                    </MKBox>
                    <MKBox display="flex" color="white" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-envelope" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        aniebonamvivian1@gmail.com
                      </MKTypography>
                    </MKBox>
                    <MKBox display="flex" color="white" p={1}>
                      <MKTypography variant="button" color="white">
                        <i className="fas fa-map-marker-alt" />
                      </MKTypography>
                      <MKTypography
                        component="span"
                        variant="button"
                        color="white"
                        opacity={0.8}
                        ml={2}
                        fontWeight="regular"
                      >
                        941 Progress Ave, Scarborough
                      </MKTypography>
                    </MKBox>
                    <MKBox mt={3}>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-facebook" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-twitter" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-dribbble" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                      <MKButton variant="text" color="white" size="large" iconOnly>
                        <i className="fab fa-instagram" style={{ fontSize: "1.25rem" }} />
                      </MKButton>
                    </MKBox>
                  </MKBox>
                </MKBox>
              </Grid>
              <Grid item xs={12} lg={7}>
                <MKBox component="form" onSubmit={handleSubmit} p={2} method="post">
      <MKBox px={3} py={{ xs: 2, sm: 6 }}>
        <MKTypography variant="h2" mb={1}>
          Make a Testimony Post
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={2}>
          We&apos;d like you to share your experience with hydra to other users.
        </MKTypography>
      </MKBox>
      <MKBox pt={0.5} pb={3} px={3}>
        <Grid container>
          {/* Full Name Input */}
          <Grid item xs={12} pr={1} mb={6}>
            <MKInput
              variant="standard"
              label="My name is"
              placeholder="Full Name"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </Grid>
          {/* Title Input */}
          <Grid item xs={12} pr={1} mb={6}>
            <MKInput
              variant="standard"
              label="Title of your Post"
              placeholder="What you love"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          {/* Message Input */}
          <Grid item xs={12} pr={1} mb={6}>
            <MKInput
              variant="standard"
              label="Your message"
              placeholder="I want to say that..."
              InputLabelProps={{ shrink: true }}
              fullWidth
              multiline
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={6}
          justifyContent="flex-end"
          textAlign="right"
          ml="auto"
        >
          {/* Submit Button */}
          <MKButton type="submit" variant="gradient" color="info">
            Post Testimony
          </MKButton>
        </Grid>
      </MKBox>
    </MKBox>
              </Grid>
            </Grid>
          </MKBox>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Contact;
