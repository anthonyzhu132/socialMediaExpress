const express = require('express');
const app = express();
const port = 8080;
const morgan = require('morgan');

//Loading Routes
const postRoutes = require('./routes/post')

//Middleware doing something inbetween
app.use(morgan('dev'));

//Rendering Root Page using middleware
app.use("/", postRoutes);

//Listening to Port 8080
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});