const mongoose=require('mongoose');
const productSchema=mongoose.Schema(
    {
       fname:{
            type:String
       },
       lname:{
            type:String
       },
       bid:{
            type:Number
       }
    },
    {
        timestamps:true
    }
);

const Product=mongoose.model('Product',productSchema);

module.exports=Product;
 