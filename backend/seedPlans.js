const mongoose = require("mongoose");
const connectDB = require("./src/config/db");
const Plan = require("./src/models/planModel");

const plans = [
    {
        "_id": "693f91fb14532c4971736c51",
        "operator": "JIO",
        "price": 199,
        "category": "POPULAR",
        "validity": "23 Days",
        "data": "1.5 GB/Day",
        "calls": "Unlimited",
        "description": "Popular plan with JioTV access.",
        "createdAt": new Date("2025-12-15T04:43:39.040Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.040Z"),
        "__v": 0
    },
    {
        "_id": "693f91fb14532c4971736c50",
        "operator": "JIO",
        "price": 149,
        "category": "POPULAR",
        "validity": "20 Days",
        "data": "1 GB/Day",
        "calls": "Unlimited",
        "description": "Best seller entry-level daily data plan.",
        "createdAt": new Date("2025-12-15T04:43:39.039Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.039Z"),
        "__v": 0
    },
    {
        "_id": "693f91fb14532c4971736c52",
        "operator": "JIO",
        "price": 299,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Popular monthly plan with high data.",
        "createdAt": new Date("2025-12-15T04:43:39.040Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.040Z"),
        "__v": 0
    },
    {
        "_id": "693f91fb14532c4971736c55",
        "operator": "JIO",
        "price": 999,
        "category": "ANNUAL",
        "validity": "84 Days",
        "data": "3 GB/Day",
        "calls": "Unlimited",
        "description": "Premium long-term plan.",
        "createdAt": new Date("2025-12-15T04:43:39.040Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.040Z"),
        "__v": 0
    },
    {
        "_id": "693f91fb14532c4971736c54",
        "operator": "JIO",
        "price": 666,
        "category": "ANNUAL",
        "validity": "84 Days",
        "data": "1.5 GB/Day",
        "calls": "Unlimited",
        "description": "Long validity value plan.",
        "createdAt": new Date("2025-12-15T04:43:39.040Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.040Z"),
        "__v": 0
    },
    {
        "_id": "693f91fb14532c4971736c53",
        "operator": "JIO",
        "price": 399,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2.5 GB/Day",
        "calls": "Unlimited",
        "description": "High data popular plan.",
        "createdAt": new Date("2025-12-15T04:43:39.040Z"),
        "updatedAt": new Date("2025-12-15T04:43:39.040Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c5c",
        "operator": "AIRTEL",
        "price": 155,
        "category": "POPULAR",
        "validity": "24 Days",
        "data": "1 GB Total",
        "calls": "Unlimited",
        "description": "Entry-level Airtel plan with 300 SMS.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c5d",
        "operator": "AIRTEL",
        "price": 179,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB Total",
        "calls": "Unlimited",
        "description": "Includes Unlimited 5G data benefit.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c5e",
        "operator": "AIRTEL",
        "price": 265,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "1 GB/Day",
        "calls": "Unlimited",
        "description": "Music Lover plan with daily data.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c5f",
        "operator": "AIRTEL",
        "price": 359,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Includes Wynk Music subscription.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c60",
        "operator": "AIRTEL",
        "price": 549,
        "category": "POPULAR",
        "validity": "56 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Includes Disney+ Hotstar and Apollo 24|7.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923114532c4971736c61",
        "operator": "AIRTEL",
        "price": 839,
        "category": "ANNUAL",
        "validity": "84 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Long validity plan with Disney+ Hotstar.",
        "createdAt": new Date("2025-12-15T04:44:33.365Z"),
        "updatedAt": new Date("2025-12-15T04:44:33.365Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c68",
        "operator": "VI",
        "price": 118,
        "category": "POPULAR",
        "validity": "14 Days",
        "data": "1 GB Total",
        "calls": "Unlimited",
        "description": "Short validity plan with 200 SMS.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c69",
        "operator": "VI",
        "price": 179,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB Total",
        "calls": "Unlimited",
        "description": "Basic monthly plan with 300 SMS.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c6a",
        "operator": "VI",
        "price": 269,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "1.5 GB/Day",
        "calls": "Unlimited",
        "description": "Entertainment pack with daily data.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c6b",
        "operator": "VI",
        "price": 359,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Includes Vi Movies & TV and binge benefits.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c6c",
        "operator": "VI",
        "price": 479,
        "category": "POPULAR",
        "validity": "56 Days",
        "data": "1.5 GB/Day",
        "calls": "Unlimited",
        "description": "Includes Weekend Data Rollover feature.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f923d14532c4971736c6d",
        "operator": "VI",
        "price": 719,
        "category": "ANNUAL",
        "validity": "84 Days",
        "data": "1.5 GB/Day",
        "calls": "Unlimited",
        "description": "Long validity Vi plan with daily data.",
        "createdAt": new Date("2025-12-15T04:44:45.531Z"),
        "updatedAt": new Date("2025-12-15T04:44:45.531Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c77",
        "operator": "BSNL",
        "price": 298,
        "category": "POPULAR",
        "validity": "54 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Best value long-duration daily data plan.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c74",
        "operator": "BSNL",
        "price": 99,
        "category": "POPULAR",
        "validity": "18 Days",
        "data": "2 GB Total",
        "calls": "Unlimited",
        "description": "Entry level BSNL plan with 100 SMS.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c78",
        "operator": "BSNL",
        "price": 398,
        "category": "POPULAR",
        "validity": "30 Days",
        "data": "Unlimited",
        "calls": "Unlimited",
        "description": "Unlimited data plan with daily SMS benefits.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c75",
        "operator": "BSNL",
        "price": 147,
        "category": "DATA_ONLY",
        "validity": "30 Days",
        "data": "10 GB Total",
        "calls": "Unlimited",
        "description": "Includes BSNL Tunes and data booster benefits.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c76",
        "operator": "BSNL",
        "price": 187,
        "category": "POPULAR",
        "validity": "28 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Daily data pack with 100 SMS per day.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693f924914532c4971736c79",
        "operator": "BSNL",
        "price": 797,
        "category": "ANNUAL",
        "validity": "160 Days",
        "data": "2 GB/Day",
        "calls": "Unlimited",
        "description": "Long validity BSNL plan with daily data.",
        "createdAt": new Date("2025-12-15T04:44:57.422Z"),
        "updatedAt": new Date("2025-12-15T04:44:57.422Z"),
        "__v": 0
    },
    {
        "_id": "693fdeea7a4bcd4994fd3f65",
        "operator": "Jio",
        "price": 536,
        "validity": "55 days",
        "data": "1.5GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "Test Offer",
        "createdAt": new Date("2025-12-15T10:11:54.643Z"),
        "updatedAt": new Date("2025-12-16T07:22:28.345Z"),
        "__v": 0
    },
    {
        "_id": "693fdefd7a4bcd4994fd3f6c",
        "operator": "Jio",
        "price": 467,
        "validity": "55 days",
        "data": "1.5GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "Test Offer",
        "createdAt": new Date("2025-12-15T10:12:13.870Z"),
        "updatedAt": new Date("2025-12-16T07:22:39.540Z"),
        "__v": 0
    },
    {
        "_id": "693fdf3d7a4bcd4994fd3f72",
        "operator": "Jio",
        "price": 126,
        "validity": "20 days",
        "data": "1.5GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "Test Offer",
        "createdAt": new Date("2025-12-15T10:13:17.048Z"),
        "updatedAt": new Date("2025-12-16T07:22:57.528Z"),
        "__v": 0
    },
    {
        "_id": "693fdf547a4bcd4994fd3f79",
        "operator": "Jio",
        "price": 345,
        "validity": "35 days",
        "data": "1.5GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "Test Offer",
        "createdAt": new Date("2025-12-15T10:13:40.068Z"),
        "updatedAt": new Date("2025-12-16T07:23:11.805Z"),
        "__v": 0
    },
    {
        "_id": "69410832902e2abd22a8ae90",
        "operator": "Jio",
        "price": 999,
        "validity": "28 days",
        "data": "1GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "",
        "createdAt": new Date("2025-12-16T07:20:18.807Z"),
        "updatedAt": new Date("2025-12-16T07:20:18.807Z"),
        "__v": 0
    },
    {
        "_id": "69410899902e2abd22a8ae93",
        "operator": "BSNL",
        "price": 2345,
        "validity": "28 days",
        "data": "1GB/day",
        "benefits": [
            "Calls",
            "SMS"
        ],
        "offers": "spl",
        "createdAt": new Date("2025-12-16T07:22:01.043Z"),
        "updatedAt": new Date("2025-12-16T07:22:01.043Z"),
        "__v": 0
    }
];

const seedPlans = async () => {
    try {
        await connectDB();
        await Plan.deleteMany({}); // Optional: Clear existing data
        await Plan.insertMany(plans);
        console.log("Plans seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Error seeding plans:", error);
        process.exit(1);
    }
};

seedPlans();
