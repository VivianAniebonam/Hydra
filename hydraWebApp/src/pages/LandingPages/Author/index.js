
// @mui material components
import Card from "@mui/material/Card";

//  React components
import MKBox from "components/MKBox";

//  React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Author page sections
//import Profile from "pages/LandingPages/Author/sections/Profile";
import Posts from "pages/LandingPages/Author/sections/Posts";
import Contact from "pages/LandingPages/Author/sections/Contact";
import Footer from "pages/LandingPages/Author/sections/Footer";
import Dashboard from "pages/LandingPages/Author/sections/UserDashBoard";
//import UpcomingAlertsPage from "pages/WaterLogging/UpComingAlertPage";

// Routes
import routes from "routes";

// Images
import bgImage from "assets/images/city-profile.jpg";

function Author() {
  return (
    <>
      <DefaultNavbar
        routes={routes}
        action={{
          type: "external",
          route: "/ges/autpahentication/sign-in",
          label: "Login",
          color: "info",
        }}
        transparent
        light
      />
      <MKBox bgColor="white">
        <MKBox
          minHeight="25rem"
          width="100%"
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.dark.main, 0.8),
                rgba(gradients.dark.state, 0.8)
              )}, url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "grid",
            placeItems: "center",
          }}
        />
        <Card
          sx={{
            p: 2,
            mx: { xs: 2, lg: 3 },
            mt: -8,
            mb: 4,
            backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
            backdropFilter: "saturate(200%) blur(30px)",
            boxShadow: ({ boxShadows: { xxl } }) => xxl,
          }}
        >
          <Dashboard/>
          <Posts />
     
        </Card>
        <Contact />
       <Footer />
      </MKBox>
    </>
  );
}

export default Author;
