import { Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from "./Pages/Profile";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Quotes from "./Pages/Quotes";
import Slot from "./Pages/Slot";
import Visitor from "./Pages/Visitor";
import Pictures from "./Pages/Pictures"
import Course from "./Pages/Course";
function App() {
  const user = localStorage.getItem("token");
  return (
    <div>
        <Sidebar />
      <div style={{ marginLeft: '200px' }}>
      <Navbar />
      <div className="container-fluid py-3">
    <Routes>
		
			{user ? (
				<>
					<Route path="/" exact element={<Profile />} />
					<Route path="/profile" exact element={<Profile />} />
					<Route path="/quote" exact element={<Quotes />} />
          <Route path="/course" exact element={<Course />} />
          <Route path="/addpictures" exact element={<Pictures />} />
          <Route path="/addslot" exact element={<Slot />} />
          <Route path="/visitors" exact element={<Visitor />} />
				</>
			) : (
				<>
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path="/profile" element={<Navigate replace to="/login" />} />
					<Route path="/quote" element={<Navigate replace to="/login" />} />
          <Route path="/course" element={<Navigate replace to="/login" />} />
          <Route path="/addpictures" element={<Navigate replace to="/login" />} />
          <Route path="/addslot" element={<Navigate replace to="/login" />} />
          <Route path="/visitors" element={<Navigate replace to="/login" />} />

				</>
			)}
		</Routes>
		</div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default App
