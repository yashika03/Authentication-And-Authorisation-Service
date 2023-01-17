const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');

class UserService{
    constructor()
    {
        this.userRepository = new UserRepository();
    }
    async create(data)
    {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the Service Layer");
            throw error;
        }
    }
    
    async createToken(user)
    {
        try {
            const response = await jwt.sign(sign,JWT_KEY,{
                expiresIn: '1h'
            });
            return response;
        } catch (error) {
            console.log("Something went wrong in creating the token");
            throw error;
        }
    }

    async verifyToken(token)
    {
        try {
            const response = jwt.verify(token,JWT_KEY);
            return response;
        } catch (error) {
            console.log("Something went wrong in validating the token",error);
            throw error;
        }
    }
}

module.exports=UserService;