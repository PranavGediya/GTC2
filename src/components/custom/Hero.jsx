import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/services/GlobalApi";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.userSelection?.location?.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[0].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[0].name
      );
      console.log(PhotoUrl);
      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link to={"/view-trip/" + trip?.id}>
      <div className="hover:scale-105 transition-all">
        <img
          src={photoUrl ? photoUrl : "../placeholder.jpg"}
          className="h-[250px] w-full object-cover rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default function Hero() {

  return (
    <div className="relative bg-gradient-to-t from-[#b3e5fc] via-[#e1f5fe] to-[#f0f7ff] py-24 px-10 md:px-20 lg:px-40">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section */}
        <div className="text-center lg:text-left">
          <h1 className="font-extrabold text-[42px] lg:text-[54px] leading-tight text-[#003c66]">
            <span className="bg-gradient-to-r from-[#0288d1] to-[#03a9f4] bg-clip-text text-transparent">
              Plan Your Dream Journey:
            </span>{" "}
            AI-Powered Travel Itineraries
          </h1>
          <p className="text-lg lg:text-xl text-gray-700 mt-6">
            Experience effortless trip planning with personalized itineraries
            tailored to your style, budget, and preferences. Your next adventure
            starts here.
          </p>
          <Link to="/create-trip">
            <Button className="mt-8 px-10 py-4 text-lg bg-[#0288d1] text-white rounded-full hover:bg-[#0277bd] transition-all duration-300 shadow-lg transform hover:scale-105">
              Let's Create a Trip
            </Button>
          </Link>
        </div>

        {/* Right Section */}
        <div className="relative">
          <img
            src="../image2.png"
            alt="Adventure"
            className="rounded-xl shadow-2xl w-full lg:w-[85%] mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
