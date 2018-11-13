const express = require('express')
const fs = require('fs')
const router = express.Router()
let parcels = require('../data/parcels.json')
const filename = './data/parcels.json'


/* All user */
router.get('/', async (req, res) => {
if (parcels.length === 0) {
            res.json({message: 'no parcels available',status: 202})
        }
        else{
          res.json(parcels)  
        }
})

/*Fetch a specific parcel delivery order*/
router.get('/:id',async(req,res)=>{
	const p_id=req.params.id
	if (parcels.length === 0) {
            res.json({message: 'no parcels available',status: 202})
        }
        else{
        	const specificparcel=parcels.find(sp=>sp.parcel_id==p_id)
        	if (!specificparcel) {
        	res.json({message: 'Parcel not found',status: 404})
        }else{
        res.json(specificparcel)
         }
        }
})



/*Cancel the specific parcel delivery order*/


router.put('/:parcelid/cancel', async (req, res) => {
	const id=req.params.parcelid;
if (parcels.length === 0) {
            res.json({message: 'no parcels available',status: 202})
        }
        else{

     parcels = parcels.filter(p => p.parcel_id != id)
       fs.writeFileSync(filename, JSON.stringify(parcels), 'utf8', (err) => {
        if (err) {
            res.json({message: err})
        }
    })


res.json({message: 'parcels delivery odrerd canceled',status: 202})

        }
})



/*Create a parcel delivery order*/

router.post('/',  async (req, res) => {

	const data=req.body
	let parcelid={parcel_id:1};
if (parcels.length > 0) {
        parcelid={parcel_id:parcels.length+1}
    } 

let new_parcel={...parcelid,...data }
parcels.push(new_parcel)
    fs.writeFileSync(filename, JSON.stringify(parcels), 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })

res.json({message: 'Parcel delivery order created'})

    })

module.exports = router