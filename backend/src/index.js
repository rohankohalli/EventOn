import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import venueRoutes from './routes/venueRoutes.js'
import sequelize from './config/db.js'
import './models/Associations.js'
import { eventStatuses } from './utils/eventStatus.js'
import eventRoutes from './routes/eventRoutes.js'
import reservationRoutes from './routes/reservationRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import userRoutes from './routes/userRoutes.js'
import homeRoutes from './routes/homeRoutes.js'

const port = process.env.PORT || 8000

const app = express()

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

setInterval(eventStatuses, 30 * 60 * 1000)
app.get('/', (req, res) => { res.send("Server Working") })

app.use('/api/auth', authRoutes)
app.use('/api/venues', venueRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/reservation', reservationRoutes)
app.use('/api/users', userRoutes)
app.use('/api', homeRoutes)

app.use(errorHandler)
try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    console.log(`Connected to the database ${process.env.DB_NAME}`)
    app.listen(port, () => { console.log(`Server Running on port ${port}`) })
} catch (error) {
    console.error('Database connection or server start failed:', error)
}
