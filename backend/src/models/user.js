const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String,
        default: null
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
},{timestamps:true});


userSchema.pre("save", async function(){
    if(!this.isModified("password") || !this.password) return;
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }catch(error){
        console.log(error.message);
    }
})
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}
module.exports = mongoose.model("User", userSchema);
