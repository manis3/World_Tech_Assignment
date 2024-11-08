import express from 'express'
import cors from 'cors';
import router from './routes/index'
import { PORT } from '../secrets'
import { errorMiddleware } from './middleware/error'

const app = express()

//accept json data on request
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// user routes
app.use('/', router)

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
