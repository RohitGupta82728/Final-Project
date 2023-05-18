
const user = require('../models/signup');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async (req,res)=>{
    try{
        const {firstName, lastName, email, password, confirmPassword } = req.body;
        if (email && password && confirmPassword && firstName && lastName) {
            if (password === confirmPassword) {
                const newUser = await user.findOne({ email: email });
                if (!newUser) {
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(password, salt);
                    const newUser = new user({
                        email: email,
                        password: hashedPassword,
                        firstName: firstName,
                        lastName: lastName,
                        confirmPassword:hashedPassword
                    });
                    await newUser.save();
                    const saved_user = await user.findOne({ email: email });
                    const accessToken = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                    const refreshToken = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    res.status(200).json({
                        message: "User created successfully proceed to sigin", accessToken: accessToken, refreshToken: refreshToken
                    });
                } else {
                    res.status(400).json({
                        message: "User already exists"
                    });
                }
            } else {
                res.status(400).json({
                    message: "Passwords do not match"
                });
            }
        } else {
            res.status(400).json({
                message: "Please fill all the required fields"
            });
        }
    } catch (err) {
        console.log(err);
    }
    


    // const {firstName,lastName,email,password,confirmPassword} = req.body;
    // try{   
    //      if(!firstName||!lastName||!email||!password){
    //         return res.status(422).json({error:"please fill all details"});
    //      }
    //      const newUser = await user.findOne({email});
    //      if(newUser){
    //        return res.status(422).json({error:"user already exists with the same email"});
    //      }
    //      const hashedPass = await bcrypt.hash(password,12);
    //      const sendData = new user({
    //      firstName,
    //      lastName,
    //      email,
    //      password:hashedPass,
    //      confirmPassword:hashedPass
    //      });
    //      const saveData = await sendData.save();
    //      res.send(saveData);
    //  //     .status(200).json({message:"signup success you can login now"});
    // }catch (error) {
    //      res.status(404).send(error);
    //  }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email && password) {
            const checkUser = await user.findOne({ email: email });
            if (checkUser) {
                const isMatch = await bcrypt.compare(password, checkUser.password);
                if (isMatch) {
                    const accessToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
                    const refreshToken = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
                    res.status(200).json({
                        message: "User logged in successfully", accessToken: accessToken, refreshToken: refreshToken
                    })
                } else {
                    res.status(400).json({
                        message: "Invalid password"
                    })
                }
            } else {
                res.status(400).json({
                    message: "User does not exist"
                })
            }
        } else {
            res.status(400).json({
                message: "Please fill all the required fields"
            })
        }

    } catch (err) {
        console.log(err);
    }
}



const refreshToken = async (req, res) => {
    const refreshToken = req.body.refreshToken
    if (refreshToken) {
        try {
            const { userID } = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY)
            const accessToken = jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' })
            const newRefreshToken = jwt.sign({ userID: userID }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });

            return res.status(400).json({
                message: "User Validated", accessToken: accessToken, newRefreshToken: newRefreshToken
            })
        } catch (error) {
            return res.status(401).json({
                message: "Unauthorized User"
            })
        }
    } else {
        return res.status(401).json({
            message: "Unauthorized User"
        })
    }

}

module.exports={createUser,loginUser};