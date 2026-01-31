const axios = require('axios');

const testPlans = async () => {
    try {
        console.log("Testing Plan API...");
        const operators = ['Jio', 'jio', 'Airtel', 'airtel', 'Vi', 'vi'];

        for (const op of operators) {
            try {
                const res = await axios.get(`http://localhost:5000/plans/${op}`);
                console.log(`[SUCCESS] fetched plans for '${op}'. Count: ${res.data.length}`);
            } catch (err) {
                console.log(`[ERROR] fetching plans for '${op}': ${err.message}`);
                // console.log(err);
            }
        }
    } catch (e) {
        console.error("Global error:", e.message);
    }
};

testPlans();
