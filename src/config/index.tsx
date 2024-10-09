// NAME
const STORE_NAME = "state";

// NETWORK
const NETWORK_CONFIG = {
  HOST: process.env.NEXT_PUBLIC_APP_URL,
  API_BASE_URL: process.env.NEXT_PUBLIC_APP_URL + "/api/v1",
  TIMEOUT: 30000,
  RETRY: false,
  DISPLAY_ERROR: process.env.NEXT_PUBLIC_DISPLAY_ERROR === "true",
  USE_TOKEN: true,
  WITH_METADATA: false,
};

// PATHNAME
const PATHNAME = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
};

// LAYOUT
const LAYOUT_CONFIG = {
  useSidebar: true,
  useNavbar: true,
  useFooter: true,
  useBottomNavigator: true,
};

export default {
  STORE_NAME,
  NETWORK_CONFIG,
  PATHNAME,
  LAYOUT_CONFIG
};
