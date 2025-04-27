const Feedback = require('../models/Feedback');

// POST /feedback
const submitFeedback = async (req, res)=>{
    try{
        const {name, email, feedbackText, category} = req.body;
        
        if(!name || !email || !feedbackText){
            return res.status(400).json({message: "Name, Email and/or FeedbackText are missing."});
        }
        
        // basic email validation
        if(!email.includes('@')){
            return res.status(400).json({message:"Invalid Email Address"});
        }

        const feedback = new Feedback({
            name,
            email, 
            feedbackText,
            category
        });

        await feedback.save();
        res.status(201).json({message: "Feedback submitted successfully"});
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

//GET /feedback
const getFeedback = async(req, res)=>{
    try{
        const feedbackList = await Feedback.find().sort({createdAt: -1});
        res.status(200).json(feedbackList);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};

module.exports = {
    submitFeedback,
    getFeedback
};