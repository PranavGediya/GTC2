import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

export default function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 mb-3">Hotel Recomendation</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <HotelCardItem hotel={hotel} key={index} />
        ))}
      </div>
    </div>
  );
}
