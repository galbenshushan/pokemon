const PORT = process.env.PORT || 8040;
require('dotenv/config')
require('./config/connection')
const express = require("express");
const expressMiddlewares = require('./middleware/uses')
const app = express();

expressMiddlewares(app)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));