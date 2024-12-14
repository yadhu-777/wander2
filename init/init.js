let mongoose = require("mongoose");
let idata = require("./data.js");
let Listings =require("../models/listing.js");



main()
.then(()=>{
    console.log("connected DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander4');
}


let initData = async()=>{
    await Listings.deleteMany({});
    await Listings.insertMany(idata.data);
    console.log(idata.data);
}
initData();