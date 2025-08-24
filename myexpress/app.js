const express = require("express");
const dotenv = require("dotenv");
const contactRoutes = require('./routes/contact.routes');
const connectDB = require('./config/db');

dotenv.config();

connectDB();
const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => res.send("Contact API Running"));
app.use("/api/contacts", contactRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
