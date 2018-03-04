const Router = require('express').Router
const Sequelize = require('sequelize')
const Events = require('./model')
const router = new Router()

router.get('/events', (req, res) => {
   let currentDate = new Date
   const Op = Sequelize.Op;

   //! Filter on assignment restrictions: Output attributes and startdate limitation (future events only)
   const events = Events
   .findAll({
     attributes: ['title','startdate', 'enddate'],
      where: {
        startdate: {
          [Op.gte]: currentDate
        }}
    })
   .then(events => {
       res.json(events)
   })
   .catch(err => {
     console.log(err)
     res.status(500)
     res.json({message: "There was a server error"})
   })
})

// No filters required by assignment
router.get('/events/:id', (req, res) => {
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

router.post('/events', (req, res) => {
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

router.put('/events/:id', (req, res) => {
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

router.delete('/events/:id', (req, res) => {
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

module.exports = router
