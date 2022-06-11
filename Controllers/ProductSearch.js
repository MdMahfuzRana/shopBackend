const Products = require('../Models/Products');

const search = async (item) => {
    try {
        if(!item) return;
        const product = await Products.find({name: {$regex: item, $options: 'i'}})
        if(!product) return;
        return product;
    } catch (error) {
     return console.log('found error',error);
    }
}

module.exports = { search };