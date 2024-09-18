import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddPicture = ({ show, handleClose }) => {
     //const url="http://localhost:3000/";
     const url = "https://karthik.ciprecisionproducts.com/"
 
    const [imgName, setImgName] = useState("");
    const [imgLink, setImgLink] = useState("");
    const [file, setFile] = useState(null);
    const handleSave = async () => {
        try {
            const newTeacher = {
                imgName: imgName,
                imgLink: imgLink
            };

            await axios.post(`${url}api/cimage`, newTeacher);
            toast.success('Course added successfully');


        } catch (error) {
            toast.error('Failed to add Course');
            console.error(error);
        }
    };
    const handleClose1 = ()=>{
        handleClose();
    }
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
            setImgLink(response.data.location); // Ensure you are setting a valid string
            toast.success("File uploaded successfully");
        } catch (error) {
            toast.error("File upload failed");
            console.log(error);
        }
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Pictures</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Picture Name</Form.Label>
                        <Form.Control type="text" value={imgName} placeholder="Enter Course Name" onChange={(e) => setImgName(e.target.value)} />
                    </Form.Group>
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
                    <Form.Group>
                        <Form.Label>Img Link</Form.Label>
                        <Form.Control type="text" value={imgLink} placeholder="" onChange={(e) => setImgLink(e.target.value)} />
                    </Form.Group>


                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddPicture;
