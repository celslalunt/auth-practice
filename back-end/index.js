const express = require("express")
const PORT = 2000
const app = express()
const db = require("./models")
const cors = require("cors");

app.use(express.json())
app.use(cors());

const {authRouters, eventRouters} = require ("./routers")

app.use("/auth", authRouters);
app.use("/event", eventRouters);

app.listen(PORT, () => {
    // db.sequelize.sync({ alter: true })
    console.log(`server running at port : ${PORT}`);
})