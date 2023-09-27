import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  // navigate different route without refreshing
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const getUser = async() => {
      const response = await fetch("http://localhost:3000/admin/me", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await response.json();
      if (data.username) {
        setUserEmail(data.username);
      }
    }
    getUser();
  }, []);

  // conditionally render the page
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
          Email: { userEmail}
        </div>
  
        <div>
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
                navigate("/addcourse");
            }} 
        >Add Course
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
