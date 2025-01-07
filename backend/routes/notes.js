const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ msg: 'All notes' })
})

router.get('/:id', (req, res) => {
    res.json({ msg: `Get ${req.params.id}` })
})

router.post('/', (req, res) => {
    res.json({ msg: 'New note' })
})

router.delete('/:id', (req, res) => {
    res.json({ msg: `Delete ${req.params.id}` })
})

router.patch('/:id', (req, res) => {
    res.json({ msg: `Edit ${req.params.id}` })
})
module.exports = router;