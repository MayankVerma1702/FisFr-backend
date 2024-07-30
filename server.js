import express from "express"
import "dotenv/config"
import connectDB from "./config/db.js";
import files from "./routes/files.js"
import show from "./routes/show.js"
import download from "./routes/download.js"
import path from "path"
import { fileURLToPath } from 'url';
import cors from 'cors'



const PORT = process.env.PORT || 3000;
const app = express();

// CORS options to allow requests from localhost:5500
const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
  // Use CORS middleware with specified options
  app.use(cors(corsOptions));

app.use(express.static('public')); 
app.use(express.json())

connectDB();

//Template Engine
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'ejs')

app.use('/api/files', files)
app.use('/files', show)
app.use('/files/download', download)


try {
    app.listen(PORT, ()=>{
        console.log(`Listening on port ${PORT}`);
    })
} catch (error) {
    console.log(error);
}

