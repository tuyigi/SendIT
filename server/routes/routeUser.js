const express=require('express')
const router=express.Router()
let {alluser,userbyid,userparcel}=require('../controllers/users.js')

/* all user */
router.get('/', alluser);

/* a user by id */
router.get('/:id', userbyid);

/*Fetch all parcel delivery orders by a specific user*/

router.get('/:userid/parcels',userparcel);

module.exports=router