const {Schema, model} = require('mongoose')



const ArticuloSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imagen: {
        type: String,
        default: "default.png"
    }
})

//hay que debolver el modelo, usamos el metodo model y le enviamos el nombre del modelo
//"Articulo"
//y le decimos qeueSchema va a usar ese modelo


module.exports = model("Articulo", ArticuloSchema, "articulos")
//si le pongo Articulo al modelo, quiere decir que la coleccion se va a llamar articulos automarticamente lo pasa a minuscula y le pone la s (Previaamente cree esa coleccion en MongoDb Compass) Aunque simepre es mejor ponersela