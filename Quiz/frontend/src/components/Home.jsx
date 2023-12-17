import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <div className=" w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50">
                <div style={{ paddingTop: '120px' }} className="max-w-[1000px] min-h-[90vh] mx-auto flex-col items-center justify-center overflow-hidden ">
                    <h1 className='sm:text-5xl text-4xl text-gray-900 capitalize font-black text-center leading-[50px] tracking-wide '>
                        Keep Learning New Languages and Uplift yourself!
                    </h1>
                    <p className='text-center my-5 text-semibold text-gray-600'>Improve your effeciency in Languages and become begineer to Experienced!</p>
                    <div className="service_box w-[100%] mx-auto xs:mt-[40px] mt-[20px]">
                        <div className="card_box">
                            <div className="service_card">
                                <h1 >Master English</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master French</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Chinese</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Korean</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Italian</h1>
                            </div>
                        </div>
                        <div className="card_box">
                            <div className="service_card">
                                <h1 >Master English</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master French</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Chinese</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Korean</h1>
                            </div>
                            <div className="service_card">
                                <h1 >Master Italian</h1>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-4">
                        <Link className='text-white bg-gray-950 px-6 py-2 rounded-lg hover:bg-gray-800 transition-all' to='/quizes'>Explore Quizes</Link>
                        <Link className='text-gray-900 border-[0.2px] border-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all' to='/leaderboard'>Our Winners</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home