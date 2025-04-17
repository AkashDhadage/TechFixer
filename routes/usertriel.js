const express = require('express')
const router = express.Router();

router.get("/" , (req ,res)=>{
    res.render('home.ejs')
})


// router.get('/',(req,res)=>{
//     res.redirect('/login')
// })




router.get("/home",(req,res)=>{
  // if(req.session.user == undefined){
  //   res.redirect('/login')
  // }
  var obj = {'user':req.session.user}
  res.render('listing/home.ejs',obj)
});


router.get('/contact',(req,res)=>{
  var obj = {'user':req.session.user}
  res.render('listing/contact.ejs',obj)
})

router.get('/blog',(req,res)=>{
  var obj = {'user':req.session.user}
  res.render('listing/blog.ejs',obj)
})
