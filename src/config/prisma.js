const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const connectDB = async () => {
    try {
        await prisma.$connect()
        console.log('Connected to the MongoDB database')
    } catch (error) {
        console.error('Error connecting to the database:', error)
    }
}

module.exports = { prisma, connectDB }
