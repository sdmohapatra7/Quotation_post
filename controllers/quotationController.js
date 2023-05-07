const Quotation = require('../models/quotation');
const User = require('../models/users');

module.exports.createQuot = async (req,res)=>{
    try {
        const {content , userId } = req.body;
        const quotation = await Quotation.create({
            content : content,
            userId : userId
        });
        if(!quotation){
            return res.status(400).json({
                message:'Oops Something Went Wrong While Creating Quotation',
                data:{},
            });
        }
        const user = await User.findById(userId);
        console.log('user',user);
        user.quotation.push(quotation._id);
        return res.status(200).json({
            message:'Quotation Create Successfully',
            data: {quotation},
        });
    } catch (err) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:err,
        });
    }
}

module.exports.deleteQuot = async (req,res)=>{
    try {
        const {userId}=req.params;
        const deleteQuotation = await Quotation.findByIdAndDelete(userId);
        if(!deleteQuotation){
            return res.status(400).json({
                message:'Oops Something Went Wrong Quotation Not Found !!',
                data:{},
            });
        }
        return res.status(200).json({
            message:'Quotation Deleted',
            data:{deleteQuotation},
        });
    } catch (err) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:err,
        });
    }
}

module.exports.updateQuot = async (req,res)=>{
    try {
        const {userId}=req.params;
        const {content} = req.body;
        const updateQuotation = await Quotation.findByIdAndUpdate(userId ,{
            content:content,
        },{new:true});
        if(!updateQuotation){
            return res.status(400).json({
                message:'Oops Something Went Wrong While Updating',
                data:{},
            });
        }
        return res.status(201).json({
            message:'Content Updated',
            data:{updateQuotation},
        });
    } catch (err) {
        return res.status(500).json({
            message:'Oops Something Went Wrong',
            data:err,
        });
    }
}