//index.js
//FAQ PAGE
//src/layouts/pages/landing-pages/faq/index.js

import Grid from "@mui/material/Grid";
import { useNavigate } from 'react-router-dom';
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import React from 'react';
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import routes from "routes";
import footerRoutes from "footer.routes";

function FAQ() {
  useNavigate();

  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}
          action={{
            type: "external",
            route: "/ges/autpahentication/sign-in",
            label: "Login",
            color: "info",
          }}
        />
      </MKBox>
      <Grid container alignItems="center" justifyContent="center" style={{ minHeight: "100vh" }}>
        
        <Grid
          item
          xs={12}
          sm={10}
          md={8}
          lg={6}
          xl={6}
          width="75%"
          mx="auto"
          justifyContent="center"
          textAlign="center"
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Frequently Asked Questions
              </MKTypography>
            </MKBox>
            <MKBox p={3}>
              <MKTypography variant="h4" color="textPrimary" mb={2}>
                What is Hydra?
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
                Hydra is your ultimate hydration companion, simplifying the task of staying hydrated in today&apos;s busy world. With timely reminders and easy water intake tracking, Hydra ensures that hydration is seamlessly integrated into your daily routine. Designed for users of all ages, Hydra prioritizes wellness by making hydration effortless and effective.
              </MKTypography>

              <MKTypography variant="h4" color="textPrimary" mb={2}>
                How does Hydra work?
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
                Hydra simplifies hydration tracking with its user-friendly interface and reminder notifications. Users can log water intake easily, track consumption history, and customize reminder frequencies. With Hydra, staying hydrated is effortless and effective.
              </MKTypography>

              <MKTypography variant="h4" color="textPrimary" mb={2}>
                How do I track my water intake with Hydra?
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
                To track water intake with Hydra, simply log in, navigate to the water log page, and enter your consumption levels. Then, view your progress chart for easy tracking.
              </MKTypography>

              <MKTypography variant="h4" color="textPrimary" mb={2}>
                Does Hydra provide reminders to drink water?
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
                Yes, Hydra provides reminders to drink water. Users can enable reminders by accessing the settings menu and selecting their preferred notification method, such as email or text. They can also customize the frequency and timing of reminders according to their preferences.
              </MKTypography>

              <MKTypography variant="h4" color="textPrimary" mb={2}>
                Is my data secure with Hydra?
              </MKTypography>
              <MKTypography variant="body2" color="text" mb={3}>
                Absolutely, at Hydra, safeguarding your data is our top priority. We employ robust security measures to ensure that your personal information remains protected at all times. Here&apos;s how we keep your data secure:
              </MKTypography>
              <MKTypography variant="body2" color="text">
                Encryption: Your data is encrypted during transmission and storage.
              </MKTypography>
              
              <MKTypography variant="body2" color="text">
                Secure Servers: We use secure servers with strict access controls.
              </MKTypography>
              
              <MKTypography variant="body2" color="text">
                Privacy Controls: You have control over what data you share and with whom.
              </MKTypography>
              
              <MKTypography variant="body2" color="text">
                Regular Audits: We conduct frequent security audits to identify and address vulnerabilities.
              </MKTypography>
              
              <MKTypography variant="body2" color="text">
                Compliance: We adhere to industry standards, including Canadian data protection laws, ensuring your data is handled securely and in accordance with relevant regulations.
              
              </MKTypography>

                {/* Add a blank line here */}
              <div style={{ marginBottom: "1rem" }}></div>

              <MKTypography variant="h4" color="textPrimary" mb={2}>
                How can I contact support if I encounter issues with Hydra?
              </MKTypography>

              <MKTypography variant="body2" color="text" mb={3}>
                If you encounter any issues with Hydra, please visit our Contact page for assistance. You can find the link to our Contact page on our website. Our support team is ready to assist you with any questions or concerns you may have.
              </MKTypography>
              
            </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default FAQ;
