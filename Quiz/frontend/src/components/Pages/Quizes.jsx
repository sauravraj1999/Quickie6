import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Spinner from '../utils/Spinner'

const Quizes = () => {

    const [quiz, setQuiz] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [allLanguages, setAllLanguages] = useState([])
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const getAllQuiz = async () => {
            try {
                setLoading(true);
                if (selectedLanguage === '') {
                    const response = await axios.get(`/api/getAllQuiz`);
                    const data = await response.data;
                    setQuiz(data);
                    setLoading(false);
                }
                else {
                    setLoading(true);
                    const response = await axios.get(`/api/getAllQuiz?languageId=${selectedLanguage}`);
                    const data = await response.data;
                    setQuiz(data);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        }

        const getAllLanguages = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/api/getAllLan`);
                const data = await response.data;
                setAllLanguages(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }
        getAllLanguages();
        getAllQuiz();

    }, [selectedLanguage])


    return (
        <>
            {
                loading ? <Spinner /> : <div className="w-full min-h-screen flex items-center justify-center overflow-hidden" >
                    <div className="max-w-[1100px] mx-auto flex-col items-center justify-center px-4 pt-[100px] text-center">
                        <h1 className='text-3xl capitalize font-semibold tracking-wide text-gray-700 text-center'>Test Your skills</h1>
                        <p className='text-md text-gray-700 mt-3 mb-10'>Explore and test your skills with different language based Quizes!</p>
                        <div className="flex gap-6 my-3 items-center justify-center">
                            <p className='text-md text-gray-500 '>Select Language</p>
                            <select name="language" onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage} className="border rounded-md p-2 outline-none  ">
                                <option value="defaultValue" disabled selected>Language!</option>
                                <option value="" >All!</option>
                                {
                                    allLanguages && allLanguages?.map((e) =>
                                        <option key={e._id} value={e._id}>{e.name}</option>
                                    )
                                }
                            </select>
                        </div>

                        {/* Get all quizes */}
                        <div className="flex items-center justify-center flex-wrap w-full gap-4 my-8">
                            {
                                quiz && quiz?.map((e) =>
                                    <div key={e._id} className="w-[100%] md:w-[500px] h-[230px] flex-col items-start justify-center shadow-sm rounded-md border p-4">
                                        <h1 className='h-[50px] text-xl text-gray-900 leading-30px text-start  font-semibold tracking-wide  '>{e.name}</h1>
                                        <p className='text-sm text-gray-700 my-2 text-start h-[30px] '>{e.description}</p>
                                        <p className='text-xs text-start p-1 border w-[140px] mb-3 h-[20px]' >Language : {e.language.name}</p>
                                        <div className='h-[100px] flex items-center justify-start gap-2'>
                                            <button onClick={() => localStorage.getItem('quiz_token') ? navigate(`/quiz/${e._id}`) : setOpen(true)} className='py-2 px-10 text-center bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-800'>View</button>
                                            <Link className='py-2 px-6 text-center text-gray-900 underline text-sm rounded-lg hover:tracking-wide transition-all'>View Leaderboard</Link>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            }
            <Dialog open={open} onClose={() => setOpen(false)} >
                <div className='py-4 px-12'>
                    <h1 className='text-3xl text-gray mb-8'>Login to access</h1>
                    <DialogActions >
                        <button className='bg-white text-gray-900 border rounded-md px-7 py-2' variant='outlined' color="error" onClick={() => setOpen(false)} >Cancel</button>
                        <Link to='/login' onClick={() => setOpen(false)} type='submit' className='text-white bg-gray-900 px-7 py-2 rounded-md' variant='contained' color="success"  >Login</Link>
                    </DialogActions>
                </div>
            </Dialog>
        </>
    )
}

export default Quizes