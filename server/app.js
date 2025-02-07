import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import routes from './routes'
import { PrismaClient } from '@prisma/client'
const prisma = PrismaClient()
const corsOptions = {
  origin: ["http://localhost:5173"]
}

const app = express()

app.use(cors(corsOptions))

app.use('/api/users', routes.users)
app.use('/api/posts', routes.posts)
app.use('/api/sessions', routes.sessions)
app.use('/api/comments', routes.comments)

async function gracefulShutdown() {
  try {
    console.log("Closing Prisma connection...");
    await prisma.$disconnect(); // Disconnect from Prisma
    console.log("Prisma connection closed.");
  } catch (e) {
    console.error('Error during shutdown: ', e)
  }
}

process.on("SIGINT", async () => {
  console.log("Shutting down gracefully...");
  await gracefulShutdown();
  console.log("Application shutdown complete")
  process.exit(0)
});


app.listen(3000, () => {
  console.log("App listening on port 3000")
})