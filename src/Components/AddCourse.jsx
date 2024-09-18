import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddCourse = ({show, handleClose}) => {
    //const url="http://localhost:3000/";
    const url = "https://karthik.ciprecisionproducts.com/"
 
    const [couName, setCouName] = useState("");
    const [couDuration, setCouDuration] = useState("");
    const [couType, setCouType] = useState("");
    const [couPrice, setCouPrice] = useState("");
    const [couAbout, setCouAbout] = useState("");
  
    const handleSave = async () => {
        try {
            const newTeacher = {
                couName:couName,
                couDuration:couDuration,
                couType:couType,
                couPrice:couPrice,
                couAbout:couAbout
            };

            await axios.post(`${url}api/course`, newTeacher);
            toast.success('Course added successfully');
           
           
        } catch (error) {
           toast.error('Failed to add Course');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control type="text" value={couName}   placeholder="Enter Course Name" onChange={(e) => setCouName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Duration</Form.Label>
                        <Form.Control type="text" value={couDuration}   placeholder="Enter Course Duration" onChange={(e) => setCouDuration(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Type</Form.Label>
                        <Form.Control type="text" value={couType}   placeholder="Enter Course Type" onChange={(e) => setCouType(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Price</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Course Price"
                            value={couPrice}
                            onChange={(e) => setCouPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>About Course</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6} 
                            placeholder="Enter About the Course"
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

export default AddCourse;
