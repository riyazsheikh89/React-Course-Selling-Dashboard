import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Card } from '@mui/material';

function Signup() {
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
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth={true}
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth={true}
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth={true}
          />
          <br /> <br />
          <Button variant="contained">Sign Up</Button>
        </Card>
      </div>
    </>
  );
}

export default Signup
