import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'
const corsOptions = {
  origin: ["http://localhost:5173"]
}

const app = express()

app.use(cors(corsOptions))

app.use('/api/users', routes.users)
app.use('/api/posts', routes.posts)
app.use('/api/sessions', routes.sessions)
app.use('/api/comments', routes.comments)



app.listen(3000, () => {
  console.log("App listening on port 3000")
})