// src/routes/payment.js
const express = require("express");
const axios = require("axios");
const catchAsync = require("../util/catchAsync"); // بدون destructuring

const router = express.Router();

router.post(
  "/request",
  catchAsync(async (req, res) => {
    
    const { amount } = req.body;
    const response = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/request.json",
      {
        merchant_id: "b818a6f8-5efa-4ae3-b4ba-18ec3f9d14ff",
        amount: +amount,
        description: "گرفتن نوبت",
        callback_url: "http://localhost:3001/Payment?payment=success",
      }
    );

    if (response.data.data.code === 100) 
     {
      const paymentURL = response.data.data.authority
        ? `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`
        : "";
        
      res.status(201).json({
        authority: response.data.data.authority,
        amount,
        paymentURL,
      });
    } else {
      throw new Error(`Error in payment request: ${response.data.Status}`);
    }
  })
);

router.post(
  "/verify",
  catchAsync(async (req, res) => {
    const { amount, authority } = req.body;
    const response = await axios.post(
      "https://api.zarinpal.com/pg/v4/payment/verify.json",
      {
        merchant_id: "b818a6f8-5efa-4ae3-b4ba-18ec3f9d14ff",
        amount: +amount,
        authority,
      }
    );

    if (response.data.data.code === 100) 
    {
      res.status(201).json({ status: "s" });
    } else {
      throw new Error(`Error in payment verification: ${response.data}`);
    }
  })
);

module.exports = router;