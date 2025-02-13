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

    const token = jwt.sign({ userId: user.id,username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' })
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 3600000,
    })
    res.json({
      message: 'Login succesful',
      user: { id: user.id, username: user.username, role: user.role}
    })

  } catch (error) {
    return res.status(500).json({message: 'internal server error'})
  }
}

export const verifyToken = async (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(403).json({message: 'Forbidden: no token provided'})
  }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded;
      next()
    } catch (err) {
      return res.status(401).json({message: 'Invalid or expired token'})
    }
}

export const logout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  })

  return res.status(200).json({message: 'logged out succesfully'})
}