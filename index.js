const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')


const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

const app = express()
  app.use(cors())
  app.use(bodyParser.json())


app.listen(4001, () => console.log('Express API listening on port 4001'))
