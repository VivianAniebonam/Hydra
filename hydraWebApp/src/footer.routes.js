// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

//  React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo.ico";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Hydra",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
      
    },
    {
      icon: <TwitterIcon />,
    
    },
    {
      icon: <GitHubIcon />,
    
    },
    {
      icon: <YouTubeIcon />,
    
    },
  ],
  menus: [
    {
      name: "company",
      items: [
        { name: "about us", href: "/pages/landing-pages/about-us" },
        { name: "freebies"},
        { name: "premium tools", href: "/sections/page-sections/Demonstration"},
        { name: "blog", href: "https://researchgrips.com/"},
      ],
    },
    {
      name: "resources",
      items: [
        { name: "Demostration", href: "https://www.youtube.com/watch?v=Y1fiKGj5H0E" },
        { name: "Videos", href: "https://www.youtube.com/watch?v=Y1fiKGj5H0E" }
        
      ],
    },
    {
      name: "help & support",
      items: [
        { name: "contact us", href: "/pages/landing-pages/contact-us" },
        { name: "knowledge center", href: "/sections/page-sections/Demonstration" },
        { name: "FAQ", href: "/pages/landing-pages/faq"}
      ],
    },
    {
      name: "legal",
      items: [
        { name: "terms & conditions" },
        { name: "privacy policy" },
      
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Hydra {" "}
      <MKTypography
        component="a"
       target="_blank"
        rel="noreferrer"
        variant="button"
        fontWeight="regular"
      >
     Application
      </MKTypography>
      .
    </MKTypography>
  ),
};
