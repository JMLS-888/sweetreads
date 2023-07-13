const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')


// @desc Show single story
// @route get /stories/{{_id}}
router.get('/:id', ensureAuth, async (req, res) =>{
    try {
        let story = await Story.findById(req.params.id)
            .lean()

        if (!story) {
            return res.render('error/404')
        }

        res.render('stories/show.hbs', {
            story
        })
    } catch (err) {
        console.error(err)
        res.render('error/404')
    }
})

// @desc    Update Fave Status of story
// @route   PUT /stories/:id
router.put(':id', ensureAuth, async (req, res) => {
    try {
        let story = await Story.findById(req.params.id).lean()

        if(story.faved == false) {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, { faved: true }, true)
        } else {
            story = await Story.findOneAndUpdate({ _id: req.params.id }, { faved: false }, true)
        }
        
        console.log(story.faved)

        res.redirect('/dashboard')
    } catch (err) {
        res.error('error/500');
    }
})


module.exports = router