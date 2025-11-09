import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constant/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { chatSession } from "@/services/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { setDoc, doc } from "firebase/firestore";
import { db } from "@/services/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.noOfDays ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details");
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-10 px-5 lg:px-20 my-10 bg-gradient-to-t from-[#b3e5fc] via-[#e1f5fe] to-[#f0f7ff] py-20 rounded-lg">
      {/* Left Panel */}
      <div className="lg:w-2/3 flex flex-col gap-10">
        <h2 className="font-bold text-4xl text-[#003c66]">Plan Your Dream Trip 🏕️🌴</h2>
        <p className="text-[#004d80] text-lg">
          Enter a few details to customize your travel experience.
        </p>

        {/* Destination */}
        <div>
          <h2 className="text-lg font-medium text-[#005b96]">Choose a Destination</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              onChange: (place) => {
                setPlace(place);
                handleInputChange("location", place);
              },
            }}
          />
        </div>

        {/* Trip Duration */}
        <div>
          <h2 className="text-lg font-medium text-[#005b96]">
            How many days are you planning your trip? (Choose between 1 and 7)
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            value={formData.noOfDays}
            onChange={(e) => {
              const value = e.target.value;
              if (value >= 1 && value <= 7) handleInputChange("noOfDays", value);
            }}
          />
        </div>

        {/* Budget */}
        <div>
          <h2 className="text-lg font-medium text-[#005b96]">Select Your Budget</h2>
          <div className="grid grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 border rounded-lg cursor-pointer bg-white hover:shadow-lg transition duration-300 ${
                  formData.budget === item.title && "shadow-lg border-[#0288d1]"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg text-[#003c66]">{item.title}</h2>
                <h2 className="text-lg text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* Travelers */}
        <div>
          <h2 className="text-lg font-medium text-[#005b96]">Who are you traveling with?</h2>
          <div className="grid grid-cols-3 gap-5">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`p-4 border rounded-lg cursor-pointer bg-white hover:shadow-lg transition duration-300 ${
                  formData.traveler === item.people && "shadow-lg border-[#0288d1]"
                }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg text-[#003c66]">{item.title}</h2>
                <h2 className="text-lg text-gray-600">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
        <h6 className="font text-lg text-[#003c66]">Please Sign-in first before generate trip </h6>
        {/* Generate Button */}
        <Button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="bg-[#0288d1] hover:bg-[#0277bd] text-white mt-10 rounded-lg shadow-lg transform transition duration-300"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
  

      {/* Right Panel */}
      <div className="lg:w-1/3 bg-white p-5 rounded-lg shadow-lg h-[180px] sticky top-10">
  <h3 className="font-bold text-lg text-[#003c66]">Your Trip Summary</h3>
  
  <ul className="mt-5 text-[#005b96]">
    <li>📍 Destination: {formData.location?.label || "Not selected"}</li>
    <li>🕒 Duration: {formData.noOfDays || "Not specified"} days</li>
    <li>💰 Budget: {formData.budget || "Not selected"}</li>
    <li>👥 Travelers: {formData.traveler || "Not specified"}</li>
    
  </ul>
</div>
    </div>
  );
}
