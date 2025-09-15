import { Dimensions } from "react-native";

const theme = {
  colors: {
    primary: "#EC537E",
    secondary: "#434141",
    grey: "#BFBFC0",
    white: "#FFFFFF",
  },
  fonts: {
    regular: "NunitoSans_400Regular",
    light: "NunitoSans_300Light",
    semiBold: "NunitoSans_600SemiBold",
    bold: "NunitoSans_700Bold",
  },
  icons: {
    size: 24,
  },
  borderRadius: 36,
  borderRadiusSmall: 16,

  screen: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  shadow: {
    shadowColor: '#BFBFC0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },

};

export default theme;