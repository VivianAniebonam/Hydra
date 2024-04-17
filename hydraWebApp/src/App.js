import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "assets/theme";
import Presentation from "layouts/pages/presentation";
import SignUp from './pages/LandingPages/SignIn/signup';
import Profile from './pages/Profile';
import AddWaterLogForm from "pages/LandingPages/Author/sections/Posts";
import routes from "routes";
import FAQ from "layouts/pages/landing-pages/faq";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {getRoutes(routes)}
        <Route path="/" element={<Presentation />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        {/* Add the AddWaterLogForm route here */}
        <Route path="/add-water-log" element={<AddWaterLogForm />} />
        <Route path="/faq" component={FAQ} />
      </Routes>
    </ThemeProvider>
  );
}