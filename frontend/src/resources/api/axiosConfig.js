import axios from "axios";

const baseURL = "http://127.0.0.1:8000";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("token")
      ? "JWT " + localStorage.getItem("token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === baseURL + "/token/refresh/"
    ) {
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === "Unauthorized"
    ) {
      const token = localStorage.getItem("token");

      if (token) {
        const tokenParts = JSON.parse(atob(token.split(".")[1]));

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000);
        console.log(tokenParts.exp);

        if (tokenParts.exp > now) {
          return axiosInstance
            .post("/token/refresh/", { token })
            .then((response) => {
              localStorage.setItem("token", response.data.token);

              axiosInstance.defaults.headers["Authorization"] =
                "JWT " + response.data.token;
              originalRequest.headers["Authorization"] =
                "JWT " + response.data.token;

              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("Refresh token is expired", tokenParts.exp, now);
          window.location.href = "/login/";
        }
      } else {
        console.log("Refresh token not available.");
        window.location.href = "/login/";
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error);
  }
);

export default axiosInstance;
