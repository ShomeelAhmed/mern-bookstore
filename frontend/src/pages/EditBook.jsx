import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

// import { useSnackbar } from 'notistack';

const EditBook = () => {
    const [book, setBook] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisherYear, setPublisherYear] = useState('');
    const [loading, setLoading] = useState(false);
    // const navigate = useNavigate();
    // const { enqueueSnackbar } = useSnackbar();
    const {id} =useParams();
    const fetchData = async () => {
        setLoading(true);
        const response = await axios.get(`http://localhost:5555/books/${id}`).then((response)=>{
            setLoading(false);
            setBook(response.data.data)
            setTitle(response.data.data.title);
            setAuthor(response.data.data.author);
            setPublisherYear(response.data.data.publisherYear);
        }).catch((error) => {
            console.log(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);


    const handleSaveBook = () => {
        const data = {
            title,
            author,
            publisherYear,

        };
        const isAnyKeyNullOrEmpty = Object.values(data).some(value => value === null || value === "");
        if (isAnyKeyNullOrEmpty ){
            alert('Please fill all the fields')
        }
        else{
            setLoading(true);
            axios.put(`http://localhost:5555/books/${id}`, data)
                .then(() => {
                    setLoading(false);
                    // enqueueSnackbar('Book Created successfully', { variant: 'success' });
                    // navigate('/');
                })
                .catch((error) => {
                    setLoading(false);
                    // alert('An error happened. Please Chack console');
                    // enqueueSnackbar('Error', { variant: 'error' });
                    console.log(error);
                });
        }

    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Create Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type='number'
                        value={publisherYear}
                        onChange={(e) => setPublisherYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2  w-full '
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default EditBook