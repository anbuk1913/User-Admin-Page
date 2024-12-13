const express = require("express")
const app = express()
const env = require("dotenv");
const session = require("express-session");
const setUser = require('./model/userModel');
const userRouter = require("./routes/userRoutes")
const adminRouter = require("./routes/adminRoutes")
const methodOverride = require('method-override');

env.config();

require("./config/config")
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
    
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
});

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
  }));

  
// Use method-override with query parameter
app.use(methodOverride('_method'));

app.use(userRouter)
app.use(adminRouter)

app.listen(3000,()=>{
    console.log("Server Created")
})
