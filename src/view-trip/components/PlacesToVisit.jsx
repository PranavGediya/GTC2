import React from "react";
import PlaceCardItem from "./PlaceCardItem";

export default function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg mt-5 mb-2">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div className="mt-5" key={index}>
            <h2 className="font-bold text-lg">Day {item?.day}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item?.plan?.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium text-sm text-orange-600">
                    {place?.time}
                  </h2>
                  <PlaceCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
