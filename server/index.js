const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/parcels',require('./routes/routeParcel'))
app.use('/api/v1/users',require('./routes/routeUser'))
let port    =  5000;
app.listen(port, function() {
    console.log("listening on 3000")
})

module.exports=app;