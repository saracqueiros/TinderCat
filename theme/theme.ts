import { Dimensions } from "react-native";

const theme = {
  colors: {
    primary: "#EC537E",
    secondary: "#434141",
    shadow: "#BFBFC0",
  },
  icons: {
    size: 24,
  },
  borderRadius: 36,

  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

};

export default theme;