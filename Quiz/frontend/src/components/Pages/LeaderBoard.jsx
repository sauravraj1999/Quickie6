import { useState, useEffect } from 'react'
import axios from 'axios';
import Spinner from '../utils/Spinner'

const Leaderboard = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [allLanguages, setAllLanguages] = useState([]);
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState([]);

    useEffect(() => {
        const getResults = async () => {
            try {
                if (selectedLanguage === '') {
                    const response = await axios.get(`/api/leaderboard`);
                    const data = await response.data;
                    setResultData(data);
                    setLoading(false);
                }
                else {
                    setLoading(true);
                    const response = await axios.get(`/api/leaderboard?language=${selectedLanguage}`);
                    const data = await response.data;
                    setLoading(false);
                    setResultData(data);
                }
            } catch (error) {
                console.log(error)
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
        getResults();
    }, [selectedLanguage])


    return (
        <>
            {loading ? <Spinner /> : <div className="w-full min-h-screen flex items-start justify-center overflow-hidden" >
                <div className="max-w-[1100px] mx-auto flex-col items-start justify-center px-4 pt-[100px] text-center overflow-hidden">
                    <h1 className='text-3xl capitalize font-semibold tracking-wide text-gray-700 text-center'>Leaderboard</h1>
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
                    {/* Table for showing content  */}
                    <table className="border-collapse border rounded-lg border-gray-100 w- my-4 mt-8">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-100 p-2 px-5">User Name</th>
                                <th className="border border-gray-100 p-2 px=5">Quiz Name</th>
                                <th className="border border-gray-100 p-2 px-5">Marks Obtained</th>
                            </tr>
                        </thead>
                        {
                            resultData.length !== 0 ? <tbody>
                                {resultData.map((result, index) => {
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
                                            <td className="border border-gray-100 p-2 px-5">{result.marksObtained} / {totalMarks}</td>
                                        </tr>
                                    );
                                })}
                            </tbody> :
                                <>
                                    <tbody className='w-full h-[150px] flex items-center justify-center'>
                                        <td className='text-sm text-gray-800 text-center'>No results found</td>
                                    </tbody>
                                </>
                        }
                    </table>
                    {/* Table ends  */}
                </div>
            </div>}
        </>
    )
}

export default Leaderboard