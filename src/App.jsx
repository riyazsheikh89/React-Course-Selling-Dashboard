import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Appbar from "./components/Appbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Todo from "./components/Todo";

function App() {

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundColor: "#eeeeee"
    }}>


      <Router>
        <Appbar/>
         
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/todos" element={<Todo/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
