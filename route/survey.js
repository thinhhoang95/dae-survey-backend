import express from 'express'
import surveyModel from '../model/survey'
const router = express.Router()

router.post('/submit', async (req, res) => {
    // console.log(req.body);
    if (req.body){
        req.body = {'date': new Date(),...req.body}
        var survey = new surveyModel(req.body);
        await survey.save()
        res.status(200).send('OK')
    }
})

module.exports = router