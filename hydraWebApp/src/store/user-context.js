import { getToken } from "../components/auth/auth-helper";

let backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

//CREATE A USER
const signUpHandler = async (data) => {
  try {
    const res = await fetch(`${backendUrl}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const resData = await res.json();
      throw new Error(resData.message || "Unable to create User!...");
    }
    return true;
  } catch (error) {
    console.error(error.message);
  }
};

//LOGIN/SIGIN
const signin = async (email, password) => {
  console.log(email, password);
  try {
    const token = getToken(); // Assuming getToken() retrieves the token
    console.log("Token:", token);
    const response = await fetch("http://localhost:3001/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "", // Append token if available
      },
      body: JSON.stringify({ email, password }),
    });
    return await response.json();
    //console.log('Response status:', await response.json());
    // const jsonResponse = await response.json();
    // if (!jsonResponse.success) {
    //   throw new Error('Failed to sign in. Please try again.'); // or handle specific error cases based on response status
    // }

    // const data = jsonResponse;
    // console.log(data);
    // // Assuming your server sends back an object with a 'success' field indicating the sign-in status
    // if (data.success) {
    //   console.log(data);
    //   console.log('Sign-in successful');
    //   // Handle successful sign-in, e.g., set user authentication state, store tokens, redirect, etc.
    // } else {
    //   throw new Error(data.message || 'Failed to sign in. Please try again.'); // handle error messages from the server
    // }
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error; // rethrow the error for the caller to handle
  }
};

//UPDATE A USER
const updateUserHandler = async (userId, user) => {
  try {
    let response = await fetch(backendUrl + "/users/edit/" + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + getToken(),
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//DELETE A USER
const deleteUserHandler = async (userId, token) => {
  try {
    let response = await fetch(`${backendUrl}/remove/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

//READ A USER

//GET USER BY ID
const getByUserId = async (userId, token) => {
  try {
    let response = await fetch(backendUrl + `/users/getUserByUserId/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { signin, signUpHandler, deleteUserHandler, updateUserHandler, getByUserId };
