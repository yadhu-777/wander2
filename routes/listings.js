let express = require("express");
let router =  express.Router();
let Listing =require("../models/listing.js");
let wrapAsync = require("../utils/asynwrap.js");
let experr = require("../utils/experr.js");
let {listingSchema}  = require("../schema.js");

let validation = (req,res,next)=>{
  let {error} = listingSchema.validate(req.body);
  if(error){
    throw new experr(404,error);
  }else
  next();
};


router.get("/new",(req,res)=>{
  res.render("./listings/new.ejs");
 })


 
 
 router.get("/:id",wrapAsync(async(req,res)=>{
   let {id } = req.params;
   let showdata = await Listing.findById(id);
   res.render("./listings/show.ejs",{showdata});
 
 }));
 
 router.get("./new",wrapAsync((req,res)=>{
   res.send("./listings/new.ejs");
 }))

 router.get("/:id/edit",wrapAsync(async(req,res)=>{
  let {id} = req.params;
  let editdata = await Listing.findById(id);
  res.render("./listings/edit.ejs",{editdata});

 }));

 router.post("/new",validation,wrapAsync(async(req,res)=>{
  let initdata = await new Listing({...req.body.newdata});
  let data =  await  initdata.save();
req.flash("success","cerated successfully");
  res.redirect("/listings");

 }));
 router.delete("/:id",wrapAsync(async(req,res)=>{
  let {id} = req.params;
  req.flash("success","deleted");
  let del = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");

 }));
 
 router.all("*",(req,res,next)=>{
  next(new experr(404,"Page not found"))
 
 });

 router.use((err,req,res,next)=>{
  let {status=401,message="something went wrong"} = err;
  res.status(status).render("./listings/error.ejs",{message});
});

router.all("*",(req,res,next)=>{
  next(new experr(404,"Page not found"))
 
 });



 module.exports = router; 