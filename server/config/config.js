// this file will contain environment varabless or the development variables
const config={
    production:{
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default:{
        SECRET: 'LOL123',
        DATABASE: 'mongodb://localhost:27017/booksShelf' //naming our database as book shelf  
    }
}

exports.get = function get(env){
    return config[env] || config.default
}