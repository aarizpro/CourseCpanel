import React, { useState,useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
const Quotes = () => {
  const [quoteMessage,setQuoteMessage]= useState("");
  const [quoteAuthor,setQuoteAuthor]= useState("");
  const [isloading,setIsloading]= useState(false);
  const [insId,setInsId]= useState("");
  const [file, setFile] = useState(null);
   //const url="http://localhost:3000/";
   const url = "https://karthik.ciprecisionproducts.com/"
 
  const saveProfile=async(e)=>{
    e.preventDefault();
    if(quoteMessage===""||quoteAuthor===""){
      alert("Enter all Fields");
      return
    }
    try {
      setIsloading(true);
      const response = await axios.put(`${url}api/quotes/${insId}`,{
        quoteMessage:quoteMessage,
        quoteAuthor:quoteAuthor
      });
      toast.success(`Updated Quote Details Successfully..`);
      setIsloading(false);
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsloading(false);
    }
  }
  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}api/quotes/66e92c49c4090c3d10286839`);
      setQuoteAuthor(response.data.quoteAuthor);
      setQuoteMessage(response.data.quoteMessage);
      setInsId(response.data._id);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to fetch data');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
    <div className="card mx-auto mt-4 p-4 shadow-lg" style={{ maxWidth: '60rem' }}>
    <h2 className="text-center font-weight-bold mb-3">Update Quotes</h2>
    <form onSubmit={saveProfile}>
    <div className="form-group">
          <label>Quotes :</label>
          <textarea
            type="text"
            rows="3"
            value={quoteMessage}
            onChange={(e) => setQuoteMessage(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={quoteAuthor}
            onChange={(e) => setQuoteAuthor(e.target.value)}
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

export default Quotes