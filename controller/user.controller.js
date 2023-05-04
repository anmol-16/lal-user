const { validateUser, validateLogin, validateUpdateData} = require('../utils/validation');
const UserSchema = require('../model/user.model');
const {hashPass} = require('../utils/password');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSignUp = async (req, res) => {

    try {
        const {error, value} = validateUser(req.body);
        console.log(value,"value");
        if(error) {
            return res.status(406).json({
                msg:'Not valid data'
            })
        }
        const {firstName, lastName, userName, email, password} = value;
        const hashedPassword = await hashPass(password);
        const emailExist = await UserSchema.findOne({email:email});
        console.log(emailExist,"email exists");
        console.log("here");
        if(emailExist) {
            return res.json({
                status: false,
                code:"00",
                msg:"Email already exists"
            });
        }
        const newUser = new UserSchema({
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName:userName,
            password:hashedPassword
        });
        const savedUser = await newUser.save();
        console.log("New User registered successfully");
        res.status(201).json({
            data: savedUser
        })
    } catch (error) {
        console.log(error,"Registration could not be moeved forward");
        res.status(403).json({
            status:false,
            msg:"User could not be added"
        })
    }
};

const loginInUser = async (req, res) => {
    try {
        const {error, value} = validateLogin(req.body);
        if(error) {
            return res.status(400).json({
                msg:'Not valid data'
            })
        }
        console.log(value,"value");
        const {userName, password} = req.body;

        const userFound = await UserSchema.findOne({userName});
        if(userFound) {
            const userPassword = userFound.password;
            const uid = userFound['_id'];
            console.log(uid,"userid");
            let token = jwt.sign({payload:uid},process.env.JWT_KEY);
            const isPasswordValid = await bcrypt.compare(password, userPassword);
            if (!isPasswordValid) {
              return res.status(401).json({ error: 'Invalid username or password' });
            }
            res.cookie('login',token,{httpOnly:true});
            res.status(200).json({
                msg: "Login Successfully"
            });
        }
        else{
            res.status(401).json({
                msg:"Invalid username or password"
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            error:error
        })
    }
}

const updateDetails = async (req, res) => {
    try {
        const userUpdateId = req.params.id;
        const {error, value} = validateUpdateData(req.body);
        console.log(value,"value");
        if(error) {
            return res.status(400).json({
                msg:'Not valid data'
            })
        }
        const {firstName, lastName, userName, email, password} = value;
        const hashedPassword = await hashPass(password);
        const updatedUser = await UserSchema.findByIdAndUpdate(userUpdateId,{
            firstName: firstName,
            lastName: lastName,
            email: email,
            userName:userName,
            password:hashedPassword
        });
        res.status(200).json({
            data: updatedUser,
            msg:"User Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        console.log("User can't be updated");
        return res.status(500).json({
            status:false,
            code:"201",
            msg:"User can't be saved"
        })
    }

}

module.exports = {
    userSignUp,
    updateDetails,
    loginInUser
}