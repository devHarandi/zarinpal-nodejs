// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors"); // اضافه کردن پکیج cors
const paymentRouter = require("./routes/payment");

const app = express();

// تنظیمات CORS
app.use(
  cors({
    origin: "*", // اجازه به اپلیکیشن React روی پورت 3001
    methods: ["GET", "POST"], // متدهای مجاز
    allowedHeaders: ["Content-Type"], // هدرهای مجاز
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/payment", paymentRouter);

// مدیریت خطاها
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});