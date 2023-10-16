import React, {useEffect, useState} from "react";
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';

const ShowBook =() =>{
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
    // const [showType, setShowType] = useState('table');
    const {id} = useParams()

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/books/${id}`)
            .then((response) => {
                setBook(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return(
        <div className="md:container md:mx-auto">
            <div className=" p-4 rounded border border-solid mt-5 shadow-sm	">
                <h3 className='capitalize mb-2'>{book.title}</h3>
                <hr/>
                <p className="capitalize">{book.author}</p>
                <p className="capitalize">{book.publisherYear}</p>
            </div>
        </div>
    )
}

export default ShowBook