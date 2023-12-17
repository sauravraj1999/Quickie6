import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Spinner from '../utils/Spinner'
import Notfound from './NotFound'

const QuizResults = () => {

    const params = useParams();
    const [results, setResults] = useState();
    const [loading, setLoading] = useState(false);
    const [quizQuestion, setQuizQuestion] = useState('')

    useEffect(() => {
        const getResults = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('quiz_token')
                const res = await axios.get(`/api/result/quiz/${params.id}`, { headers: { quiz_token: token } });
                const data = await res.data;
                if (res.status === 200) {
                    setResults(data);
                    setQuizQuestion(data.result.quiz.questions)
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            }
        }
        getResults();
    }, [params.id
    ])

    return (
        <>
            {loading && loading ? <Spinner /> :
                <>
                    {results && quizQuestion ?
                        <div className="w-full min-h-screen pt-[100px]">
                            <div className="max-w-[1100px] flex-col min-h-[50vh] items-center justify-center mx-auto px-5">
                                <h1 className='text-center text-2xl font-semibold tracking-wide text-gray-900'>Test Skills - {results?.quizTitle} </h1>
                                <p className='text-md text-center text-gray-700 my-4'>Total marks : {results?.result?.marksObtained}/{results?.userMaxMarks}</p>



                                {results && results?.result?.individualMarks?.map((mark, index) => (
                                    <div key={index} className="p-4 m border border-gray-200 shadow-sm rounded-md mx-2 my-3">
                                        <h3 className='text-md mb-8  text-gray-900 tracking-wide '>
                                            {index + 1}. {quizQuestion[index]?.questionText}
                                        </h3>
                                        <div className='w-full  rounded-md my-2 py-2 px-3'>
                                            <label className={`rounded-md text-sm text-gray-600 px-5 py-2 ${mark.marks === 0 ? 'bg-red-300' : 'bg-green-200'}`} htmlFor={`index`}>
                                                Selected Option:   {quizQuestion && quizQuestion[index]?.options[mark.selectedOptionIndex]}  <span className={` ml-4 ${mark.marks === 0 ? 'opacity-[0]' : 'opacity-[1] text-green-600'}`}> [{quizQuestion && quizQuestion[index]?.difficultyLevel === "beginner" ? '2 Marks' :
                                                    quizQuestion[index]?.difficultyLevel === "intermediate" ? '4 Marks' : '6 Marks'}] </span>
                                            </label>
                                        </div>
                                    </div>
                                ))}

                                <div className='my-4'>
                                    <Link to='/quizes' className='input_btn w-[250px] text-center mx-5 my-4  '>Go back</Link>
                                </div>
                            </div>
                        </div > : <Notfound />
                    }
                </>
            }
        </>
    )
}

export default QuizResults