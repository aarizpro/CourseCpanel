import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCourse = ({show, handleClose, clients}) => {
    //const url="http://localhost:3000/";
    const url = "https://karthik.ciprecisionproducts.com/"
 
     const [couName, setCouName] = useState("");
    const [couDuration, setCouDuration] = useState("");
    const [couType, setCouType] = useState("");
    const [couPrice, setCouPrice] = useState("");
    const [couAbout, setCouAbout] = useState("");
  
    useEffect(() => {
        if (clients) {
            setCouName(clients.couName);
            setCouDuration(clients.couDuration);
            setCouType(clients.couType);
            setCouPrice(clients.couPrice);
            setCouAbout(clients.couAbout);
        }
    }, [clients]);
    const handleSave = async () => {
        try {
            const newTeacher = {
                couName:couName,
                couDuration:couDuration,
                couType:couType,
                couPrice:couPrice,
                couAbout:couAbout
            };

            await axios.put(`${url}api/course/${clients._id}`, newTeacher);
            toast.success('Course added successfully');
            setCouName("");
            setCouDuration("");
            setCouType("");
            setCouPrice("");
            setCouAbout("");
           
        } catch (error) {
           toast.error('Failed to add Course');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control type="text" value={couName}  onChange={(e) => setCouName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Duration</Form.Label>
                        <Form.Control type="text" value={couDuration} onChange={(e) => setCouDuration(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Type</Form.Label>
                        <Form.Control type="text" value={couType} onChange={(e) => setCouType(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Pincode"
                            value={couPrice}
                            onChange={(e) => setCouPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>About Course</Form.Label>
                        <Form.Control
                           as="textarea"
                           rows="6"
                            placeholder="Enter Email"
                            value={couAbout}
                            onChange={(e) => setCouAbout(e.target.value)}
                        />
                    </Form.Group>
                   
                   
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                   Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditCourse;
