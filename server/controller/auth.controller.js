const { ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/auth.model')
const { registerValidation, loginValidation } = require('./validation')

const login = async (req, res) => {
    console.log(req.body);
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(JSON.stringify({ type: 'error', inner: error.details[0].message }))

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send(JSON.stringify({ type: 'error', inner: "Email or password is wrong!" }))

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send(JSON.stringify({ type: 'error', inner: "Email or password is wrong!" }))

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(JSON.stringify({
        type: 'success', inner: token, user_details: {
            _id:user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        }
    }))
    console.log(user);
    if (user.role === 1) console.log("hello admin");
}


const register = async (req, res) => {
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    if (req.body.password !== req.body.verifyPassword) return res.status(400).send('Passwords must equal!')

    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send('Email already exists')


    const salt = await bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(req.body.password, salt)

    const __id = new ObjectId().toHexString()
    const user = new User({
        _id: __id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hashPassword,
        verifyPassword: hashPassword,
        country: req.body.country,
        role: req.body.role
    })
    try {
        const savedUser = await user.save()
        console.log(savedUser);
        res.json(savedUser)
    } catch (err) {
        res.status(400).json({ message: err })
    }
}



module.exports = {
    login,
    register,
}