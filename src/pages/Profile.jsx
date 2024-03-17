import React, { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth"
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from "../firebase"
import { doc, updateDoc } from 'firebase/firestore';
import { FcHome } from "react-icons/fc";




export default function Profile() {

  const navigate = useNavigate();
  const auth = getAuth();
  //creating hook
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  //destructing an object to get the values
  const { name, email } = formData

  //sign out from profile
  function onLogout() {
    auth.signOut();
    navigate("/sign-in")

  }

  //edit functionality
  const [changeDetails, setChangeDetail] = useState(false)
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }



  async function onSubmit() {
    try {
      const auth = getAuth();
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        toast.success(`${name}? thats great`);
        // Update into database
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });


      }
    } catch (error) {
      //console.error( error); 
      toast.error("Failed to update profile");
    }
  }


  return (
    <>
      <section className='max-w-6xl mx-auto flex justify-center items-center flex-col'>
        <h1 className='text-3xl  text-center mt-6 font-bold '>
          My Profile
        </h1>
        <div className='w-full md:w-[50%] mt-6 px-3'>
          <form>
            {/* //name */}
            <input type="text" id="name" value={name} disabled={!changeDetails} onChange={onChange}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out 
              ${changeDetails && "bg-red-200 focus:bg-red-200"}`}
            />
            {/* //email */}
            <input type="text" id="email" value={email} disabled
              className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out'
            />

            <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
              <p className='flex items-center'>Do you want to change your name?
                <span onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetail((prevState) => !prevState);
                }}
                  className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1 cursor-pointer' >
                  {changeDetails ? "Apply change" : "Edit"}
                </span>

              </p>

              <p onClick={onLogout} className='text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out cursor-pointer' >Sign Out</p>
            </div>
          </form>


          <button type='submit' className='w-full bg-blue-600 text-white uppercase
          px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition ease-in-out 
          duration-150 hover:shadow-lg active:bg-blue-800 '>
            <Link to="/create-listing" className='flex justify-center items-center' >
              <FcHome className=' flex mr-2 text-3xl bg-red-200 rounded ' /> Sell or rent home
            </Link>
          </button>
        </div>
      </section>
    </>
  )
}
