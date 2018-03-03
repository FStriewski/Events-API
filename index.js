const express = require('express')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const cors = require('cors')
const Events = require('./events/model')


const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres')

const app = express()
  app.use(cors())
  app.use(bodyParser.json())


// READ

  app.get('/events', (req, res) => {
     const events = Events
     .findAll()
     .then(events => {
       if(events){
         res.json(events)
       } else {
           res.status(404)
           res.json({ message: "Event not found"})
       }
     })
     .catch(err => {
       console.log(err)
       res.status(500)
       res.json({message: "There was a server error"})
     })
})


  app.get('/events/:id', (req, res) => {
    const events = Events
    .findById(req.params.id)
    .then(events => {
      if(events){
        res.json(events)
      } else {
          res.status(404)
          res.json({ message: "Event not found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500)
      res.json({message: "There was a server error"})
    })
  })


// Will require some input validation
  app.post('/events', (req, res) => {
      const events = req.body
      console.log(events)

      Events.create(events).then(entity => {
        res.status(201).send(entity)
      })

    })





app.listen(4001, () => console.log('Express API listening on port 4001'))
