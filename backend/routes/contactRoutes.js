import express from 'express'
import  { addContact, contact, listContact, removeContact } from '../controllers/contactController.js';



const contactRouter=express.Router()


contactRouter.post('/send-email',contact);
contactRouter.post('/add',addContact);
contactRouter.get('/get',listContact);
contactRouter.post('/remove',removeContact);

export default contactRouter;