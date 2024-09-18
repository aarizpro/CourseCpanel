import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DataTable from 'react-data-table-component';


const Visitor = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
   //const url="http://localhost:3000/";
   const url = "https://karthik.ciprecisionproducts.com/"
 
  useEffect(() => {
    fetchData();
  }, []);
  
  

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/visit`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  const filteredData = data.filter(row => 
    row.vName.toLowerCase().includes(search.toLowerCase())
  );
  const columns = [
    {
      name: 'Name',
      selector: row => row.vName,
    },
    {
      name: 'Email',
      selector: row => row.vEmail,
    },
    {
      name: 'Mobile',
      selector: row => row.vMobile,
    },
    {
      name: 'Requested',
      selector: row => row.vAbout,
    },
    {
      name: 'Date',
      selector: row => row.vDate,
    },
    {
      name: 'Time',
      selector: row => row.vTime,
    },
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
      name: 'Action',
      cell: row => (
        <div className="d-flex justify-content-between p-2">
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
  
  const deleteAirway = async (id) => {
    try {
      await axios.delete(`${url}api/visit/${id}`);
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
      Visitor Request Details
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
      
     
    </div>
  )
}

export default Visitor