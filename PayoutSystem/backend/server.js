const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/mentors', require('./routes/mentorRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

app.use("/api/messages", messageRoutes);
// app.use('/api/mentors', require('./routes/mentorRoutes'));

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(5000, () => console.log("Server running on port 5000"));
    })
    .catch(err => console.log(err));

