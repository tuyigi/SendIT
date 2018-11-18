let parcels=require('../data/parcels.json');
let fs = require('fs');
let filename='../data/parcels.json';
let {newId}=require('../helpers/newId')
const allparcels=function(req,res){
	if (parcels.length === 0) {
       return res.json({ message: 'no parcels available', status: 202 });
    } else {
        return res.json(parcels);
    }
};


const parcelbyid=function(req,res){
	const p_id = req.params.id;
    if (parcels.length === 0) {
        return res.json({ message: 'no parcels available', status: 202 });
    } else {
        const specificparcel = parcels.find(function (sp) {
            return sp.parcel_id == p_id;
        });
        if (!specificparcel) {
            return res.json({ message: 'Parcel not found', status: 404 });
        } else {
           return  res.json(specificparcel);
        }
    }
};


const cancelparcel=function(req,res){
	const id = req.params.parcelid;
    if (parcels.length === 0) {
        res.json({ message: 'no parcels available', status: 202 });
    } else {

        parcels = parcels.filter(function (p) {
            return p.parcel_id != id;
        });
        fs.writeFileSync(filename, JSON.stringify(parcels), 'utf8', function (err) {
            if (err) {
                return res.json({ message: err });
            }
        });

        return res.json({ message: 'parcels delivery odrerd canceled', status: 202 });
    }
};

const createparcel=function(req,res){
	const data = req.body;
    let parcelid = { parcel_id: newId(parcels) };
    let new_parcel = { parcelid, data };
    parcels.push(new_parcel);
    fs.writeFileSync(filename, JSON.stringify(parcels), 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });

    return res.json({ message: 'Parcel delivery order created' });
};


module.exports={allparcels,parcelbyid,cancelparcel,createparcel};