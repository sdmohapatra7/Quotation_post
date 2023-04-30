const User = require('../models/users');

//signUp To User
module.exports.signup = async (req,res)=>{
    try {
        //get the user data from req.body
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
        //create User
        const user = await User.create({
            name:name,
            email:email,
            password:password,
        });
        //sand the response
        return res.status(200).json({
            message:'User created Successfully',
            data:{
                name:name,
                email:email,
            }
        })
    } catch (error) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:'err',
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
        //compare both credentials
        if(password != user.password){
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
    } catch (error) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:'err',
        });
    }
}