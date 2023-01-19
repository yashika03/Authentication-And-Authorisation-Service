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
        });
    }
}


const signIn = async(req,res) => {
    try {
        console.log(req.body);
        const response = await userService.signIn(req.body.email,req.body.password);
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
        });
    }
} 

const isAuthenticated = async(req,res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            data: response,
            success: true,
            message: 'User is authenticated and token is valid',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data:{},
            err: error,
            message: 'Something went wrong',
            success: false
        });
    }
}
module.exports={
    create,
    signIn,
    isAuthenticated
}