const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const PORT = process.env.PORT || 5000;

// Centralized DB connection. Its a better practice 
// as compare to creating a new connection for each
// read/write operation.

// connectDB();

// if(!module.main === module){
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// }
const startServer = async() =>{
    try{
        await connectDB();
        app.listen(PORT, ()=>{
            console.log(`Server running on port ${PORT}`);
        });
    }catch(err){
        console.error("Failed to connect to MongoDB", err.message);
        process.exit(1);
    }
}

startServer();