import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

function Courses() {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
      const getCourses = async () => {
        const { data } = await axios.get("http://localhost:3000/admin/courses", {
            headers: {
              "Content-type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("Courses: ", data);
        setCourses(data.courses);
      };
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
            return <RenderCourses key={course.id} course={course}/>;
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
