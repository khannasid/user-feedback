import React, {useState} from "react";
import api from "../services/api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function FeedbackForm({onFeedbackSubmitted}){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        feedbackText: "",
        category: "Suggestion"
    });

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!formData.name || !formData.email || !formData.feedbackText){
            toast.error("Please fill in all required fields.");
            return;
        }

        try{
            await api.post('/feedback',formData);
            toast.success('Feedback submitted Successfully!!!');
            setFormData({name:'', email:'', feedbackText:'',category:"Suggestion"});
            // Notify App.js to reload dashboard
            onFeedbackSubmitted();
        }catch(err){
            toast.error("Error while submitting Feedback!!");
        }
    };
    return(
    <>
      <form onSubmit={handleSubmit} style={formStyle}>
            <input 
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required 
                style={inputStyle}
            />
            <br/>

            <input 
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required 
                style={inputStyle}
            />
            <br/>

            <textarea 
                name="feedbackText"
                placeholder="Feedback"
                value={formData.feedbackText}
                onChange={handleChange}
                required 
                style={{...inputStyle, height:'100px'}}
            />
            <br/>

            <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
            >
                <option>Suggestion</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
            </select>
            <br/>

            <button type="submit" style={buttonStyle}>
                Submit Feedback
            </button>
        </form>
        <ToastContainer position="top-center"/>
    </>
    )
}


const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '500px',
    margin: '0 auto',
    padding: '10px'
  };
  
  const inputStyle = {
    marginBottom: '10px',
    padding: '10px',
    width: '90%',     // Responsive width
    maxWidth: '400px',
    fontSize: '16px'
  };
  
  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    width: '60%'
  };

export default FeedbackForm;