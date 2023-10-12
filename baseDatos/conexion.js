const mongoose = require('mongoose');
//asincrona por si acaso la conexion tarda un poco
const conexion = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mi_blog')
        console.log("esta conectado correctado correctamenete mi_blog")
    } catch (error) {
        console.log("error", error)
        throw new Error("Nos e ha podido conectara a la base de datos")
    }
}

module.exports = {
    conexion
}

