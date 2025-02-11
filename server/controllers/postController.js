import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const createPost = async (req, res) => {
  const { title, content } = req.body
  console.log(req.user)

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.userId
      }
    })
    res.status(201).json(newPost)
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'internal server error'})
  }
  
}