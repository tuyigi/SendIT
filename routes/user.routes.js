const express = require('express')
const router = express.Router()
let users = require('../data/users.json')
let parcels = require('../data/parcels.json')

/* all user */
router.get('/', async (req, res) => {
if (users.length === 0) {
            res.json({message: 'no users available',status: 202})
        }
        else{
          res.json(users)  
        }
})

/* a user by id */
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const user = users.find(r => r.user_id == id)
        if (!user) {
        	res.json({message: 'User not found',status: 404})
        }else{
res.json(user)
        }
        
})



/*Fetch all parcel delivery orders by a specific user*/

router.get('/:userid/parcels', async (req, res) => {
	const id=req.params.userid;
if (parcels.length === 0) {
            res.json({message: 'no parcels available',status: 202})
        }
        else{
    const userparcels = parcels.filter(u => u.user_id == id)
        if (!userparcels) {
        	res.json({message: 'no parcel for this user',status: 404})
        }else{
res.json(userparcels)
        }
        
        }
})

module.exports = router