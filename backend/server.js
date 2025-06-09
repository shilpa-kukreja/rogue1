import express, { application } from 'express'
import cors from 'cors'
import 'dotenv/config'
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import contactRouter from './routes/contactRoutes.js';
import router from './routes/subscribeRoutes.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app=express();


app.use(cors());
app.use(express.json())
app.use(bodyParser.json())
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

connectDB()



app.use('/api/auth',authRoutes)
app.use("/api/products", productRoutes);
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api',contactRouter)
app.use('/api',router)

const PORT =process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})