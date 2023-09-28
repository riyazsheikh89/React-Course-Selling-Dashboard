import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todo from "./components/Todo";
import AddCourse from "./components/AddCourse";
import Courses from "./components/Courses";
import Course from "./components/Course";
import { RecoilRoot } from "recoil";

function App() {

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#eeeeee",
      }}
    >
      <RecoilRoot>
        <Router>
          <Appbar />

          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<Course />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/todos" element={<Todo />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
