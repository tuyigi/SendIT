const express=require('express')
const router=express.Router()
let {allparcels,parcelbyid,cancelparcel,createparcel}=require('../controllers/parcels')

/* All parcel */
router.get('/', allparcels);

/*Fetch a specific parcel delivery order*/
router.get('/:id', parcelbyid);

/*Cancel the specific parcel delivery order*/

router.put('/:parcelid/cancel', cancelparcel);

/*Create a parcel delivery order*/

router.post('/',createparcel);

module.exports=router
