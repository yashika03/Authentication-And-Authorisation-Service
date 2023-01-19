const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../config/serverConfig');
const bcrypt = require('bcrypt');

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


    async signIn(email, plainPassword)
    {
        try {
            //Step -> 1 : Check if the user exits for entered email and fetch the user
            const user = await this.userRepository.getByEmail(email);
            //Step -> 2 : Check if the entered passwrod is correct or not
            console.log(user.email, user.password);
            const PasswordMatch = await this.checkPassword(plainPassword, user.password);
            if(!PasswordMatch)
            {
                console.log("Passwords do not match");
                throw {error: 'Incorrect Password'};
            }

            const JWTtoken = await this.createToken({email: user.email, id: user.id});
            return JWTtoken;
        } catch (error) {
            console.log("Something went wrong in the Service Layer");
            throw error;
        }
    }
    
    async isAuthenticated(token)
    {
        try {
            const response = await this.verifyToken(token);
            if(!response)
            {
                throw {error: 'Invalid Token'};
            }
            const user =  await this.userRepository.getById(response.id);
            if(!user)
            {
                throw {error: 'No user with the corresponding token exists'};
            }
            return user.id;
        } catch (error) {
            console.log("Something went wrong in the Service Layer");
            throw error;
        }
    }
    async createToken(user)
    {
        try {
            const response = await jwt.sign(user,JWT_KEY,{
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


    async checkPassword(userInputPlainPassword, encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in the password comparison");
            throw error;
        }
    }
}

module.exports=UserService;