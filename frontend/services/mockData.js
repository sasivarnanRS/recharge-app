export const MOCK_PLANS = [
  // Jio Plans
  {
    _id: "plan_jio_001",
    operator: "Jio",
    price: 149,
    validity: "20 days",
    data: "1GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
  },
  {
    _id: "plan_jio_002",
    operator: "Jio",
    price: 199,
    validity: "23 days",
    data: "1.5GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "JioTV"],
    offers: "Best Seller"
  },
  {
    _id: "plan_jio_003",
    operator: "Jio",
    price: 299,
    validity: "28 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "Disney+ Hotstar"],
    offers: "Trending"
  },
  {
    _id: "plan_jio_004",
    operator: "Jio",
    price: 399,
    validity: "28 days",
    data: "2.5GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "Netflix", "Prime Video"],
    offers: "Premium"
  },
  {
    _id: "plan_jio_005",
    operator: "Jio",
    price: 666,
    validity: "84 days",
    data: "1.5GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
  },
  {
    _id: "plan_jio_006",
    operator: "Jio",
    price: 999,
    validity: "84 days",
    data: "3GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "All OTT Apps"],
    offers: "Ultimate"
  },

  // Airtel Plans
  {
    _id: "plan_airtel_101",
    operator: "Airtel",
    price: 155,
    validity: "24 days",
    data: "1GB Total",
    benefits: ["Unlimited Calls", "300 SMS"],
  },
  {
    _id: "plan_airtel_102",
    operator: "Airtel",
    price: 179,
    validity: "28 days",
    data: "2GB Total",
    benefits: ["Unlimited Calls", "300 SMS"],
  },
  {
    _id: "plan_airtel_103",
    operator: "Airtel",
    price: 265,
    validity: "28 days",
    data: "1GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
    offers: "Unlimited 5G Data"
  },
  {
    _id: "plan_airtel_104",
    operator: "Airtel",
    price: 359,
    validity: "28 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "Wynk Music"],
    offers: "Music Lover"
  },
  {
    _id: "plan_airtel_105",
    operator: "Airtel",
    price: 549,
    validity: "56 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "Disney+ Hotstar"],
  },
  {
    _id: "plan_airtel_106",
    operator: "Airtel",
    price: 839,
    validity: "84 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "Disney+ Hotstar"],
    offers: "Free Apollo 24|7"
  },

  // Vi Plans
  {
    _id: "plan_vi_201",
    operator: "Vi",
    price: 118,
    validity: "14 days",
    data: "1GB Total",
    benefits: ["Unlimited Calls", "200 SMS"],
  },
  {
    _id: "plan_vi_202",
    operator: "Vi",
    price: 179,
    validity: "28 days",
    data: "2GB Total",
    benefits: ["Unlimited Calls", "300 SMS"],
  },
  {
    _id: "plan_vi_203",
    operator: "Vi",
    price: 269,
    validity: "28 days",
    data: "1.5GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
  },
  {
    _id: "plan_vi_204",
    operator: "Vi",
    price: 359,
    validity: "28 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day", "Vi Movies & TV"],
    offers: "Entertainment"
  },
  {
    _id: "plan_vi_205",
    operator: "Vi",
    price: 479,
    validity: "56 days",
    data: "1.5GB/day",
    benefits: ["Unlimited Calls", "Weekend Data Rollover"],
    offers: "Binge All Night"
  },
  {
    _id: "plan_vi_206",
    operator: "Vi",
    price: 719,
    validity: "84 days",
    data: "1.5GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
  },

  // BSNL Plans
  {
    _id: "plan_bsnl_301",
    operator: "BSNL",
    price: 99,
    validity: "18 days",
    data: "2GB Total",
    benefits: ["Unlimited Calls", "100 SMS"],
  },
  {
    _id: "plan_bsnl_302",
    operator: "BSNL",
    price: 147,
    validity: "30 days",
    data: "10GB Total",
    benefits: ["Unlimited Calls", "BSNL Tunes"],
  },
  {
    _id: "plan_bsnl_303",
    operator: "BSNL",
    price: 187,
    validity: "28 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
    offers: "Data Booster"
  },
  {
    _id: "plan_bsnl_304",
    operator: "BSNL",
    price: 298,
    validity: "54 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
  },
  {
    _id: "plan_bsnl_305",
    operator: "BSNL",
    price: 398,
    validity: "30 days",
    data: "Unlimited",
    benefits: ["Unlimited Calls", "100 SMS/day"],
    offers: "Best Value"
  },
  {
    _id: "plan_bsnl_306",
    operator: "BSNL",
    price: 797,
    validity: "160 days",
    data: "2GB/day",
    benefits: ["Unlimited Calls", "100 SMS/day"],
    offers: "Long Validity"
  }
];

export const MOCK_HISTORY = [
  {
    _id: "rec_1",
    userId: "user_1",
    date: new Date().toISOString(),
    status: "success",
    operator: "Jio",
    amount: 299,
    phone: "9876543210",
    planId: "plan_jio_003"
  },
  {
    _id: "rec_2",
    userId: "user_1",
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: "success",
    operator: "Airtel",
    amount: 359,
    phone: "9123456789",
    planId: "plan_airtel_104"
  },
  {
    _id: "rec_3",
    userId: "user_1",
    date: new Date(Date.now() - 86400000 * 15).toISOString(),
    status: "success",
    operator: "Vi",
    amount: 269,
    phone: "9456123789",
    planId: "plan_vi_203"
  },
  {
    _id: "rec_4",
    userId: "user_1",
    date: new Date(Date.now() - 86400000 * 30).toISOString(),
    status: "success",
    operator: "BSNL",
    amount: 187,
    phone: "9789456123",
    planId: "plan_bsnl_303"
  },
  {
    _id: "rec_5",
    userId: "user_1",
    date: new Date(Date.now() - 86400000 * 45).toISOString(),
    status: "failed",
    operator: "Jio",
    amount: 399,
    phone: "9876543210",
    planId: "plan_jio_004"
  }
];