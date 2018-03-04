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

  app.post('/events', (req, res) => {
      const events = req.body

      Events.create(events)
      .then(entity => {
        res.status(201).send(entity)
      })
      .catch(err => {
        res.status(500)
        res.json({message: "There was an error. Date(s) failed validation."})
      })
  })

// Will require some update validation
    app.put('/events/:id', (req, res) => {
      const eventsId = Number(req.params.id)
      const updates = req.body

      // find event
      Events.findById(req.params.id)
        .then(entity => {
          if(entity){
            return entity.update(updates)
          } else {
            res.status(404)
            res.json({ message: "Event not found, can't update event"})
          }
        })
        .then(final => {
          // return update
          res.status(200)
          res.send(final)
        })
        .catch(error => {
          res.status(500)
          res.json({
            message: "There was an error. Date(s) failed validation - no update."
          })
        })
    })

    app.delete('/events/:id', (req, res) => {
      const eventId = Number(req.params.id)
      Events.findById(req.params.id)
      .then(entity => {
          return entity.destroy()
          res.json({ message: "Event not found, can't delete event"})
      })
      .then(_ => {
        res.status(200)
        res.send({
          message: 'The event has been removed'
        })
      })
      .catch(error => {
        res.status(500).send({
          message: `There was a server error`,
          error
        })
      })
  })



app.listen(4001, () => console.log('Express API listening on port 4001'))
