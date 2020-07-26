import React from "react";
import Svg, { Path } from "react-native-svg";

const HamburguerIcon = (props) => (
  <Svg width={28} height={16} {...props}>
    <Path
      d="M1 1h26M1 8h15m6 0h4M1 15h26"
      fill="none"
      stroke="#E09A5A"
      strokeWidth={2}
      strokeLinecap="round"
      strokeMiterlimit={10}
    />
  </Svg>
);

export default HamburguerIcon;
