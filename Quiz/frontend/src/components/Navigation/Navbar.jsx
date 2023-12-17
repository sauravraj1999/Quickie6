import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import image from '../../images/img.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'


const Navbar = () => {

    const toggle = useRef();
    const toggleNav = useRef();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('quiz_token')
        toast.success('User logged out!')
    }

    const handleVisible = () => {
        setDialogOpen(!dialogOpen);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            //Means on toggle current situation, if its not target, Then just hide the box
            if (toggle.current && !toggle.current.contains(e.target)) {
                setDialogOpen(false);
                // setOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClick);
        const handleOutsideClickNav = (e) => {
            //Means on toggle current situation, if its not target, Then just hide the box
            if (toggleNav.current && !toggleNav.current.contains(e.target)) {
                setOpen(false);
                // setOpen(false);
            }
        };
        document.addEventListener('click', handleOutsideClickNav);
    }, [toggle]);


    return (
        <nav className='w-full h-[70px] fixed blurry'>
            <div className='max-w-[1200px] h-full flex items-center justify-between mx-auto px-4'>
                <Link to='/' className='text-2xl text-gray-700 font-bold tracking-wider w-[100px] '>Quickie</Link>
                <div className="flex items-center justify-center h-full gap-5">
                    <Link className='text-[14px] text-gray-700 font-semibold sm:flex hidden hover:text-indigo-700  transition-all' to='/quizes'>Quizes</Link>
                    <Link className='text-[14px] text-gray-700 font-semibold sm:flex hidden hover:text-indigo-700 transition-all' to='/leaderboard'>Leaderboard</Link>
                    <button ref={toggleNav} className='text-xl text-gray-900 bg-none outline-none sm:hidden flex' onClick={() => setOpen(!open)}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                    {
                        localStorage.getItem('quiz_token') && localStorage.getItem('quiz_token') ?
                            <div ref={toggle} onClick={handleVisible} className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer relative" >
                                <img src={image} alt="profileImage" className='w-full rounded-full' />

                                {
                                    dialogOpen ?
                                        <div onClick={() => setDialogOpen(false)} className="blurry flex-col absolute w-[180px] top-[65px] right-0 z-[9] rounded-md shadow-md">
                                            <div className='py-2 px-4 w-full'> <Link className='text-sm text-gray-600 w-full hover:text-gray-700' to='/profile'> <FontAwesomeIcon className='pr-[5px]' icon={faUser} /> Profile</Link></div>
                                            <div onClick={handleLogout} className='py-2 px-2 w-[90%] mx-auto border-t-[0.2px] border-red-200'> <button className='text-sm text-red-400 w-full outline-none text-left' > <FontAwesomeIcon className='pr-[5px]' icon={faRightFromBracket} /> Logout</button></div>
                                        </div> : ""
                                }

                            </div>

                            : <Link className='text-white bg-gray-900 rounded-md px-7 text-[14px] py-2' to='/login'>Login</Link>
                    }
                </div>
            </div>

            {
                open && <div className="w-[100%] blurry  h-[70px] absolute top-[70px]  flex gap-6 items-center justify-center ">
                    <Link className='text-[14px] text-gray-700 font-semibold ' to='/quizes'>Quizes</Link>
                    <Link className='text-[14px] text-gray-700 font-semibold  ' to='/leaderboard'>Leaderboard</Link>
                </div>
            }
        </nav>
    )
}

export default Navbar