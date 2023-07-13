const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')
 
// @desc    Show all stories
// @route   Get /library
router.get('/', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({ status: 'normal' })
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('library.hbs', {
            stories
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

router.get('/hsk/:difficulty', ensureAuth, async (req, res) => {
    try {
        const stories = await Story.find({
            difficulty: req.params.difficulty
        })
        .lean()
        
        console.log(stories)

        res.render('library.hbs', {
            stories
        })
    } catch (err) {
        res.render('error/500')
    }
})



module.exports = router