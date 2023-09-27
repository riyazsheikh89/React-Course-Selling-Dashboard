import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";

function AddCourse() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

  return (
    <>
      <div>
        <div
          style={{
            paddingTop: 100,
            marginBottom: 20,
            fontFamily: "roboto",
            display: "flex",
            justifyContent: "center",
          }}
        > <h2>Add new courses here</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
            label="Title"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
                setTitle(e.target.value)
            }}
          />
          <br />
          <br />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
                setDescription(e.target.description)
            }}
          />
          <br />
          <br />
          <Button variant="contained" size={"large"} onClick={async () => {
            const response = await fetch("http://localhost:3000/admin/courses", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    published: true,
                    image: ""
                    // published, iamge : these are hardcode value
                })
            })
            
          }}>
            Add Course
          </Button>
        </Card>
      </div>
    </>
  );
}

export default AddCourse;