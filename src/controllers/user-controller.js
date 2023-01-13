const UserService = require('../services/user-service');
const userService = new UserService();

const create = async(req,res) => 
{
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(200).json({
            data: response,
            success: true,
            message: 'Successfully created the new user',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            err: error,
            message: 'Something went wrong',
            success: false
        })
    }
}
module.exports={
    create
}