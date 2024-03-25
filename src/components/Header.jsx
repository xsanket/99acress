import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }

    // sign in/profile hook
    const [pageState, setPageState] = useState("sign in");
    const auth = getAuth();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setPageState("profile");
            }
            else {
                setPageState("sign in")
            }
        }, [auth]);
    })


    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
            <header className='flex justify-between px-3 max-w-6xl mx-auto'>
                <div className='py-3'>
                    <img src='/logo.png' alt='Your Image Alt Text'
                        className='h-5 cursor-pointer ' onClick={() => {
                            navigate("/")
                        }} />
                </div>
                <div className='footer-container flex justify-center items-center'>
                    <a
                        href='https://github.com/xsanket?tab=repositories'
                        target='_blank'
                        className='icon text-2xl mr-4 cursor-pointer hover:text-gray-400'
                    >
                        <FaGithub />
                    </a>
                    <a
                        href='https://www.linkedin.com/in/sanket-kamble-9840b6252/'
                        target='_blank'
                        className='icon text-2xl cursor-pointer hover:text-gray-400'
                    >
                        <FaLinkedin />
                    </a>
                </div>

                <div>
                    <ul className='flex cursor-pointer space-x-10'>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${pathMatchRoute("/") && "text-black border-b-red-600"}`} onClick={() => { navigate("/") }}>Home</li>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${pathMatchRoute("/offers") && "text-black border-b-red-600"}`} onClick={() => { navigate("/offers") }} >Offers</li>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                            "text-black border-b-red-600"}`}
                            onClick={() => navigate("/profile")}
                        >
                            {pageState}

                        </li>
                    </ul>
                </div>


            </header>
        </div>
    )
}
