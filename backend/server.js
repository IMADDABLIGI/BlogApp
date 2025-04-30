require('dotenv').config()

const express = require('express')
const cors = require('cors')  
const app = express()
const port = process.env.PORT || 4000
const mongoose = require('mongoose')
const mongoURI = process.env.ATLAS_URI 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }) 
   


const db = mongoose.connection
db.once('open', () => {

    console.log('Connected to MongoDB')
    }
)
db.on('error', (err) => {
    console.error('MongoDB connection error:', err)
    }
)





app.use(cors())  
app.use(express.json())  

app.get("/", (req, res) => {
  res.send('Server is running!')
})


app.get("/api", (req, res) => {
  res.status(200).json({"users":["user1", "user2", "user3"]})
})


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
  console.log(`Try accessing: http://localhost:${port}/api`)
})

// process.on('unhandledRejection', (err) => {
//   console.log('Unhandled Rejection:', err)
// })