import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';
import AddCourse from '../Components/AddCourse';
import EditCourse from '../Components/EditCourse';


const Course = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedClients, setSelectedClients] = useState(null);
  const [showModal1, setShowModal1] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  //const url="http://localhost:3000/";
  const url = "https://karthik.ciprecisionproducts.com/"
  useEffect(() => {
    fetchData();
  }, []);
  
  const handleAdd = () => {
    setShowModal1(true);
    fetchData();
};
const handleClose = () => {
  setShowModal1(false);
  setShowModal(false);
  setSelectedClients(null);
  fetchData();
 };
 const handleEdit = (clients) => {
  setSelectedClients(clients);
  setShowModal(true);
  fetchData();
};
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/course`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  const filteredData = data.filter(row => 
    row.couName.toLowerCase().includes(search.toLowerCase())
  );
  const columns = [
    {
      name: 'Course Name',
      selector: row => row.couName,
    },
    {
      name: 'Duration',
      selector: row => row.couDuration,
    },
    {
      name: 'Type',
      selector: row => row.couType,
    },
    {
      name: 'Price',
      selector: row => row.couPrice,

    },
    {
      name: 'About Course',
      selector: row => row.couAbout,
      wrap: true, // Ensures the text is wrapped
      style: {
        width: '1200px', // Fix the column width
      },
    },
    {
      name: 'Action',
      cell: row => (
        <div className="d-flex justify-content-between p-2">
            <div className='p-2'> 
          <button
            onClick={() => editAirway(row)}
            class="btn btn-success"
          >
           <i class="bi bi-pencil-square"></i> 
          </button>
          </div>

          <div className='p-2'> 
          <button
            onClick={() => deleteAirway(row._id)}
            class="btn btn-danger"
          >
          <i class="bi bi-trash"></i> 
          </button>
          </div>
        </div>
      ),
    },
  ];
  const editAirway = (row) => {
   
    handleEdit(row);
  };
  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/course/${id}`);
      toast.success('Deleted Successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete');
      console.log(error);
    }
  };
  return (
    <div className='flex'>
    <div className='w-1/2 max-w-lg bg-white shadow-lg p-7 rounded mt-2'>
      <h2 className='font-semibold  mb-2 block text-center'>
      Course Details
      </h2>
      
    </div>
    <div className='w-1/1 pt-4 pl-4 rounded flex flex-col'>
      <div className="d-flex justify-content-between mb-2 p-2">
        <div className='p-2'>
        <input 
          type="text" 
          placeholder="Search by Customer Name" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className='mb-4 p-2 border border-gray-300 rounded'
        />
        </div>
        <div className='p-2'>
        <button type="button" class="btn btn-success" onClick={handleAdd}><i class="bi bi-person-plus-fill"></i></button>
        </div>
        </div>
        <div className="flex-grow">
          <DataTable
            columns={columns}
            data={filteredData}
            selectableRows
            fixedHeader
            pagination
          />
        </div>
      </div>
      {selectedClients && (
                <EditCourse
                    show={showModal}
                    handleClose={handleClose}
                    clients={selectedClients}
                    
                />
            )}
      <AddCourse
                show={showModal1}
                handleClose={handleClose}
       />
    </div>
  )
}

export default Course