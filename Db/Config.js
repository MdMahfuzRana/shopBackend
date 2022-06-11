const mongoose = require('mongoose'); // mongoose for mongodb

const dbconfig = () => {
    const connection_url = 'mongodb+srv://mdMahfuz:Hip100@cluster0.1gib9is.mongodb.net/shop?retryWrites=true&w=majority';
    mongoose
    .connect(connection_url, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
            // useCreateIndex: true,
        })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))
}

module.exports = {dbconfig};