const mongoose = require("mongoose");
const uri = "mongodb+srv://vanshikanema2003:9bPamsUMDMHXahFY@cluster0.hjehuu4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose
    .connect(uri)
    .then(() => console.log("db connected!"))
    .catch((err) => console.log(err.message));