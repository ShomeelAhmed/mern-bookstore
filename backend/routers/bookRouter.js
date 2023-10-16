import express from "express";
const router = express.Router()
import {Book} from "../models/bookModel.js";


// get all books
router.get('/', async (req, res)=>{
    console.log(req)
    try{
        const books = await Book.find({})
        return res.status(200).json({
            count : books.length,
            data : books
        })

    } catch (error){
        console.log(error.message);
        return res.status(500).send({ message : error.message})
    }
})

// get a book

router.get('/:id', async (req, res)=>{
    console.log(req)
    try{
        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).json({
            count : book.length,
            data : book
        })

    } catch (error){
        console.log(error.message);
        return res.status(500).send({ message : error.message})
    }
})

// add book
router.post('/', async (req, res)=>{
    console.log(req)
    try{
        if (!req.body.title || !req.body.author || !req.body.publisherYear){
            return res.status(400).send({
                message : 'send all required fields'
            })
        }
        const newBook = {
            title : req.body.title,
            author : req.body.author,
            publisherYear : req.body.publisherYear
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch (error){
        console.log(error.message);
        return res.status(500).send({ message : error.message})
    }
})

// update book

router.put('/:id', async (req, res)=>{
    console.log(req)
    try{
        if (!req.body.title || !req.body.author || !req.body.publisherYear){
            return res.status(400).send({
                message : 'send all required fields'
            })
        }
        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if(!result){
            return res.status(404).send('Data not found')
        }

        return res.status(200).send({
            'message' : 'Book update successfully',
            'data' : result
        })

    } catch (error){
        console.log(error.message);
        return res.status(500).send({ message : error.message})
    }
})

// delete book
router.delete('/:id', async (req, res)=>{
    console.log(req)
    try{
        const {id} = req.params;
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return res.status(404).send('Book not found')
        }
        return res.status(200).send('Book is deleted successfully')


    } catch (error){
        console.log(error.message);
        return res.status(500).send({ message : error.message})
    }
})

export default router