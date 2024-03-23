import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

export default function Contact({ userRef, listing }) {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");
  const [isValidMessage, setIsValidMessage] = useState(false);

  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get landlord data");
      }
    }
    getLandlord();
  }, [userRef]);

  useEffect(() => {
    setIsValidMessage(message.trim().length > 0);
  }, [message]);

  function onChange(e) {
    setMessage(e.target.value);
  }


//contact through web gmail
  function openGmail(e) {
    e.preventDefault();
    const emailSubject = encodeURIComponent(listing.name);
    const emailBody = encodeURIComponent(message);
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(landlord.email)}&su=${emailSubject}&body=${emailBody}`;
    window.open(gmailLink, '_blank');
  }

  function makeFirstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      {landlord !== null && (
        <div className="flex flex-col w-full">
          <p className="font-semibold">
          Contact {makeFirstLetterUppercase(landlord.name)} for the {makeFirstLetterUppercase(listing.name)}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={onChange}
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              placeholder="Enter your message here"
              aria-label="Message"
            ></textarea>
          </div>
          <button
            className={`px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full text-center mb-6 ${isValidMessage ? '' : 'opacity-50 cursor-not-allowed'}`}
            type="button"
            onClick={openGmail}
            disabled={!isValidMessage}
          >
            Send Message
          </button>
        </div>
      )}
    </>
  );
}
