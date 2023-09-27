import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourses = async() => {
          const response = await fetch("http://localhost:3000/admin/courses", {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          });
          const data = await response.json();
          console.log("Courses: ", data);
          setCourses(data.courses);
        }
        getCourses();
      }, []);

    return (
      <>
        <div>
          <h3 style={{ fontFamily: "roboto", textAlign: "center" }}>
            Courses List:
          </h3>
        </div>

        <div style={{ 
            display: "flex", 
            flexWrap: "wrap", 
            justifyContent: "center",
        }}>
          {courses.map(course => {
            return <RenderCourses course={course}/>;
          })}
        </div>
      </>
    );
}


// component to render courses
export function RenderCourses(props) {
    return (
      <Card style={{ 
        margin: 10,
        width: 300,
        minHeight: 200
       }}>
        <CardMedia
          component="img"
          height="194"
          image={props.course.imageLink}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="h6" textAlign={"center"} >
            {props.course.title}
          </Typography>
          <Typography variant="body2" textAlign={"center"} color="text.secondary">
            {props.course.description}
          </Typography>
        </CardContent>
      </Card>
    );
}

export default Courses;
