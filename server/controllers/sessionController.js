import { PrismaClient } from "@prisma/client";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const login = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await prisma.user.findUnique({ where: {username} })
    if (!user) { return res.status(401).json({message: 'Invalid Credentials: username not found'}) }
    
    const isValidPassword = await bcrypt.compare(password, user.password)
    if(!isValidPassword) {
      return res.status(401).json({message: 'Invalid Credentials: incorrect password '})
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    
    res.json({token})

  } catch (error) {
    return res.status(500).json({message: 'internal server error'})
  }
}

export const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers['authorization']

  if (typeof bearerHeader !== 'undefined') {
    // Split at the space of Authorization: Bearer <access_token>
    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded;
      next()
    } catch (err) {
      return res.status(401).json({message: 'Invalid or expired token'})
    }
  } else {
    res.status(403).json({message: 'forbidden'})
  }
}