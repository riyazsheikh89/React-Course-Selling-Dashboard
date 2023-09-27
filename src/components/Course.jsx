import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RenderCourses } from "./Courses";
import { Button, Card, TextField } from "@mui/material";

function Course() {
    const { courseId } = useParams();
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

    let course = null;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].id == courseId) {
          course = courses[i];
        }
    }
    
    if (!course) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50
            }}>
            <RenderCourses course={course}/>
            <UpdateCard course={course} courses={courses} setCourses={setCourses} />
        </div>
    );
}


function UpdateCard(props) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const course = props.course;    // course to be updated
    const courses = props.courses;  // courses array


    return (
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
                setDescription(e.target.value)
            }}
          />
          <br />
          <br />
          <TextField
            label="Image Link"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
                setImage(e.target.value)
            }}
          />
          <br />
          <br />
          <Button 
            variant="contained" 
            size={"large"} 
            onClick={async () => {
            await fetch(`http://localhost:3000/admin/courses/${course.id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    title,
                    description,
                    published: true,
                    imageLink: image
                    // published, iamgeLink : these are hardcoded value
                })
            });
            alert("Status: successfull updated course");
            // window.location = `/courses/${course.id}`

            let updatedCourses = [];
            for (let i=0; i<courses.length; i++) {
                if (courses[i].id == course.id) {
                    updatedCourses.push({
                        id: course.id,
                        title: title,
                        description: description,
                        imageLink: image
                    })
                } else {
                    updatedCourses.push(courses[i]);
                }
            }
            props.setCourses(updatedCourses);
            
          }}>
            Update Course
          </Button>
        </Card>
    );

}


export default Course;
