let mongoose = require("mongoose");
let express = require("express");
let app = express();
let path = require("path");
let ejsMate = require("ejs-mate");
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
let Listing =require("./models/listing.js");
let listings = require("./routes/listings.js");
app.set("view Engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
var methodOverride = require('method-override');
app.use(methodOverride("_method"));
let session = require("express-session");
let flash = require("connect-flash");

main()
.then(()=>{
    console.log("connected DB");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wander4');
}

app.listen(3000,(req,res)=>{
    console.log("server started");
});
let sessionoptions = {
  secret:"secreststr",
  resave:false,
  saveUninitialized:true,
  
  cookie:{
    expires:Date.now() + 4 *24*60*60*1000,
    maxAge:Date.now() + 4 *24*60*60*1000,
    httpOnly:true,

  }
}
app.use(session(sessionoptions));
app.use(flash());
app.use((req,res,next)=>{
  res.locals.scs = req.flash("success");

  next();

})


app.use("/listings",listings);

