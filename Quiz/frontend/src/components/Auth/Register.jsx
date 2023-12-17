import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import toast from 'react-hot-toast';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/register', { name, email, password });
            if (response.status === 200) {
                toast.success('User created Successfully!');
                navigate('/login')
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error(error.response.data.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('quiz_token')) {
            navigate('/')
        };
    }, [navigate])

    return (
        <>
            <div className="w-full min-h-screen flex items-center">
                <form className="max-w-[500px] mx-auto">
                    <h1 className="text-3xl text-gray-800 text-center font-semibold my-2">Register</h1>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="input" placeholder="Enter your name!" />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="input" placeholder="Enter your email!" />
                    <input minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="input" placeholder="Enter Password" />
                    <button onClick={handleSubmit} className="input_btn w-full flex items-center justify-center " disabled={loading || name.length < 4 || email.length < 7 || password.length < 8}> {loading ? <><div className="loader"></div> Registering</> : 'Register'} </button>
                    <div className="my-3">
                        <Link to='/login' className='text-sm text-gray-700 '>Already have account ? Login</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register