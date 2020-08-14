import express from 'express'
import dotenv from "dotenv";
import router from './router/router'
import cors from 'cors'
import connectionDB from './database/dbConect'

dotenv.config();

connectionDB(process.env.URL_DB)

const app = express();

app.use(cors())

app.use('/', express.json(), router)

app.listen(process.env.PORT, () => {
  console.log("server running");
})