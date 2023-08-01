import express from 'express'
import dotenv from 'dotenv'
import {db} from "./config"
import { HttpError } from 'http-errors'
import config from "./config/dbConfig";
import userRoute from './routes/users.routes'


const { PORT } = config

dotenv.config()

const app = express()
app.use(express.json());

app.use('/user', userRoute)

app.get('/', (req, res) => {
    return res.send('Hello World!')
    }
)

db.sync({}).then(() => {
    console.log('Database is connected');
    }).catch((err:HttpError) => {
    console.log(err);
});


const port = PORT 



app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

export default app
