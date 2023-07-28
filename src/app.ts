import express from 'express';
import {HttpError} from 'http-errors'
import dotenv from 'dotenv'
import {database} from './config'
import config from "./config/dbConfig"
import userRoute from './routes/users.routes'

const { PORT } = config

dotenv.config();

const app = express();

// Route
app.use('/users', userRoute)

app.get('/', (req,res)=>{
    return res.send('Team Plutus')
})

database.sync({}).then(() =>{
    console.log('Database connected')
}).catch((err:HttpError)=>{
  console.log(err)
});

const port = PORT

app.listen (port, () =>{
    console.log(`Running on port ${port}`)
})

export default app;