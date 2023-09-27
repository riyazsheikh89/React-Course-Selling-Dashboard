import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Appbar() {
  // navigate different route without refreshing
  const navigate = useNavigate();

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
