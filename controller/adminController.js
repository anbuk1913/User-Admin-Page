const bcrypt = require('bcrypt')
const usercollection = require("../model/userModel")

const adminGet = async (req,res)=>{
    if(req.session.adminVer){
        res.redirect("/adminhome")
    } else {
        const adminError = req.session.adminError
        res.render("admin/adminLog",{adminError})
    }
}

const adminVer = async (req,res)=>{
    if(req.body.email==process.env.EMAIL && req.body.password == process.env.PASSWORD){
        req.session.adminVer=true
        res.redirect("/adminhome")
    } else {
        req.session.adminError = "Invalid Email or Password"
        res.redirect("/admin")
    }
} 

const adminHome = async (req,res)=>{
    if(req.session.adminVer){
        const userData = await usercollection.find({})
        res.render("admin/adminDash",{userData})
    } else {
        res.redirect("/admin")
    }
}

const adminEdit = async(req,res)=>{
    if(!req.session.adminVer) return res.redirect("/admin")
    const id = req.params.id
    const db = await usercollection.findById({_id: id})
    res.render("admin/edit",{users:db})
}

const adminUpdate = async(req,res)=>{
    if(!req.session.adminVer) return res.redirect("/admin")
    const {username, phone, id} = req.body
    const ans = await usercollection.updateOne({_id:id},{$set:{name:username,phone:phone}})
    return res.redirect("/admin")
}

const adminEditGet = async(req,res)=>{
    if(!req.session.adminVer) return res.redirect("/admin")
    return res.render("admin/edit")
}

const adminLogout = async(req,res)=>{
    req.session.adminVer = false
    res.redirect("/admin")
}

async function encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const addUser = async (req, res) => {
    try {
        const hashpassWord = await encryptPassword(req.body.password)
        const newUser = new usercollection({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashpassWord
        });
        const checkAdduser = await usercollection.findOne({ email: req.body.email  });
        if (checkAdduser) {
            return res.status(208).send({ emailExists: true })
        } else {
            req.session.userAdd = true
            newUser.save();
            return res.status(200).send({ success: true })
        }
    } catch (error) {
        console.log(error);
    }
};

const adminDelete = async (req, res) => {
    const id = req.query.userId
    const data = await usercollection.findByIdAndDelete({_id:id})
    if(!data){
       return res.json({success:false})
    }
    res.json({success: true})
}

module.exports = {adminGet,adminVer,adminHome,adminEdit,adminEditGet,adminUpdate,adminLogout,addUser,adminDelete}
