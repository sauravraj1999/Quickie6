import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../utils/Spinner'
import { toast } from 'react-hot-toast'

const Profile = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState('');
    const [userPosts, setUserPosts] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [allLanguages, setAllLanguages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('quiz_token');
                const res = await axios.get('/api/me', { headers: { quiz_token: token } });
                const data = res.data;
                setUser(data);
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        loadUser();
        const getUserResults = async () => {
            try {
                const token = localStorage.getItem('quiz_token');
                if (selectedLanguage === '') {
                    const response = await axios.get('/api/user/results', { headers: { quiz_token: token } })
                    const data = await response.data;
                    setUserPosts(data);
                    setLoading(false);
                }
                else {
                    setLoading(true);
                    const response = await axios.get(`/api/user/results?language=${selectedLanguage}`, { headers: { quiz_token: token } })
                    const data = await response.data;
                    setLoading(false);
                    setUserPosts(data);
                }

            } catch (error) {
                console.log(error)
            }
        }
        getUserResults();

        //Get languages
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

        if (!localStorage.getItem('quiz_token')) {
            navigate('/login')
        }
    }, [navigate, selectedLanguage])

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/api/user/result/${id}/delete`, { headers: { quiz_token: localStorage.getItem('quiz_token') } })
            if (res.status === 200) {
                toast.success('Quiz record deleted!')
                navigate('/')
            }
        } catch (error) {
            toast.error('Some error occured while deleting!')
        }
    }


    return (
        <>
            {loading ? <Spinner /> :
                <>
                    {
                        user && <div className="w-full min-h-screen flex items-start justify-center overflow-hidden" >
                            <div className="max-w-[1100px] mx-auto flex-col items-start justify-center px-4 pt-[130px] text-center">
                                <h1 className='text-3xl capitalize font-semibold tracking-wide text-gray-700 text-center'>{user?.user?.name}</h1>
                                <p className='text-md my-6 text-gray-700  text-center mx-auto '>{userPosts && userPosts.length === 0 ? "Lets start your learning journey" : `${userPosts?.length} Quiz Solved, you are doing well`}</p>
                                {/* select language  */}
                                <div className="flex gap-6 my-3 items-center justify-center">
                                    <p className='text-md text-gray-500 '>Select Language</p>
                                    <select name="language" onChange={(e) => setSelectedLanguage(e.target.value)} value={selectedLanguage} className="border rounded-md p-2 outline-none  ">
                                        <option value="defaultValue" disabled selected>Language!</option>
                                        <option value="" >All</option>
                                        {
                                            allLanguages && allLanguages?.map((e) =>
                                                <option key={e._id} value={e._id}>{e.name}</option>
                                            )
                                        }
                                    </select>
                                </div>
                                {/* select language  */}
                                {/* Table for showing content  */}
                                <table className="border-collapse border rounded-lg border-gray-100 w- my-4 mt-8">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-100 p-2 px-5">User Name</th>
                                            <th className="border border-gray-100 p-2 px=5">Quiz Name</th>
                                            <th className="border border-gray-100 p-2 px-5">Marks Obtained</th>
                                            <th className="border border-gray-100 p-2 px-5">Delete </th>
                                        </tr>
                                    </thead>
                                    {
                                        userPosts && userPosts?.length !== 0 ? <tbody>
                                            {userPosts && userPosts?.map((result, index) => {
                                                let totalMarks = 0;
                                                result.individualMarks.forEach((mark) => {
                                                    if (mark.difficultyLevel === 'beginner') {
                                                        totalMarks += 2;
                                                    } else if (mark.difficultyLevel === 'intermediate') {
                                                        totalMarks += 4;
                                                    } else if (mark.difficultyLevel === 'professional') {
                                                        totalMarks += 6; // Or any other value for professional level
                                                    }
                                                });

                                                return (
                                                    <tr key={index}>
                                                        <td className="border border-gray-100 p-2 px-5">{result?.user.name}</td>
                                                        <td className="border border-gray-100 p-2 px-5">{result?.quiz?.name}</td>
                                                        <td className="border border-gray-100 p-2 px-5">{result?.marksObtained} / {totalMarks}</td>
                                                        <td onClick={() => handleDelete(result._id)} className="border border-gray-100 p-2 px-5"><button className='px-3 py-1 bg-red-400 hover:bg-red-600 rounded-md text-white'>Delete</button></td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody> :
                                            <>
                                                <tr className='w-full   h-[150px] flex items-center justify-center'>
                                                    <td className='text-sm text-gray-800 text-center'>No results found</td>
                                                </tr>
                                            </>
                                    }
                                </table>
                                {/* Table ends  */}
                            </div>
                        </div>
                    }
                </>}
        </>
    )
}

export default Profile