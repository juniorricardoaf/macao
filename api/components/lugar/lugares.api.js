'use strict'

const lugarModel = require('./lugares.model');
const usuarioModel = require('./../usuarios/usuarios.model');

module.exports.registrar = function (req, res) {
    let categorias = JSON.parse(req.body.categorias);
    let nuevoLugar = new lugarModel({

        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        direccion: req.body.direccion,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        etiquetas: req.body.etiquetas,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        imagen: req.body.imagen,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        estado: 'Habilitado',
        id_usuario: req.body.id_usuario,
        aprobado: "Falso"
    });

    nuevoLugar.save(function (error, lugar) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el lugar, ocurrio el siguente error ' + error });
        } else {
            res.json({ success: true, msg: 'El lugar se registró con éxito' });
        }

        agregar_categoria(lugar._id, categorias);
    });
};

module.exports.listar_todos = function (req, res) {
    lugarModel.find().sort({ nombre: 'asc' }).then(
        function (lugares) {
            res.send(lugares);
        }
    );
};


module.exports.borrar = function (req, res) {
    lugarModel.findByIdAndDelete(req.body.id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar el lugar' });
            } else {
                res.json({ success: true, msg: 'El lugar se eliminó con éxito' });
            }
        }
    )
};

module.exports.deshabilitar = function (req, res) {
    lugarModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Deshabilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo deshabilitar' });
            } else {
                res.json({ success: true, msg: 'El lugar se deshabilitó con éxito' });
            }
        }
    )
};

module.exports.habilitar = function (req, res) {
    lugarModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Habilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar la editorial' });
            } else {
                res.json({ success: true, msg: 'El lugar se habilitó con éxito' });
            }
        }
    )
};

module.exports.buscar_usuarios = function (req, res) {
    userModel.findOne({ _id: req.body.id }).then(
        function (usuario) {
            if (usuario) {
                if (req.body.home) {
                    eventoModel.find({ lugar: { $in: usuario.lugares_que_sigo } }, (error, eventos) => {
                        console.log('entre', eventos);
                        const response = Object.assign({}, usuario._doc);
                        response.eventos = eventos;
                        res.send(response);
                    })
                } else {
                    res.send(usuario);
                }
            } else {
                res.send('No se encontró el usuario');
            }

        }
    )
};

let agregar_categoria = function (pid, pcategorias) {
    for (let i = 0; i < pcategorias.length; i++) {
        lugarModel.findOneAndUpdate({ _id: pid }, { $push: { 'categorias': { nombre: pcategorias[i] } } }, function (error) {
            if (error) {
                console.log(error);

            } else {

            }
        });
    }

};


module.exports.buscar_lugar = function (req, res) {
    lugarModel.findOne({ _id: req.body.id }).then(
        function (lugar) {
            if (lugar) {
                res.send(lugar);
            } else {
                res.send('No se encontró el lugar');
            }
        }
    )
};


module.exports.seguir = function (req, res) {
    const { idLugar, idUsuario } = req.body;

    usuarioModel.findOne({ _id: idUsuario }, (error, user) => {

        if (error) console.error(error);
        if (user.lugares_que_sigo.includes(idLugar)) {
            res.json(user);
        } else {
            usuarioModel.findByIdAndUpdate(idUsuario, { $push: { lugares_que_sigo: idLugar } }, { new: true }, (error, response) => {
                if (error) console.error(error);
                res.json(response);
            });
        }
    });
};

module.exports.dejarSeguir = function (req, res) {
    const { idLugar, idUsuario } = req.body;

    usuarioModel.findOne({ _id: idUsuario }, (error, user) => {

        if (error) console.error(error);
        if (!user.lugares_que_sigo.includes(idLugar)) {
            res.json(user);
        } else {
            const lugaresQueSigo = user.lugares_que_sigo && user.lugares_que_sigo.filter(l => l != idLugar || l != null) || [];
            usuarioModel.findByIdAndUpdate(idUsuario, { lugares_que_sigo: lugaresQueSigo }, { new: true }, (error, response) => {
                if (error) console.error(error);
                res.json(response);
            });
        }
    });
};
module.exports.aprobar_lugar = function (req, res) {

    if (req.body.aprobado == "Falso") {
        lugarModel.findByIdAndUpdate(req.body.id, {
            $set: {
                aprobado: 'Verdad'
            }
        },
            function (error) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo aprobar el lugar' });
                } else {
                    res.json({ success: true, msg: 'El lugar se aprobó con éxito' });
                }
            }
        )
    } else if (req.body.aprobado == "Verdad") {
        lugarModel.findByIdAndUpdate(req.body.id, {
            $set: {
                aprobado: 'Falso'
            }
        },
            function (error) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo aprobar  el lugar' });
                } else {
                    res.json({ success: true, msg: 'El lugar se aprobó con éxito' });
                }
            }
        )
    } else {
        res.json({ success: false, msg: 'No se pudo aprobar el lugar' });
    }


};
module.exports.calificar = function (req, res) {
    lugarModel.findOne({ _id: req.body.idLugar }).then(
        function (lugar) {
            if (lugar) {
                console.log(lugar);
                console.log("Lugar encontrado");
                agregar_calificacion(req.body.idLugar, req.body.voto, req.body.comentario, req.body.idUsuario);
                res.json({success: true, msg: ' Lugar encontrado, se pudo hacer la petición'});
            } else {
                res.send(false);
                console.log("Lugar no encontrado");
                res.json({success: false, msg: 'No se pudo comentar el lugar'});
            }

        });
};
let agregar_calificacion = function (pid, pvoto, pcomentario, pusuario) {
    lugarModel.findOneAndUpdate({ _id: pid }, {
        $push: {
            'calificaciones': {
                voto: pvoto,
                comentario: pcomentario,
                idUsuarioC: pusuario,
                estado: "Habilitado"
            }
        }
    }, function (error) {
        if (error) {
            console.log(error);

        } else {
            console.log("no hay errores, registro de comentario finalizado");
            

        }
    });
};

