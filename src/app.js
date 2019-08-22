import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//import routes
import { userRoutes } from './routes';
import { todoRoutes } from './routes'
import { DB_URL } from './lib/config';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// routes
app.use(userRoutes)
app.use(todoRoutes)

// mongodb server connection
mongoose.connect(DB_URL, { useNewUrlParser: true }, (err) => {
  if (err) console.log('Failed to connect to mongodb server', err);
  else console.log('successfully connected to mongodb server!');
});

//error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(`Something went wrong ! ${err.message}`);
})

// start app on port
app.listen(5000, () =>
  console.log('express app listening on port 5000!'),
);