import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const QuizPage = () => {

    const [quiz, setQuiz] = useState({})
    const params = useParams();
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getQuiz = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('quiz_token');
                const response = await axios.get(`/api/quiz/${params.id}`, { headers: { quiz_token: token } })
                const data = await response.data;
                setQuiz(data);
                setLoading(false)
            } catch (error) {
                if (error.response.status === 400) {
                    setLoading(false)
                    navigate(`/result/quiz/${params.id}`)
                }
            }
        }
        getQuiz();
    }, [params.id, navigate])

    const handleOptionChange = (questionIndex, optionIndex) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[questionIndex] = optionIndex;
        setSelectedAnswers(updatedAnswers);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            const token = localStorage.getItem('quiz_token');
            // Transform selectedAnswers into the expected format
            const formattedSelectedAnswers = await selectedAnswers.map((selectedOptionIndex) => ({
                selectedOptionIndex,
            }));
            const response = await axios.post(
                `/api/quiz/${params.id}/submit`,
                { answers: formattedSelectedAnswers },
                { headers: { quiz_token: token } }
            );
            if (response.status === 200) {
                toast.success('Quiz submitted successfully!');
                setLoading(false)
                console.log(response)
                navigate(`/result/quiz/${response.data?.result?.quiz}`)
            }
        } catch (error) {
            toast.error('Please select all answers');
            setLoading(false)
        }
    };

    return (
        <>
            <div className="w-full min-h-screen pt-[100px]">
                <div className="max-w-[1100px] flex-col min-h-[50vh] items-center justify-center mx-auto px-5">
                    <h1 className='text-center text-3xl font-semibold tracking-wide text-gray-900'>Test Skills - {quiz?.name} </h1>
                    <p className='text-md text-center text-gray-700 my-4'>{quiz?.description}</p>
                    <form action="" className='mt-10 flex-col items-center justify-center gap-6 max-w-[500px] mx-auto px-5'>
                        {quiz?.questions?.map((question, questionIndex) => (
                            <div key={questionIndex} className='p-4 my-2 border-gray-100 border rounded-lg shadow-sm'>
                                <h3 className='text-md  mb-8 text-gray-900 tracking-wide '>{questionIndex + 1} . {question.questionText}</h3>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className='w-full border rounded-md my-2 py-2 px-3'>
                                        <input
                                            required
                                            type="radio"
                                            id={`question${questionIndex}_option${optionIndex}`}
                                            name={`question${questionIndex}`}
                                            value={optionIndex}
                                            checked={selectedAnswers[questionIndex] === optionIndex}
                                            onChange={() => handleOptionChange(questionIndex, optionIndex)}
                                        />
                                        <label className='px-3 text-sm text-gray-600' htmlFor={`question${questionIndex}_option${optionIndex}`}>{option}</label>
                                    </div>
                                ))}
                            </div>
                        ))}
                        <button disabled={loading || selectedAnswers.length !== 5} onClick={handleSubmit} className='input_btn w-full mb-8'> Submit </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default QuizPage