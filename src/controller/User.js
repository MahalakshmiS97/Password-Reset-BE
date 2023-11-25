import userModel from '../models/User.js'
import Auth from '../common/auth.js'

const create = async(req,res) =>{
    try {
        let user = await userModel.findOne({email:req.body.email}) 
        if(!user){
            req.body.password= await Auth.hashPassword(req.body.password)
            await userModel.create(req.body)
            res.status(202).send({
                message:"user created successfully"
            })
        }
        else{
            res.status(400).send({
                message:`user with ${req.body.email} already exists`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}

const login = async(req,res)=>{
    try {
        let user = await userModel.findOne({email:req.body.email}) 
        if(user){
            let hashCompare = await Auth.hashCompare(req.body.password,user.password)
            if(hashCompare){
                res.status(200).send({
                    message:"Login Successfully"
                })
            }
            else{
                res.status(400).send({
                    message:"Entered password is wrong"
                })
            }
        }
        else{
            res.status(400).send({
                message:`Account with ${req.body.email} does not exist`
            })
        }
    } catch (error) {
        res.status(500).send({
            message:"Internal Server Error",
            error:error.message
        })
    }
}
export default {
    create,
    login
}