
// @mui material components
import Icon from "@mui/material/Icon";

// @mui icons
import GitHubIcon from "@mui/icons-material/GitHub";

// Pages
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";
import Author from "layouts/pages/landing-pages/author";
import SignIn from "layouts/pages/authentication/sign-in";
import FAQ from "layouts/pages/landing-pages/faq";

// Sections
import PageHeaders from "layouts/sections/page-sections/page-headers";
import Features from "layouts/sections/page-sections/featuers";


const routes = [
  {
    name: "pages",
    icon: <Icon>dashboard</Icon>,
    columns: 1,
    rowsPerColumn: 2,
    collapse: [
      {
        name: "landing pages",
        collapse: [
          {
            name: "about us",
            route: "/pages/landing-pages/about-us",
            component: <AboutUs />,
          },
          {
            name: "contact us",
            route: "/pages/landing-pages/contact-us",
            component: <ContactUs />,
          },
          {
            name: "Testimonies",
            route: "/pages/landing-pages/author",
            component: <Author />,
          },
          {
            name: "FAQ",
            route: "/pages/landing-pages/faq",
            component: <FAQ />,
          },
          ],
      },
      
      {
        name: "account",
        collapse: [
          {
            name: "sign in",
            route: "/ges/autpahentication/sign-in",
            component: <SignIn />,
          },
        ],
      },
    ],
  },
  {
    name: "sections",
    icon: <Icon>view_day</Icon>,
    collapse: [
      {
        name: "page sections",
        description: "See all sections",
        dropdown: true,
        collapse: [
          {
            name: "Water Wisdom",
            route: "/sections/page-sections/Demonstration",
            component: <PageHeaders />,
          },
          {
            name: "features",
            route: "/sections/page-sections/Videos",
            component: <Features />,
          },
          { name: "Demostration", href: "https://www.youtube.com/watch?v=Y1fiKGj5H0E" },
          { name: "Videos", href: "https://www.youtube.com/watch?v=Y1fiKGj5H0E" },
          
        ],
      },
          
     
    ],
  },
  {
    name: "docs",
    icon: <Icon>article</Icon>,
    collapse: [
      {
        name: "Hydra Mannual",
        description: "All about overview, quick start, and contents",
        href: "/sections/page-sections/Demonstration",
      },
      
    ],
  },
  {
    name: "github",
    icon: <GitHubIcon />,
    href: "https://github.com/Vivian247/hydraWebApp",
  },
  // {
  //   name: "Profile",
  //   icon: <Icon>article</Icon>,
  //   collapse: [
  //     {
  //       name: "Hydra Mannual",
  //       description: "All about overview, quick start, and contents",
  //       href: "https://Vivian-Aniebonam/learning-lab/react/quick-start/material-kit/",
  //     },
      
  //   ],
  // },
];

export default routes;
