import React, {useState, useEffect} from 'react'
import './App.css'
import FeedbackDashboard from './components/FeedbackDashboard'
import FeedbackForm from './components/FeedbackForm'
import api from './services/api'

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedback = async() =>{
    try{
      const res = await api.get('/feedback');
      setFeedbacks(res.data);
    }catch(error){
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchFeedback();
  }, []);

  return (
    <div style={{padding: '20px'}}>
      <h1>User Feedback System</h1>
      <FeedbackForm onFeedbackSubmitted={fetchFeedback}/>
      <hr/>
      <FeedbackDashboard feedbacks={feedbacks}/>
    </div>
  )
}

export default App
