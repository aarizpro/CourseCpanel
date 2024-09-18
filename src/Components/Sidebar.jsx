import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Sidebar.css';
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <div className=" text-white vh-100" style={{ width: '200px', position: 'fixed', top: 0, left: 0,backgroundColor:'#5B5AB3' }}>
      <div className="d-flex flex-column align-items-start p-3">
        <a href="/" className="text-white text-decoration-none mb-3">
          <img
            src={logo}
            width="180"
            height="70"
            className="d-inline-block align-top"
            style={{borderRadius:"30%"}}
            alt=""
          />
        </a>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to={'/profile'} className="nav-link text-white custom-link" ><i class="bi bi-award-fill"></i> Profile</Link>
          </li>
          <li>
            <Link to={'/quote'} className="nav-link text-white custom-link" ><i class="bi bi-building-fill-check"></i> Add Quotes</Link>
          </li>
          
          <li>
            <Link to={'/course'} className="nav-link text-white custom-link" ><i class="bi bi-bus-front-fill"></i>  Add Course</Link>
          </li>
          <li>
           
            <Link to={'/addpictures'} className="nav-link text-white custom-link" ><i class="bi bi-fire"></i>  Add Pictures</Link>
          </li>
          <li>
            
            <Link to={'/addslot'} className="nav-link text-white custom-link" ><i class="bi bi-boombox-fill"></i>   Add Slot</Link>
          </li>
          <li>
            
            <Link to={'/visitors'} className="nav-link text-white custom-link" ><i class="bi bi-binoculars-fill"></i>  Visitor Report</Link>
          </li>
          
        </ul>
        <hr />
      </div>
    </div>
  );
};

export default Sidebar;
