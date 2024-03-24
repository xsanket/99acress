import React, { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import { Link } from 'react-router-dom';
import ListingItem from '../components/ListingDetails';
import { db } from '../firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';

export default function Home() {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);

  useEffect(() => {
    async function fetchListings() {
      try {
        const listingsRef = collection(db, 'listings');

        const offerQuery = query(
          listingsRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const offerSnap = await getDocs(offerQuery);
        const offerList = offerSnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setOfferListings(offerList);

        const rentQuery = query(
          listingsRef,
          where('type', '==', 'rent'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const rentSnap = await getDocs(rentQuery);
        const rentList = rentSnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setRentListings(rentList);

        const saleQuery = query(
          listingsRef,
          where('type', '==', 'sale'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        const saleSnap = await getDocs(saleQuery);
        const saleList = saleSnap.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));
        setSaleListings(saleList);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListings();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>
            <Link to="/offers">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
              {offerListings.map((listing) => (
                <ListingItem key={listing.id} listing={listing.data} id={listing.id} />
              ))}
            </ul>
          </div>
        )}
        {/* Similar checks for rentListings and saleListings */}
      </div>
    </div>
  );
}
