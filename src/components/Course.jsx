import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, CardMedia, TextField, Typography } from "@mui/material";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import axios from "axios";

function Course() {
    const { courseId } = useParams();
    const setCourses = useSetRecoilState(coursesState);

    useEffect(() => {
        const getCourses = async() => {
            const { data } = await axios.get("http://localhost:3000/admin/courses", {
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            });
            console.log("Courses inside course edit: ", data);
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
            const config = {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            };
            await axios.put(`http://localhost:3000/admin/courses/${props.courseId}`, {
                title,
                description,
                published: true,
                imageLink: image,
              },
              config
            );
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
