import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../customHooks/auth";

const Api = axios.create({
  // baseURL: "http://localhost:8080/v1/api",
  baseURL: "https://platform.foresty.uz/v1/api",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  credentials: "same-origin",
});

Api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        Authorization: "Bearer " + token,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    let isRefreshing = false;
    let accessToken = "";
    const originalRequest = config;

    const subscribers = [];

    function subscribeTokenRefresh(cb) {
      subscribers.push(cb);
    }

    function onRefreshed(newToken) {
      subscribers.forEach((cb) => cb(newToken));
    }
    if (
      status === 401 &&
      !originalRequest._retry &&
      error.config.url !== "/auth/login"
    ) {
      if (isRefreshing) {
        // Wait for the new access token before retrying the original request
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return refreshAccessToken()
        .then((newToken) => {
          isRefreshing = false;
          accessToken = newToken;
          onRefreshed(newToken);

          // Update the Authorization header with the new access token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return axios(originalRequest);
        })
        .catch((error) => {});
    }

    return Promise.reject(error);
  }
);

// const AxiosInterceptor = ({ children }) => {
//   //   const { token, setToken } = useAuth();
//   const navigate = useNavigate();
//   let isRefreshing = false;
//   let accessToken = "";

//   const subscribers = [];

//   function subscribeTokenRefresh(cb) {
//     subscribers.push(cb);
//   }

//   function onRefreshed(newToken) {
//     subscribers.forEach((cb) => cb(newToken));
//   }

//   Api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const {
//         config,
//         response: { status },
//       } = error;
//       const originalRequest = config;

//       if (
//         status === 401 &&
//         !originalRequest._retry &&
//         error.config.url !== "/auth/login"
//       ) {
//         if (isRefreshing) {
//           // Wait for the new access token before retrying the original request
//           return new Promise((resolve) => {
//             subscribeTokenRefresh((newToken) => {
//               originalRequest.headers.Authorization = `Bearer ${newToken}`;
//               resolve(axios(originalRequest));
//             });
//           });
//         }

//         originalRequest._retry = true;
//         isRefreshing = true;

//         return refreshAccessToken()
//           .then((newToken) => {
//             isRefreshing = false;
//             accessToken = newToken;
//             onRefreshed(newToken);

//             // Update the Authorization header with the new access token
//             originalRequest.headers.Authorization = `Bearer ${newToken}`;

//             return axios(originalRequest);
//           })
//           .catch((error) => {});
//       }

//       return Promise.reject(error);
//     }
//   );

//   Api.interceptors.request.use(
//     async (config) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers = {
//           Authorization: "Bearer " + token,
//         };
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   async function refreshAccessToken() {
//     try {
//       const formData = new FormData();
//       const refreshToken = localStorage.getItem("refresh-token");
//       formData.append("refresh_token", refreshToken);
//       const response = await Api.post("/auth/refresh", formData);

//       const newAccessToken = response.data.data.accessToken;

//       // Store the new access token securely
//       localStorage.setItem("token", newAccessToken);

//       return newAccessToken;
//     } catch (error) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("refresh-token");
//       //   setToken(null);
//       navigate("/login");
//     }
//   }

//   return children;
// };

// export { AxiosInterceptor, refreshToken };

export default Api;

async function refreshToken() {
  try {
    const formData = new FormData();
    const refreshToken = localStorage.getItem("refresh-token");
    formData.append("token", refreshToken);
    const response = await Api.post("/auth/accessToken", formData);

    const newAccessToken = response.data.data.accessToken;

    // Store the new access token securely
    localStorage.setItem("token", newAccessToken);

    return true;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    return false;
  }
}

async function refreshAccessToken() {
  try {
    const formData = new FormData();
    const refreshToken = localStorage.getItem("refresh-token");
    formData.append("refresh_token", refreshToken);
    const response = await Api.post("/auth/refresh", formData);

    const newAccessToken = response.data.access_token;

    // Store the new access token securely
    localStorage.setItem("token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh-token");
    //   setToken(null);
    window.location.href = "/login";
  }
}
