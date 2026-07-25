import React from "react";
import Svg, { Path } from "react-native-svg";

const HamburguerIcon = (props) => (
  <Svg width="100%" height="100%" viewBox="0 0 28 16" {...props}>
    <Path
      d="M1 1h26M1 8h15m6 0h4M1 15h26"
      fill="none"
      stroke="#D1813F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeMiterlimit={10}
    />
  </Svg>
);

export default HamburguerIcon;
