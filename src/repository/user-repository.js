const { StatusCodes } = require('http-status-codes');
const {User, Role} = require('../models/index');
const ClientError = require('../utils/client-error');
const ValidationError = require('../utils/validation-error');

class UserRepository{
    async create(data)
    {
        try {
            const user= await User.create(data);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError')
            {
                throw new ValidationError(error);
            }
            console.log("Something went wrong in the Repository Layer");
            throw error;
        }
    }


    async destroy(userId)
    {
        try {
            await User.destroy({
                where: {
                    id:userId
                }
            });
            return true;
        } catch (error) {
            console.log("Something went wrong in the Repository Layer");
            throw error;
        }
    }

    async getById(userId)
    {
        try {
            const user = await User.findByPk(userId,{
                attributes: ['email', 'id']
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in the Repository Layer");
            throw error;
        }
    }


    async getByEmail(userEmail)
    {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail
                }
            });
            if(!user)
            {
                throw new ClientError(
                    'AttributeNotFound',
                    'Invalid Email sent in the request',
                    'Please enter the correct email as the corresponding email is not present in the records',
                    StatusCodes.NOT_FOUND
                );
            }
            console.log(user);
            return user;
        } catch (error) {
            if(error.name == 'SequelizeValidationError')
            {
                let validationError = new ValidationError(error);
                console.log(validationError);
            }
            console.log("Something went wrong in the Repository Layer");
            throw error;
        }
    }

    async isAdmin(userId)
    {
        try {
            const user  = await User.findByPk(userId);
            const adminRole = await Role.findOne({
                where: {
                    name: 'ADMIN'
                }
            });
            return user.hasRole(adminRole);
        } catch (error) {
            console.log("Something went wrong in the Repository Layer");
            throw error;
        }
    }
}

module.exports=UserRepository