const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model("users",userSchema)




// const { MongoClient } = require("mongodb");
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// async function run(name,email,password) {
//     try {
//         await client.connect();
//         console.log("Connected to MongoDB");
//         const db = client.db("mydbfirst");
//         const result = await db.collection("webusers").insertOne({ name: name, email: email,password: password });
//         console.log("Document inserted:", result.insertedId);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         await client.close();
//     }
// }

// module.exports = run;
