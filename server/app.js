import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'
const corsOptions = {
  origin: ["http://localhost:5173"]
}

const app = express()

app.use(cors(corsOptions))

app.use('/api', routes.api)

app.listen(3000, () => {
  console.log("App listening on port 3000")
})