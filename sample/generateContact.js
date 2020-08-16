import mongoose from 'mongoose';
import contactModel from '../model/contact'

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