const mongoose = require("mongoose");
const adminusers = new mongoose.Schema({
                            email: {type:String},
                            password: {type:String}
                                    });

module.exports = mongoose.model("adminuser",adminusers);