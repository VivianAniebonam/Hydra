import { jwtDecode } from "jwt-decode";

//Saves the token and username in localStorage. Invokes a callback function.
const authenticate = (token, cb) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);

    let decoded = jwtDecode(token);
    localStorage.setItem("username", decoded.username);
  }
  cb();
};
//Checks if a user is authenticated based on the presence of a token in localStorage.
const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return !!localStorage.getItem("token");
};

const isAuthenticated2 = () => {
  if (typeof window === "undefined") {
    console.log("Window is undefined");
    return false;
  }
  if (!localStorage.getItem("token")) {
    console.log("Token not found");
    return false;
  }
  const decoded = jwtDecode(localStorage.getItem("token"));
  console.log("Decoded user:", decoded);
  return { user: decoded };
};

//Retrieves the token, username from localStorage.
const getToken = () => {
  if (typeof window === "undefined") {
    return false;
  }
  const token = localStorage.getItem("token");
  console.log("Retrieved token: ", token);
  return JSON.parse(token).token;
};

const getUsername = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return localStorage.getItem("username");
};

//Removes the token and username from localStorage.
const clearJWT = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }
};

export { authenticate, isAuthenticated, isAuthenticated2, getToken, getUsername, clearJWT };
