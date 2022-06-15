const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
    },
    stock:{
        type: Boolean,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Product', productSchema);



// {
//     "_id": {
//         "$oid": "62a5acca5be1a24b3f7a0cc2"
//     },
//     "name": "Quick Support System",
//     "price": {
//         "$numberInt": "23"
//     },
//     "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit facere harum natus amet soluta fuga consectetur alias veritatis quisquam ab eligendi itaque eos maiores quibusdam.\n\n",
//     "image": "https://mironmahmud.com/greeny/assets/ltr/images/product/13.jpg",
//     "category": "fruites",
//     "stock": false,
//     "createdAt": {
//         "$timestamp": {
//             "t": 0,
//             "i": 0
//         }
//     }
// }
