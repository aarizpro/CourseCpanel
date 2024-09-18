import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const [insLink,setInsLink]= useState("");
  const [insName,setInsName]= useState("");
  const [insMobile,setInsMobile]= useState("");
  const [insEmail,setInsEmail]= useState("");
  const [insImgurl,setInsImgurl]= useState("");
  const [insMessage,setInsMessage]= useState("");
  const [insAboutme,setInsAboutme]= useState("");
  const [isloading,setIsloading]= useState(false);
  const [insId,setInsId]= useState("");
  const [file, setFile] = useState(null);
  //const url="http://localhost:3000/";
  const url = "https://karthik.ciprecisionproducts.com/"
 

  const saveProfile=async(e)=>{
    e.preventDefault();
    if(insName===""||insLink===""||insMobile===""||insEmail===""||insImgurl===""||insMessage===""||insAboutme===""){
      alert("Enter all Fields");
      return
    }
    try {
      setIsloading(true);
      const response = await axios.put(`${url}api/profile/${insId}`,{
        insLink:insLink,
        insName:insName,
        insMobile:insMobile,
        insEmail:insEmail,
        insImgurl:insImgurl,
        insMessage:insMessage,
        insAboutme:insAboutme
      });
      toast.success(`Updated Profile Details Successfully..`);
      setIsloading(false);
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/profile/66e91fa3f663d66a43f29f4d`);
      setInsLink(response.data.insLink);
      setInsName(response.data.insName);
      setInsMobile(response.data.insMobile);
      setInsEmail(response.data.insEmail);
      setInsImgurl(response.data.insImgurl);
      setInsMessage(response.data.insMessage);
      setInsAboutme(response.data.insAboutme);
      setInsId(response.data._id);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${url}upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      setInsImgurl(response.data.location); // Ensure you are setting a valid string
      toast.success("File uploaded successfully");
    } catch (error) {
      toast.error("File upload failed");
      console.log(error);
    }
  };
  return (
    <div>
   <div className="card mx-auto mt-4 p-4 shadow-lg" style={{ maxWidth: '60rem' }}>
    <h2 className="text-center font-weight-bold mb-3">Update Profile</h2>
     
      <form onSubmit={saveProfile}>
        <div className="form-group">
          <label>Instructor Name</label>
          <input
            type="text"
            value={insName}
            onChange={(e) => setInsName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn Profile Link</label>
          <input
            type="text"
            value={insLink}
            onChange={(e) => setInsLink(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Mobile No:</label>
          <input
            type="text"
            value={insMobile}
            onChange={(e) => setInsMobile(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Email ID:</label>
          <input
            type="text"
            value={insEmail}
            onChange={(e) => setInsEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-3">
        <label>Upload File</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="form-control"
        />
        <button
          type="button"
          onClick={uploadFile}
          className="btn btn-primary w-100 mt-2"
        >
          Upload
        </button>
      </div>
        <div className="form-group">
          <label>Profile Pic URL</label>
          <input
            type="text"
            value={insImgurl}
            onChange={(e) => setInsImgurl(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Message:</label>
          <textarea
            rows="3"
            type="text"
            value={insMessage}
            onChange={(e) => setInsMessage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>About Me:</label>
          <textarea
            rows="8"
            type="text"
            value={insAboutme}
            onChange={(e) => setInsAboutme(e.target.value)}
            className="form-control"
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary btn-block mt-4"
        >
          Update
        </button>
      </form>
    </div>
  </div>


  )
}

export default Profile