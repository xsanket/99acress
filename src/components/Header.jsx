import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location)
    function pathMatchRoute(route) {
        if (route === location.pathname) {
            return true
        }
    }



    return (
        <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
            <header className='flex justify-between px-3 max-w-6xl mx-auto'>
                <div className='py-3'>
                    <img src='https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg' alt='logo'
                        className='h-5 cursor-pointer ' onClick={()=>{
                            navigate("/")
                        }} />
                </div>

                <div>
                    <ul className='flex cursor-pointer space-x-10'>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${pathMatchRoute("/") && "text-black border-b-red-600"}`} onClick={()=>{ navigate("/")}}>Home</li>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${pathMatchRoute("/offers") && "text-black border-b-red-600"}`} onClick={()=>{navigate("/offers")}} >Offers</li>
                        <li className={`py-3 text-sm font-semibold 
                             text-gray-400 border-b-[3px]
                             ${pathMatchRoute("/sign-in") && "text-black border-b-red-600"}`} onClick={()=>{navigate("/sign-in")}}>SignIn</li>
                    </ul>
                </div>


            </header>
        </div>
    )
}
