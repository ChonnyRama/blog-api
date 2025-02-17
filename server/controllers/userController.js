import { PrismaClient } from "@prisma/client"
import { body, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

const validateUser = [
  body("username").trim()
    .isAlphanumeric().withMessage('Must be alphanumeric')
    .isLength({ min: 1, max: 14 }).withMessage('Has to be between 1-14 characters')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          username: value
        }
      })
      if (user) {
        throw new Error('Username is already in use')
      }
      return true
  }).withMessage('Username is already in use'),
  body('email')
    .isEmail().withMessage('Not a valid email')
    .custom(async (value) => {
      const user = await prisma.user.findUnique({
        where: {
          email: value
        }
      })
      if (user) {
        throw new Error('Email is already in use')
      }
      return true
  }).withMessage('Email is already in use'),
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 chars long'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error()
    }
    return true
  })
    .withMessage('Passwords do not match')
];

export const test = async (req, res) => {
  return res.send('Get HTTP method on user resource')
}

export const createUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
      //send errors.array to react to render
    }
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      
      const role = req.body.role || 'REGULAR'
      await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          role
        }
      })
      return res.status(201).json({message: 'user created succesfully'})

    } catch (err) {
      console.error('Error creating user ', err)
      return res.status(500).json({error: 'internal server error'})
    }
  }
]