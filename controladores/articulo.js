const validator = require('validator')
const Articulo = require("../modelos/Articulo")


const crear = (req, res) => {
    //Recoger los parametros a gurdar
    let parametros = req.body
    //validar los datos con validator q noe ste vacio y la longitud
    //estos metodos son propensos a errores  mejor es usar un try y catch
    try{
        //Si estan llenos da false si no da true
        let validar_titulo = validator.isEmpty(parametros.titulo)
        let validar_contenido = validator.isEmpty(parametros.contenido)

        if(validar_titulo || validar_contenido){
            throw new Error("No se ha validado la informacion !!!")
        }
    }catch(error){
        return res.status(400).json({
            status: "error",
            message: "Datos incompletos"
        })
    }

    //crear el objeto segun el modelo articulo a guaradar
  const articulo = new Articulo(parametros)

  articulo.save()
  .then((result) => {
    if (result) {
      return res.status(200).json({
        status: "success",
        articulo: result,
        message: "Articulo guardado con éxito"
      });
    } else {
      return res.status(400).json({
        status: "Error",
        message: "No se pudo guardar el artículo"
      });
    }
  })
  .catch((error) => {
    return res.status(400).json({
      status: "Error",
      message: "Error al guardar el artículo: " + error.message
    });
  });
}

const listar = async (req, res) => {
  const {cantidad} = req.params
  //del mas nuevgo al mas viejo (todos los registros)
  let articulos = await Articulo.find({}).limit(cantidad).sort({fecha: -1})
  //articulos.limit(3)

  if(!articulos)
   return res.status(404).json({
    status: "error",
    message: "No se encontraron articulos"
  })

  return res.status(200).json({
    status: "success",
    articulos: articulos
  })
}

const uno = async (req, res)=> {
  //recoger un id por la url
  const {id} = req.params
  Articulo.findById(id).exec()
  .then((data)=>{
    if(data){
      return res.status(200).json({
        status: "success",
        articulo: data
      })
    }else{
      return res.status(400).json({
        status: "not found",
        message: "Articulo no encontrado"
      })
    }
  }).catch((error)=>{
    return res.status(400).json({
      status: "Error",
      message: "No se ha encontrado el articulo " + error.message
    });
  })
}


const eliminar = async (req, res) => {
  
 const {id} = req.params
 try {
  const articuloremovido = await Articulo.deleteOne({_id: id}).exec()
  if(articuloremovido.deletedCount > 0){
    return res.status(200).json({
        status: "success",
        message: "Se ha eliminado el articulo correctamente"
    })
  }else{
    return res.status(404).json({
      status: "not found",
      message: "No se ha encontradio el articulo"
    })
  }
 } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "No se ha podido eliminar el articulo"
    })
 }
}

const actualizar = async (req, res) => {
  const {id} = req.params
  const body = req.body
  
  try {
    const articuloEditado = await Articulo.findOneAndUpdate({_id: id}, body, {new: true})
    if(articuloEditado){
        return res.status(200).json({
          status: "Success",
          message: "Se ha actualizado el articulo"
        })
    }else{
      return res.status(404).json({
        status: "Not found",
        message: "No se encontro el articulo"
      })
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: "No se puede actualizar el articulo" + error.message
    })
  }
}


module.exports = {
    crear,
    listar,
    uno,
    eliminar,
    actualizar
}