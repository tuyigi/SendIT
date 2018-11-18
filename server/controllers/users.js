let users=require('../data/users.json');
let parcels = require('../data/parcels.json');
const alluser=function(req,res){
 if (users.length === 0) {
       return res.json({ message: 'no users available', status: 202 });
    } else {
       return res.json(users);
    }
};


const userbyid=function(req,res){
     const id = req.params.id;
     const user = users.find(function (r) {
        return r.user_id == id;
      });
     if (!user) {
       return res.json({ message: 'User not found', status: 404 });
     } else {
       return res.json(user);
     }

 };


const userparcel=function(req,res){
	const id = req.params.userid;
    if (parcels.length === 0) {
        return res.json({ message: 'no parcels available', status: 202 });
    } else {
        const userparcels = parcels.filter(function (u) {
            return u.user_id == id;
        });
        if (!userparcels) {
           return res.json({ message: 'no parcel for this user', status: 404 });
        } else {
           return res.json(userparcels);
        }
    }
}

module.exports={alluser,userbyid,userparcel}