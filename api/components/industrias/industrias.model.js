'use strict';
let mongoose = require('mongoose');

let industriaSchema = new mongoose.Schema({
    industria : {type : String, required : false, unique: false},
    estado : {type : String, required : true}
}); 

module.exports = mongoose.model('Industria', industriaSchema);



