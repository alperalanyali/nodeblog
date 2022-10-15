const mongoose = require('mongoose')

const Schema = mongoose.Schema

const blogScheme = new Schema({
    title:{
        type:String,
        require:true
    },
    short:{
        type:String,
        required:true
    },
    long:{
        type:String,
        required:true
    }

},{timestamps:true})

const Blog = mongoose.model('Blog',blogScheme)
module.exports = Blog