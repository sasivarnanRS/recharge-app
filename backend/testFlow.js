const axios = require('axios');
const mongoose = require('mongoose');
const User = require('./src/models/userModel');
const Plan = require('./src/models/planModel');
const Recharge = require('./src/models/rechargeModel');

const BASE_URL = 'http://localhost:5000';

async function runTest() {
    console.log("Starting End-to-End Test...");

    // 1. Login as Admin
    console.log("\n1. Testing Admin Login...");
    let adminToken;
    try {
        const res = await axios.post(`${BASE_URL}/users/login`, {
            email: "admin@gmail.com",
            password: "admin123"
        });
        adminToken = res.data.token;
        console.log("✅ Admin Login Success");
    } catch (e) {
        console.error("❌ Admin Login Failed:", e.response ? e.response.data : e.message);
        return;
    }

    // 2. Create Plan (as Admin)
    console.log("\n2. Testing Create Plan...");
    let planId;
    try {
        const newPlan = {
            operator: "Jio",
            price: 555,
            validity: "55 days",
            data: "1.5GB/day",
            benefits: ["Calls", "SMS"], // Array as expected by model
            offers: "Test Offer"
        };
        const res = await axios.post(`${BASE_URL}/plans`, newPlan, {
            headers: { Authorization: `Bearer ${adminToken}` } // If we add middleware later
        });
        planId = res.data._id;
        console.log("✅ Plan Creation Success:", planId);
    } catch (e) {
        console.error("❌ Create Plan Failed:", e.response ? e.response.data : e.message);
        return;
    }

    // 3. Register User
    console.log("\n3. Testing User Registration...");
    let userToken;
    let userId;
    const testEmail = `testuser_${Date.now()}@demo.com`;
    try {
        const res = await axios.post(`${BASE_URL}/users/register`, {
            email: testEmail,
            password: "Password123",
            name: "Test User Flow",
            phone: Math.floor(Math.random() * 10000000000).toString()
        });
        userToken = res.data.token;
        userId = res.data.user._id;
        console.log("✅ User Registration Success:", testEmail);
    } catch (e) {
        console.error("❌ Registration Failed:", e.response ? e.response.data : e.message);
        return;
    }

    // 4. Recharge (User buys Plan)
    console.log("\n4. Testing Recharge...");
    try {
        const rechargeData = {
            userId: userId,
            phone: "9999999999",
            operator: "Jio",
            planAmount: 555,
            status: "SUCCESS"
            // planId is optional in our model but usually good to have
        };
        const res = await axios.post(`${BASE_URL}/recharges`, rechargeData);
        console.log("✅ Recharge Success:", res.data._id);
    } catch (e) {
        console.error("❌ Recharge Failed:", e.response ? e.response.data : e.message);
        // Don't return, check DB anyway
    }

    // 5. Verify in DB direct
    console.log("\n5. Verifying Data in MongoDB...");
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/myproductsDB");

        const plan = await Plan.findById(planId);
        console.log(`- Plan in DB: ${plan ? 'FOUND ✅' : 'MISSING ❌'}`);

        const user = await User.findById(userId);
        console.log(`- User in DB: ${user ? 'FOUND ✅' : 'MISSING ❌'}`);

        const recharge = await Recharge.findOne({ userId: userId });
        console.log(`- Recharge in DB: ${recharge ? 'FOUND ✅' : 'MISSING ❌'}`);

        mongoose.disconnect();
    } catch (e) {
        console.error("❌ DB Verification Failed:", e);
    }
}

runTest();
