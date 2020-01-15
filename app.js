const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
dotenv.config()


// //db connection
mongoose.connect(process.env.MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true,})
.then(() => console.log('DB Connected!'))

//If there is an error loading the database, display error
mongoose.connection.on('error', err => {
  console.log(`connection error ${err.message}`);
});

//Loading Routes
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')

//Middleware doing something inbetween
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
//Rendering Root Page using middleware
app.use("/", postRoutes);
app.use("/", authRoutes);

//Listening to Port 8080
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});