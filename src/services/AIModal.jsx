import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  // responseMimeType: "text/plain",
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget, Give me a Hotels options list with HotelName , Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location and hotel list for 3 days with each day plan with best time to visit and in JSON format.",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotelOptions": [\n    {\n      "hotelName": "The Orleans Hotel & Casino",\n      "hotelAddress": "4500 W. Tropicana Ave, Las Vegas, NV 89103",\n      "price": "$60-$100 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/894000/893800/893875/893875_177_c.jpg",\n      "geoCoordinates": "36.0995,-115.1796",\n      "rating": 4.0,\n      "description": "A classic Las Vegas hotel with a casino, multiple dining options, and a pool. Offers affordable rooms and a convenient location."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 S Las Vegas Blvd, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/894000/893900/893930/893930_177_c.jpg",\n      "geoCoordinates": "36.1028,-115.1720",\n      "rating": 3.5,\n      "description": "A budget-friendly hotel known for its circus theme, midway games, and family-friendly atmosphere."\n    },\n    {\n      "hotelName": "The Golden Nugget",\n      "hotelAddress": "129 E Fremont St, Las Vegas, NV 89101",\n      "price": "$70-$120 per night",\n      "hotelImageUrl": "https://images.trvl-media.com/media/hotels/1000000/900000/895000/894400/894450/894450_177_c.jpg",\n      "geoCoordinates": "36.1697,-115.1425",\n      "rating": 4.5,\n      "description": "A historic hotel on Fremont Street with a lively casino, an impressive shark tank, and a variety of dining options."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": 1,\n      "plan": [\n        {\n          "time": "Morning (9:00 AM - 12:00 PM)",\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A pedestrian mall with a canopy of lights, live music, street performers, and casinos.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Fremont-Street-Experience-4.jpg",\n          "geoCoordinates": "36.1693, -115.1422",\n          "ticketPricing": "Free",\n          "rating": 4.5\n        },\n        {\n          "time": "Afternoon (1:00 PM - 4:00 PM)",\n          "placeName": "The Neon Museum",\n          "placeDetails": "A museum showcasing iconic Las Vegas neon signs from the city\'s history.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Neon-Museum-2.jpg",\n          "geoCoordinates": "36.1714, -115.1483",\n          "ticketPricing": "$20-$30",\n          "rating": 4.0\n        },\n        {\n          "time": "Evening (6:00 PM - 9:00 PM)",\n          "placeName": "The Mob Museum",\n          "placeDetails": "A museum dedicated to the history of organized crime in Las Vegas and the United States.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Mob-Museum-3.jpg",\n          "geoCoordinates": "36.1678, -115.1434",\n          "ticketPricing": "$20-$30",\n          "rating": 4.5\n        }\n      ]\n    },\n    {\n      "day": 2,\n      "plan": [\n        {\n          "time": "Morning (10:00 AM - 12:00 PM)",\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "A free attraction showcasing stunning floral displays and botanical art.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Bellagio-Conservatory-Botanical-Garden-1.jpg",\n          "geoCoordinates": "36.1189, -115.1729",\n          "ticketPricing": "Free",\n          "rating": 4.0\n        },\n        {\n          "time": "Afternoon (1:00 PM - 4:00 PM)",\n          "placeName": "The LINQ Promenade",\n          "placeDetails": "An outdoor shopping, dining, and entertainment complex with the High Roller observation wheel.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/The-LINQ-Promenade-1.jpg",\n          "geoCoordinates": "36.1170, -115.1711",\n          "ticketPricing": "Free (entry); $25-$35 (High Roller)",\n          "rating": 4.0\n        },\n        {\n          "time": "Evening (6:00 PM - 9:00 PM)",\n          "placeName": "Caesars Palace Forum Shops",\n          "placeDetails": "A luxurious shopping mall with designer boutiques, restaurants, and art installations.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Caesars-Palace-Forum-Shops-1.jpg",\n          "geoCoordinates": "36.1275, -115.1723",\n          "ticketPricing": "Free",\n          "rating": 4.5\n        }\n      ]\n    },\n    {\n      "day": 3,\n      "plan": [\n        {\n          "time": "Morning (9:00 AM - 11:00 AM)",\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "A scenic canyon with hiking trails, rock formations, and stunning desert views.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Red-Rock-Canyon-National-Conservation-Area-1.jpg",\n          "geoCoordinates": "36.1432, -115.3436",\n          "ticketPricing": "$15 per vehicle",\n          "rating": 4.5\n        },\n        {\n          "time": "Afternoon (1:00 PM - 4:00 PM)",\n          "placeName": "Hoover Dam",\n          "placeDetails": "A historic dam on the Colorado River, a marvel of engineering and a popular tourist destination.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Hoover-Dam-1.jpg",\n          "geoCoordinates": "36.0043, -114.9930",\n          "ticketPricing": "Free (entry); $30 (tour)",\n          "rating": 4.5\n        },\n        {\n          "time": "Evening (6:00 PM - 9:00 PM)",\n          "placeName": "Las Vegas Strip",\n          "placeDetails": "A famous stretch of Las Vegas Boulevard with world-class casinos, hotels, and entertainment.",\n          "placeImageUrl": "https://www.visitlasvegas.com/media/images/Things-to-Do/Attractions/Las-Vegas-Strip-1.jpg",\n          "geoCoordinates": "36.1146, -115.1729",\n          "ticketPricing": "Free",\n          "rating": 5.0\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary is just a suggestion, and you can customize it based on your interests and preferences.\n* The price of hotels can vary depending on the season and availability.\n* Ticket prices are subject to change, so it\'s always best to check the official website for the latest information.\n* Some of the attractions may require reservations, so it\'s recommended to book in advance, especially during peak season.\n* Be aware of the heat in Las Vegas, especially during the summer months. Drink plenty of water and wear sunscreen.\n* Consider using public transportation or ride-sharing services to get around the city, especially if you\'re on a budget.\n* Enjoy your trip to Las Vegas! \n',
        },
      ],
    },
  ],
});

// console.log(result.response.text());
