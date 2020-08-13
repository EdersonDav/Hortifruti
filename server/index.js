import express from 'express'
import dotenv from "dotenv";
import mongoose from 'mongoose'
import router from './router/router'
import cors from 'cors'

dotenv.config();

mongoose.connect(process.env.URL_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error) => {
    if (error) console.log(error);
    else
      console.log("DB connected");
  }
)
const app = express();

app.use(cors())

app.use('/', express.json(), router)

app.listen(process.env.PORT, () => {
  console.log("server running");
})