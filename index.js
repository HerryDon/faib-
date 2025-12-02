require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // more setting of different IP's is found in cores express
const errorMiddleware = require("./middleware/errorMiddleware");

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors()); //For allowing different IPs
app.use(express.json());

app.listen(PORT, (req, res) => {
      console.log(`Server running on port ${PORT}`);
});

//conecting to database
// mongoose
//   .connect(MONGO_URL, { useNewUrlparser: true, useUnifiedTopology: true })
//   .then(() => console.log("db conected successfully"))
//   .catch((error) => console.log(error));

mongoose
      .connect(MONGO_URL,)
      .then(() => {
            console.log("db connected successfully");
           // console.log("Current database:", mongoose.connection.db.databaseName); to check the data base name you are using
      })
      .catch((err) => console.error("Connection error:", err));

//main route
app.get("/", (req, res) => {
      res.send("API is runnuing");
});

//routes
const userRoute = require("./routes/userRoute");

//api routes
app.use("/api/v1/user", userRoute);

//middleware
app.use(errorMiddleware); // In this case it must be placed under the routes api's


