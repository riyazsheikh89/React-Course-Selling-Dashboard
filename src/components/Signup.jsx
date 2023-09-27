import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';
import { useState } from 'react';

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div>
        <div
          style={{
            paddingTop: 100,
            marginBottom: 20,
            fontFamily: "roboto",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <h2>Welcome to coursera. Sign up below</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            fullWidth={true}
          />
          <br /> <br />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br /> <br />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth={true}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br /> <br />
          <Button variant="contained"
            onClick={async () => {
              const response = await fetch("http://localhost:3000/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  username: email, 
                  password: password
                  }),
                headers: {
                  "Content-type": "Application/json"
                }
              });
              const data = await response.json();
              console.log("RESPONSE: ", data);
              // store the token inside local storage
              localStorage.setItem("token", data.token);
            }}
          >Sign Up</Button>
        </Card>
      </div>
    </>
  );
}

export default Signup
