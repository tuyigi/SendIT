var express = require('express');
var app = express();
const fs = require('fs');
let users = require('./data/users.json');
let parcels = require('./data/parcels.json');
const filename = './data/parcels.json';

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// all pages
app.get('/', function(req, res) {
res.render("index.ejs");
});
app.get('/signup.ejs', function(req, res) {
res.render("signup.ejs");
});
app.get('/addparcel.ejs', function(req, res) {
res.render("addparcel.ejs");
});
app.get('/addparcel.ejs', function(req, res) {
res.render("addparcel.ejs");
});
app.get('/admindashboard.ejs', function(req, res) {
res.render("admindashboard.ejs");
});
app.get('/admindparceldetails.ejs', function(req, res) {
res.render("admindparceldetails.ejs");
});
app.get('/allparcels.ejs', function(req, res) {
res.render("allparcels.ejs");
});

app.get('/dashboard.ejs', function(req, res) {
res.render("dashboard.ejs");
});

app.get('/intransit.ejs',function(req,res){
	res.render('intransit.ejs');
});

app.get('/parceldetails.ejs',function(req,res){
	res.render('parceldetails.ejs');
});

app.get('/profile.ejs',function(req,res){
	res.render('profile.ejs');
});


/* APIs */


/* All parcel */
app.get('/api/v1/parcels/', function (req, res) {
    if (parcels.length === 0) {
       return res.json({ message: 'no parcels available', status: 202 });
    } else {
        return res.json(parcels);
    }
});

/*Fetch a specific parcel delivery order*/
app.get('/api/v1/parcels/:id', function (req, res) {
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
});

/*Cancel the specific parcel delivery order*/

app.put('/api/v1/parcels/:parcelid/cancel',  function (req, res) {
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
});

/*Create a parcel delivery order*/

app.post('/api/v1/parcels/', function (req, res) {

    const data = req.body;
    let parcelid = { parcel_id: 1 };
    if (parcels.length > 0) {
        parcelid = { parcel_id: parcels.length + 1 };
    }

    let new_parcel = { parcelid, data };
    parcels.push(new_parcel);
    fs.writeFileSync(filename, JSON.stringify(parcels), 'utf8', function (err) {
        if (err) {
            console.log(err);
        }
    });

    return res.json({ message: 'Parcel delivery order created' });
});



/* all user */



app.get('/api/v1/users/', function (req, res) {
    if (users.length === 0) {
       return res.json({ message: 'no users available', status: 202 });
    } else {
       return res.json(users);
    }
});

/* a user by id */
app.get('/api/v1/users/:id', function (req, res) {
    const id = req.params.id;
    const user = users.find(function (r) {
        return r.user_id == id;
    });
    if (!user) {
       return res.json({ message: 'User not found', status: 404 });
    } else {
       return res.json(user);
    }
});

/*Fetch all parcel delivery orders by a specific user*/

app.get('/api/v1/users/:userid/parcels',function (req, res) {
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
});






var port    =   process.env.PORT;
app.listen(port, function() {
})

module.exports=app;