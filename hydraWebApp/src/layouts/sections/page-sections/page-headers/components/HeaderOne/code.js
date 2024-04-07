/* eslint-disable no-template-curly-in-string */
const bgImage =
  "`${linearGradient(rgba(gradients.dark.main, 0.5), rgba(gradients.dark.state, 0.5))}, url(${bgImage})`";

const headerOneCode = `
/*
=========================================================
*  React - v2.1.0
=========================================================

* Product Page: https://researchgrips.com/
* Copyright 2024 (https://Vivian-Aniebonam)

Coded by Vivian-Aniebonam

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import BaseLayout from "layouts/sections/components/BaseLayout";
import View from "layouts/sections/components/View";
import MKTypography from "components/MKTypography";
import HeaderOne from "layouts/sections/page-sections/page-headers/components/HeaderOne";

function PageHeaders() {
  return (
    <BaseLayout
      title="Hydration Insights & Features"
      breadcrumb={[
        { label: "Home", route: "/" },
        { label: "Hydration Insights & Features" },
      ]}
    >
      <View  height="auto">
        <HeaderOne />
        <MKTypography variant="body1" component="p" p>     
        </MKTypography>

        <MKTypography variant="body1" component="p" p>     
        </MKTypography>
        <MKTypography variant="body1" component="p" paragraph>
          Welcome to Hydra, your ultimate hydration companion. Our application leverages cutting-edge technology to ensure you maintain optimal hydration throughout the day. With Hydra, you can track your hydration, receive personalized recommendations, integrate with wearables, and stay motivated with challenges and rewards. Embrace a healthier lifestyle with Hydra - because your hydration matters.
        </MKTypography>
        
        <MKTypography variant="body1" component="p">
          Staying well-hydrated is crucial for your health and well-being. Here are some tips to help you maintain optimal hydration: Understand your needs, carry water everywhere, eat water-rich foods, set reminders, and monitor your urine. With Hydra, you&apos;re not just tracking water intake; you&apos;re taking a step towards a healthier, more vibrant life. Start your hydration journey today!
        </MKTypography>


        <MKTypography variant="body1" component="p" p>     
        </MKTypography>
        <MKTypography variant="body1" component="div" sx={{ marginTop: "20px" }}>
  <MKTypography variant="h6">The Importance of Staying Hydrated</MKTypography>
  <ul style={{ listStyleType: "disc", marginLeft: "20px", marginTop: "20px" }}> {/* Inline styles for bullet points */}
    <li><MKTypography variant="body1">Improves physical performance and endurance.</MKTypography></li>
    <li><MKTypography variant="body1">Enhances brain function, concentration, and mood.</MKTypography></li>
    <li><MKTypography variant="body1">Helps to detoxify the body through the elimination of waste.</MKTypography></li>
    <li><MKTypography variant="body1">Regulates body temperature through sweating and respiration.</MKTypography></li>
    <li><MKTypography variant="body1">Maintains skin health and vitality, keeping it clear and glowing.</MKTypography></li>
    <li><MKTypography variant="body1">Prevents and alleviates headaches commonly caused by dehydration.</MKTypography></li>
  </ul>
</MKTypography>

<MKTypography variant="body1" component="div" sx={{ marginTop: "20px", marginBottom: "20px" }}>
  <MKTypography variant="h6">Recommended Water for Drinking &amp; Purification Tips</MKTypography>
  <MKTypography variant="body1" component="p" paragraph>
    Ensuring the water you drink is clean and safe is crucial for your health. Here are some recommended types of water for drinking and tips on purifying them:
  </MKTypography>
  <ul style={{ listStyleType: "disc", marginLeft: "20px", marginBottom: "20px", marginTop: "20px"  }}>
    <li><MKTypography variant="body1">Spring Water: Naturally filtered and rich in minerals. Always ensure it&apos;s sourced from a safe, uncontaminated spring.</MKTypography></li>
    <li><MKTypography variant="body1">Filtered Tap Water: A cost-effective and environmentally friendly option. Use a quality water filter to remove chlorine and other impurities.</MKTypography></li>
    <li><MKTypography variant="body1">Bottled Water: Convenient but vary in quality. Choose brands that disclose their source and filtration process.</MKTypography></li>
    <li><MKTypography variant="body1">Alkaline Water: Said to offer health benefits by neutralizing acid in the bloodstream. Ensure it&apos;s from a reliable source.</MKTypography></li>
    <li><MKTypography variant="body1">Distilled Water: Free from impurities and minerals. Best for those requiring mineral-free water for specific health reasons.</MKTypography></li>
    <li><MKTypography variant="body1">Purification Methods: Boiling, distillation, reverse osmosis, and carbon filtration are effective methods to purify drinking water at home.</MKTypography></li>
  </ul>
  <MKTypography variant="body1" component="p">
    Remember, the best water for you depends on your local water quality and personal health needs. Regular testing and choosing the right purification method can ensure your drinking water is both safe and enjoyable.
  </MKTypography>
</MKTypography>


      </View>
    </BaseLayout>
  );
}

export default PageHeaders;`;

export default headerOneCode;
