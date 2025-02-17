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

export const getAllPublished = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    res.status(200).json(allPosts)

  } catch (err) {
    req.status(500).json({message: 'internal server error'})
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await prisma.post.findMany({
      where: {
        published: undefined
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    res.status(200).json(allPosts)

  } catch (err) {
    req.status(500).json({message: 'internal server error'})
  }
}

export const updatePublished = async (req, res) => {
  try {

    await prisma.post.update({
      where: {
        id: req.body.id
      },
      data: {
        published: req.body.published
      }
    })

    res.status(200).json({ message: 'Changed published status' })
    
  } catch (error) {
    req.status(500).json({message:'internal server error'})
  }
}