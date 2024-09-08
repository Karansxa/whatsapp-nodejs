const express = require("express")

const dashboard = async (req, res, next) => {
    try{
        const user = req.user
        if(!user){
            const error = new Error("User not found")
            error.status = 404
            throw error
        }
        return res.status(200).json({
            message: "Welcome to dashboard",
            email: user.email
        })
    }catch(error){
        next(error)
    }
}

module.exports = {
    dashboard
}