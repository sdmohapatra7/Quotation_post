const User = require('../models/users');
const bcrypt = require('bcrypt');
const salt = 10;
//signUp To User
module.exports.signup = async (req,res)=>{
    try {
        //get the user data from req.body by destructure method
        const { name,email,password,confirmPassword } = req.body;
        console.log(req.body);
        //check password and cofirmpassword same or not
        if(password != confirmPassword){
            return res.status(400).json({
                message:'password Does not Match',
                data:{},
            });
        }
        //check if user exit or not by given email
        existUser = await User.findOne({email:email});
        //if user found it return user details or return null
        if(existUser){
            return res.status(400).json({
                message:'User already Exist This Email',
                data:{},
            });
        }
        // using bcrypt
        const hashPassword = bcrypt.hashSync(password, salt);
        //create User
        const user = await User.create({
            name:name,
            email:email,
            password:hashPassword,
        });
        //sand the response
        return res.status(200).json({
            message:'User created Successfully',
            data:{
                name:name,
                email:email,
            }
        })
    } catch (err) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:err,
        });
    }
}

//sign In To User
module.exports.signin = async (req,res)=>{
    try {
        // get the user data from req.body
        const { email,password } = req.body;
        //fetch the emial from user data
        const user = await User.findOne({email:email});
        //check user exit or not
        if(!user){
            return res.status(404).json({
                message:'Please Signup first',
                data:{},
            });
        }
        //using bcrypt
        const isPassword = bcrypt.compareSync(password, user.password);
        //compare both credentials
        if(!isPassword){
            return res.status(400).json({
                message:'Invalaid Attemts || password Does not match',
                data:{},
            });
        }
        //send the successful responce
        return res.status(200).json({
            message:'login Successfully',
            data: user,
        })
    } catch (err) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:err,
        });
    }
}