import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

function Course() {
    const { courseId } = useParams();
    const setCourses = useSetRecoilState(coursesState);

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
        <div style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 50
            }}>
            <CourseCard courseId={courseId} />
            <UpdateCard courseId={courseId} />
        </div>
    );
}

// Render the couse that is going to be updated
function CourseCard(props) {
  const courses = useRecoilValue(coursesState);
  let course = null;

  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == props.courseId) {
      course = courses[i];
    }
  }

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
      }}
    >
      <CardMedia
        component="img"
        height="194"
        image={course.imageLink}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="h6" textAlign={"center"}>
          {course.title}
        </Typography>
        <Typography variant="body2" textAlign={"center"} color="text.secondary">
          {course.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

// Course updation card
function UpdateCard(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [courses, setCourses] = useRecoilState(coursesState);

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
            await fetch(`http://localhost:3000/admin/courses/${props.courseId}`, {
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
                })
            });
            alert("Status: successfull updated course");

            let updatedCourses = [];
            for (let i=0; i<courses.length; i++) {
                if (courses[i].id == props.courseId) {
                    updatedCourses.push({
                        id: props.courseId,
                        title: title,
                        description: description,
                        imageLink: image
                    })
                } else {
                    updatedCourses.push(courses[i]);
                }
            }
            setCourses(updatedCourses);
            
          }}>
            Update Course
          </Button>
        </Card>
    );

}


export default Course;

// creating an atom
// ref: https://recoiljs.org/docs/introduction/getting-started
const coursesState = atom({
  key: 'coursesState',
  default: '',
});
