import express from 'express'
const router = express.Router()

import contactModel from '../model/contact'

router.post('/sample', async (req, res) => {
    let newContact = new contactModel({
        'name': 'Hoàng Đình Thịnh',
        'email': 'hoangdinhthinh@hcmut.edu.vn',
        'role': 'Cựu sinh viên',
        'workplace': 'Đại học Bách Khoa Tp. Hồ Chí Minh',
        'address': '268 Lý Thường Kiệt, P. 14, Q. 10, Tp. Hồ Chí Minh',
        'position': 'Giảng viên',
        'referid': 'hcmut'
    })
    
    newContact.save()
    res.status(200).send('OK')
})

router.get('/:id', async (req, res) => {
    // console.log('Obtaining refer for ' + req.params.id)
    let contact = await contactModel.findOne({'referid': req.params.id})
    // console.log(contact)
    if (contact) 
        res.json(contact)
    else
        res.status(501).send('Referral ID not found')
})

module.exports = router