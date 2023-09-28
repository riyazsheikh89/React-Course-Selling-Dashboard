import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appbar() {
  // navigate different route without refreshing
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getUser = async() => {
      const { data } = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      // if user exists
      if (data.username) {
        setUserEmail(data.username);
      }
    }
    getUser();
  }, []);

  // conditionally render the page, if the user is login then show this
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 5
        }}
      >
        <div>
          <Typography variant="h5">Coursera</Typography>
        </div>

        <div>
          <Typography >{ userEmail }</Typography>
        </div>
  
        <div>
          <Button
              onClick={() => {
                navigate("/courses");
              }} 
          >Courses
          </Button>
          <Button
              onClick={() => {
                  navigate("/addcourse");
              }} 
          >Add Course
          </Button>
          <Button
              onClick={() => {
                  localStorage.setItem("token", null);
                  window.location = "/"; // we need page to be refreshed
              }} 
          >Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 5
      }}
    >
      <div>
        <Typography variant="h5">Coursera</Typography>
      </div>

      <div>
        <Button
            onClick={() => {
                navigate("/courses");
            }} 
        >Courses
        </Button>
        <Button
            onClick={() => {
                navigate("/signup");
            }} 
        >Sign Up
        </Button>
        <Button
            onClick={() => {
                navigate("/signin");
            }}
        >Login
        </Button>
      </div>
    </div>
  );
}

export default Appbar;
