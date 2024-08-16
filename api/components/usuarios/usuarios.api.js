'use strict';
const userModel = require('./usuarios.model');
const nodemailer = require('nodemailer');
const eventoModel = require('./../eventos/eventos.model');
const bitacoraApi = require('../bitacora/bitacora.api');
const moment = require('moment');


module.exports.registrar = function (req, res) {

    let nuevoUsuario = new userModel({
        tipoUsuario: req.body.tipoUsuario,
        nombreUsuario: req.body.nombreUsuario,
        identificacion: req.body.identificacion,
        nombreCompleto: req.body.nombreCompleto,
        empresa: req.body.empresa,
        correo_1: req.body.correo_1,
        correo_2: req.body.correo_2,
        fechaNacimiento: req.body.fechaNacimiento,
        edad: req.body.edad,
        sexo: req.body.sexo,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        contrasenna: req.body.contrasenna,
        imagen: req.body.imagen,
        idJuridica: req.body.idJuridica,
        estado: "Habilitado",
        expulsado: "Falso",
        primerInicio: req.body.primerInicio,
    });

    nuevoUsuario.save(function (error) {
        if (error) {
            res.json({
                success: false,
                msg: 'El usuario no puede ser registrado, ocurrió el siguiente error : ' + error
            })
        } else {
            let correo = req.body.correo_1;
            let nombre = req.body.nombreCompleto;
            let macao = "Macao";
            let contrasenna = req.body.contrasenna;
            let nombreUsuario = req.body.nombreUsuario;

            let transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 4000,
                secure: false,
                auth: {
                    user: 'aplicacionmacao@gmail.com',
                    pass: 'Sibo12345'
                    //user : 'xeeker123@gmail.com',
                    //pass : 'joselin15'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
            let mailOptions = {
                from: macao,
                to: correo,
                subject: 'Bienvenido a Macao',
                html: `<html>

                <head>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
                </head>
                <body style="font-family: 'Montserrat', sans-serif; background-image: url('https://res.cloudinary.com/sibo/image/upload/v1543175426/lugar_3.jpg'); 
                background-size: cover; ">
                    <main style="background:  rgba(0, 0, 0, 0.8); width:100%; height: 100%;">
                        <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                            <tr>
                                <td>
                                    <div style="color: #fff; margin: 4% 10% 2%; font-family: sans-serif; text-shadow: 2px 2px 4px #000000">
                                        <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                                            <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/sibo/image/upload/hxelktkqc8ixecibk6kc">
                                        </div>
                                        <h2 style="color: #fff; margin: 0 0 7px; font-size: 34px; margin: 0 auto; text-align: center; padding-bottom: 40px">¡Bienvenido a Macao!</h2>
                                        <p style="margin: 2px; font-size: 22px; padding-left: 20px; color: #fff;">
                                            Estimado usuario ${nombre}, te has registrado satisfactoriamente en Macao. </p>
                                        <ul style="font-size: 18px; color: #fff; margin: 10px 0; padding-left: 50px;">
                                            <li style="padding: 10px;">Su nombre de usuario es: ${nombreUsuario}</li>
                                            <li style="padding: 10px;">Su contraseña temporal es: ${contrasenna}</li>
                                        </ul>
                                        <div style="width: 100%; text-align: center; padding-top: 20px;">
                                            <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #dd5e06"
                                                href="http://localhost:3000/public/inicio_sesion.html">Ir a Macao</a>
                                        </div>
                                        <p style="color: #fff; font-size: 14px; text-align: center; margin: 30px 0 0; padding-bottom: 30px;">¡Disfrutá de la
                                            aplicación!</p>
                                        </div>
                                </td>
                            </tr>
                        </table>
                    </main>
                </body>
                
                </html>`
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            let fecha = new Date();
            let fechas = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
            let hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
            bitacoraApi.registrar_bitacora(fechas, hora, 'Administrador', 'Usuario agregado');
            res.json({
                success: true,
                msg: 'El usuario fue registrado con éxito'
            }

            );
        }
    });
}
module.exports.listar_todos = function (req, res) {
    userModel.find().then(
        function (usuarios) {
            res.send(usuarios);
        }
    )
};
module.exports.ingresar = function (req, res) {
    userModel.findOne({ nombreUsuario: req.body.nombreUsuario }).then(
        function (usuario) {
            if (usuario) {
                console.log(usuario);
                if (usuario.contrasenna == req.body.contrasenna) {
                    console.log("contraseña correcta");
                    if (usuario.estado == "Habilitado" && usuario.expulsado == "Falso") {
                        console.log("Usuario aceptado, estado: " + usuario.estado + " y expulsado: " + usuario.expulsado);
                        res.json(
                            {
                                success: true,
                                tipoUsuario: usuario.tipoUsuario,
                                nombreUsuario: usuario.nombreUsuario,
                                _id: usuario._id,
                                estado: usuario.estado,
                                expulsado: usuario.expulsado,
                                primerInicio: usuario.primerInicio
                            }
                        );
                    } else {
                        console.log("Usuario no aceptado, ---estado: " + usuario.estado + "---expulsado: " + usuario.expulsado);
                        res.json(
                            {
                                success: false,
                                estado: usuario.estado,
                                expulsado: usuario.expulsado
                            }
                        );
                    }

                } else {
                    console.log("contraseña incorrecta");
                    res.send(false);
                }

            } else {
                res.send(false);
            }

        });
}
module.exports.olvidar = function (req, res) {

    userModel.findOne({ nombreUsuario: req.body.nombreUsuario }).then(
        function (usuario) {
            if (usuario) {
                console.log(usuario);
                if (usuario.correo_1 == req.body.correo_1) {
                    console.log("correo correcto");
                    res.json(
                        {
                            success: true,
                            nombreUsuario: usuario.nombreUsuario,
                            correo_1: usuario.correo_1,
                            _id: usuario._id,
                            primerInicio: usuario.primerInicio
                        }

                    );
                    let correo = usuario.correo_1;
                    let macao = "Macao";
                    let contrasenna = req.body.contrasenna;
                    let nombreUsuario = usuario.nombreUsuario;

                    let transporter = nodemailer.createTransport({
                        service: 'gmail',
                        port: 4000,
                        secure: false,
                        auth: {
                            user: 'aplicacionmacao@gmail.com',
                            pass: 'Sibo12345'
                        },
                        tls: {
                            rejectUnauthorized: false
                        }
                    });
                    let mailOptions = {
                        from: macao,
                        to: correo,
                        subject: 'Recuperar Contraseña',
                        html: `
                        <html>
                        <head>
                            <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
                        </head>
                        <body style="font-family: 'Montserrat', sans-serif; background-image: url('https://res.cloudinary.com/sibo/image/upload/v1543175426/lugar_3.jpg'); 
                        background-size: cover; ">
                            <main style="background:  rgba(0, 0, 0, 0.7); width:1000px; height: 1000px;">
                                <table style="max-width: 600px; padding: 10px; margin:0 auto; border-collapse: collapse;">
                                    <tr>
                                        <td>
                                            <div style="color: #fff; margin: 4% 10% 2%; font-family: sans-serif; text-shadow: 2px 2px 4px #000000">
                                                <div style="width: 100%;margin:20px 0; display: inline-block;text-align: center">
                                                    <img style="padding: 0; width: 150px; margin: 5px" src="https://res.cloudinary.com/sibo/image/upload/hxelktkqc8ixecibk6kc">
                                                </div>
                                                <h2 style="color: #fff; margin: 0 0 7px; font-size: 34px; margin: 0 auto; text-align: center; padding-bottom: 40px">Recuperación de contraseña</h2>
                                                <p style="margin: 2px; font-size: 22px; padding-left: 20px; color: #fff;">
                                                    Se ha modificado su contraseña, por favor ingrese a la aplicación y modifiquela. </p>
                                                <ul style="font-size: 18px; color: #ffffff; margin: 10px 0; padding-left: 50px;">
                                                    <li style="padding: 10px;">Su nombre de usuario es: ${nombreUsuario}</li>
                                                    <li style="padding: 10px;">Su nueva contraseña temporal es: ${contrasenna}</li>
                                                </ul>
                                                <div style="width: 100%; text-align: center; padding-top: 20px;">
                                                    <a style="text-decoration: none; border-radius: 5px; padding: 11px 23px; color: white; background-color: #dd5e06"
                                                        href="http://localhost:3000/public/inicio_sesion.html">Ir a Macao</a>
                                                </div>
                                                <p style="color: #fff; font-size: 14px; text-align: center; margin: 30px 0 0; padding-bottom: 30px;">¡Disfrutá de la
                                                    aplicación!</p>
                                                </div>
                                        </td>
                                    </tr>
                                </table>
                            </main>
                        </body>
                        </html>`
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    let fecha = new Date();
                    let fechas = fecha.getDate() + '/' + fecha.getMonth() + '/' + fecha.getFullYear();
                    let hora = fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
                    bitacoraApi.registrar_bitacora(fechas, hora, 'Usuario', 'Contraseña modificada');
                    res.json({
                        success: true,
                        msg: 'El usuario fue registrado con éxito'
                    }

                    );

                } else {
                    console.log("correo incorrecto");
                    res.send(false);
                }

            } else {
                res.send(false);
            }

        });
}
module.exports.buscar_usuarios = function (req, res) {
    userModel.findOne({ _id: req.body.id }).then(
        function (usuario) {
            if (usuario) {
                if (req.body.home) {
                    eventoModel.find({ lugar: { $in: usuario.lugares_que_sigo } }, (error, eventos) => {
                        const response = Object.assign({}, usuario._doc);
                        response.eventos = eventos;
                        eventoModel.find(
                            { _id: { $in: usuario.eventosReservados }, fecha: { $gte: moment().format('YYYY-MM-DD') } })
                            .sort({ fecha: 1, hora_Inicio: 1, minutos_Inicio: 1 })
                            .limit(3)
                            .exec(
                                (error, eventosReservados) => {
                                    response.reservados = eventosReservados;
                                    res.send(response);
                                });
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
module.exports.modificar_perfil = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, { $set: req.body },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo actualizar el perfil' });
            } else {
                res.json({ success: true, msg: 'El perfil se actualizó con éxito' });
            }
        }
    )
};
module.exports.modificar_contrasena = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, { $set: req.body },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo actualizar el perfil' });
            } else {
                res.json({ success: true, msg: 'El perfil se actualizó con éxito' });
            }
        }
    )
};

module.exports.deshabilitar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Deshabilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo deshabilitar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se deshabilitó con éxito' });
            }
        }
    )
};
module.exports.habilitar_usuario = function (req, res) {
    userModel.findByIdAndUpdate(req.body.id, {
        $set: {
            estado: 'Habilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar el usuario' });
            } else {
                res.json({ success: true, msg: 'El usuario se habilitó con éxito' });
            }
        }
    )
};
module.exports.expulsar_usuario = function (req, res) {

    if (req.body.expulsado == "Falso") {
        userModel.findByIdAndUpdate(req.body.id, {
            $set: {
                expulsado: 'Verdad'
            }
        },
            function (error) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo expulsar el usuario' });
                } else {
                    res.json({ success: true, msg: 'El usuario se expulsó con éxito' });
                }
            }
        )
    } else if (req.body.expulsado == "Verdad") {
        userModel.findByIdAndUpdate(req.body.id, {
            $set: {
                expulsado: 'Falso'
            }
        },
            function (error) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo expulsar el usuario' });
                } else {
                    res.json({ success: true, msg: 'El usuario se deshabilitó con éxito' });
                }
            }
        )
    } else {
        res.json({ success: false, msg: 'No se pudo expulsar el usuario, ocurrió un problema al leer del body el' });
    }


};
module.exports.borrar = function (req, res) {
    userModel.findByIdAndDelete(req.body.id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar el usuario' });
            } else {
                res.json({ success: true, msg: 'el usuario se eliminó con éxito' });
            }
        }
    )
};