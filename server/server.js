const express = require("express");
const app = express();
require("./db/conn")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const port = 8009;
const bodyParser = require('body-parser');
// const router = require("./routes/routes")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/routes"));
app.use(require("./routes/SaleOrder"))
app.use(cors());

app.listen(port, ()=>{
    console.log(`server start at port no :${port}`);
})