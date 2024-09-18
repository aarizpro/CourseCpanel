import React, { useState,useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddSlot = ({show, handleClose}) => {
     //const url="http://localhost:3000/";
     const url = "https://karthik.ciprecisionproducts.com/"
 
    const [cName, setCName] = useState("");
    const [cSlot, setCSlot] = useState("");
    const [products, setProducts] = useState([]);
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}api/course`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching courier names:', error);
        }
    };
    const handleCust = (e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        setCName(selectedOption.value);
       
    }
    useEffect(() => {
       fetchProducts();

    }, []);
    const handleSave = async () => {
        try {
            const newTeacher = {
                cName:cName,
                cSlot:cSlot
            };

            await axios.post(`${url}api/cslot`, newTeacher);
            toast.success('Slot added successfully');
           
           
        } catch (error) {
           toast.error('Failed to add Slot');
            console.error(error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                    <div className='row mb-2'>
                        <div className="input-group col-md-2">
                        <span class="input-group-text">Course Name:</span>
                        <select
                                value={cName}
                                onChange={handleCust}
                                onClick={handleCust}
                                class="form-control "
                            >
                                <option value='' disabled>Select Product</option>
                                {products.map((name) => (
                                    <option key={name._id} value={name.couName}
                                             >
                                        {name.couName}

                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Course Duration</Form.Label>
                        <Form.Control type="text" value={cSlot}   placeholder="Enter Slot Time" onChange={(e) => setCSlot(e.target.value)} />
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

export default AddSlot;
