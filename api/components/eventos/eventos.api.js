'use strict';
const eventoModel = require('./eventos.model');
const usuarioModel =require('./../usuarios/usuarios.model');
const nodemailer = require('nodemailer');

module.exports. registrar = function(req, res) {

    let patrocinadores =  JSON.parse(req.body.patrocinadores);
    let  categorias=  JSON.parse(req.body.categorias);

    let nuevoEvento = new eventoModel({

        nombre: req.body.nombre,
        fecha: req.body.fecha,
        hora_Inicio: req.body.hora_Inicio,
        minutos_Inicio: req.body.minutos_Inicio,
        hora_Fin: req.body.hora_Fin,
        minutos_Fin: req.body.minutos_Fin,
        cant_Espacios: req.body.cant_Espacios,
        descripcion: req.body.descripcion,
        moneda: req.body.moneda,
        precio: req.body.precio,
        ubicacion: req.body.ubicacion,
        etiqueta: req.body.etiqueta,
        imagen : req.body.imagen,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
        estado : 'Habilitado',
        id_Usuario: req.body.id_Usuario,
        lugar: req.body.lugar
    });

    nuevoEvento.save(function(error, evento) {
        if (error) {
            res.json({
                success: false,
                msj: 'El evento no pudo ser registrado' + error
            });
        } else {
            res.json({
                success: true,
                msj: 'El evento ha sido registrado de forma exitosa'
            });
            agregar_patrocinador(evento._id, patrocinadores);
            agregar_categoria(evento._id,categorias);
        }
    });
};

module.exports.listar_todos = function(req, res){
    eventoModel.find().sort({nombre : 'asc'}).then(
        function(eventos){
            res.send(eventos);
        }
    );
};

module.exports.obtener_evento = function(req , res){
    const id = req.params.id;
    eventoModel.findOne({_id:id}).then(
        function(eventos){

            
            res.send(eventos);
        }
    );
};

module.exports.buscar_evento = function(req, res){
  eventoModel.findOne({_id : req.body.id}).then(
    function(evento){
      if(evento){
        res.send(evento);
      }else{
        res.send('No se encontró el evento');
      }
    }
  )
};

module.exports.actualizar_evento = function(req, res){
    eventoModel.findByIdAndUpdate(req.body.id, {$set : req.body},
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};

module.exports.borrar = function(req, res){
    eventoModel.findByIdAndDelete(req.body.id,
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo borrar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se borró con éxito'});
            }
        }
    )
};


module.exports.deshabilitar = function(req, res){
    eventoModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'Deshabilitado'
    }},
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};

module.exports.habilitar = function(req, res){
    eventoModel.findByIdAndUpdate(req.body.id, {$set : {
        estado: 'Habilitado'
    }},
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};

module.exports.numCupos = function(req, res){
    eventoModel.findByIdAndUpdate(req.body.id, {$set : {
        cupos_Disponibles: req.body.cuposAcumulados
    }},
        function(error){
            if(error){
                res.json({success: false, msg: 'No se pudo actualizar el evento'});
            }else{
                res.json({success: true, msg: 'El evento se actualizó con éxito'});
            }
        }
    )
};

module.exports.buscar_usuarios = function (req, res) {
    userModel.findOne({ _id: req.body.id }).then(
        function (usuario) {
            if (usuario) {
                res.send(usuario);
            } else {
                res.send('No se encontró el usuario');
            }

        }
    )
};

let agregar_patrocinador = function(pid, ppatrocinadores){
    for(let i = 0; i< ppatrocinadores.length; i++){
        eventoModel.findOneAndUpdate({_id: pid}, {$push: {'patrocinadores':{nombrePatrocinador: ppatrocinadores[i]}}}, function(error){
            if(error){
                console.log(error);

            }else{

            }
        });
    }

};


let agregar_categoria = function(pid, pcategorias){
    for(let i = 0; i< pcategorias.length; i++){
        eventoModel.findOneAndUpdate({_id: pid}, {$push: {'categorias':{nombreCategoria: pcategorias[i]}}}, function(error){
            if(error){
                console.log(error);

            }else{

            }
        });
    }

};

module.exports.calificar = function (req, res) {
    eventoModel.findOne({ _id: req.body.idEvento }).then(
        function (evento) {
            if (evento) {
                console.log(evento);
                console.log("Evento encontrado");
                agregar_calificacion(req.body.idEvento, req.body.voto, req.body.comentario, req.body.idUsuario);
                res.json({success: true, msg: ' Evento encontrado, se pudo hacer la petición'});
            } else {
                res.send(false);
                console.log("Evento no encontrado");
                res.json({success: false, msg: 'No se pudo comentar el evento'});
            }

        });
};

let agregar_calificacion = function (pid, pvoto, pcomentario, pusuario) {
    eventoModel.findOneAndUpdate({ _id: pid }, {
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

module.exports.reservar = function (req, res) {
    const {idEvento, idUsuario, correoUsuario, nombreEvento, nombreUsuario} = req.body;

    usuarioModel.findOne({_id: idUsuario}, (error, user) => {

    if (error) console.error(error);
    if (user.eventosReservados.includes(idEvento)) {
        res.json(user);
    }else{
        usuarioModel.findByIdAndUpdate(idUsuario, {$push: {eventosReservados: idEvento}}, {new: true},
        (error, response) => {
            if (error) console.error(error);
            res.json(response);
            let macao = 'Macao';
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
                to: correoUsuario,
                subject: 'Evento reservado aplicación Macao',
                html: `<html>

                <head>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
                </head>
                
                <body style="font-family: 'Montserrat', sans-serif;">
                    <main>
                        <div style= "background-image: url('https://res.cloudinary.com/sibo/image/upload/v1544806807/plantilla_correo.png');
                        background-size: 100% 50%; background-repeat: no-repeat; padding: 10px; width: 80%; margin: 0 auto;">
                            <table style="max-width: 100%; padding: 10px; margin: 0 auto; padding-top: 50%;">
                                <tr>
                                    <td>
                                        <div style="color: #fff; margin: 2% 10% 2%; font-family: sans-serif;">
                                            <h2 style="color: #dd5e06; margin: 0 0 7px; font-size: 34px; margin: 0 auto; text-align: center; padding-bottom: 50px; font-weight: bold">¡Estimado
                                                usuario ${nombreUsuario}!</h2>
                                            <p style="margin: 5px; font-size: 22px; padding-left: 20px; color: #2d3436; padding-bottom: 20px;">
                                                Estamos muy contentos de que vayás a formar parte del evento ${nombreEvento}, te
                                                esperamos.</p>
                                            <div style="width: 100%; text-align: center; padding-top: 20px; margin-top: 20px;">
                                                <a style="text-decoration: none; border-radius: 15px; padding: 20px 43px; color: white; background-color: #dd5e06; font-weight: bold; width: 300px; font-size: 20px;"
                                                    href="http://localhost:3000/public/inicio_sesion.html">Confirmación de evento</a>
                                            </div>
                                            <p style="color: #2d3436; font-size: 16px; text-align: center; margin: 30px 0 0; padding-bottom: 30px; padding-top: 5px; font-weight: bold">¡Disfrutá
                                                de la aplicación!</p>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
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
     });
    }
 });
};

module.exports.desreservar = function (req, res) {
    const {idEvento, idUsuario, correoUsuario, nombreEvento, nombreUsuario} = req.body;

    usuarioModel.findOne({_id: idUsuario}, (error, user) => {

    if (error) console.error(error);
    if (user.eventosReservados.includes(idEvento)) {
      usuarioModel.findByIdAndUpdate(idUsuario, {$pull: {eventosReservados: idEvento}}, {new: false},
      (error, response) => {
          if (error) console.error(error);
          res.json(response);
          let macao = 'Macao';
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
              to: correoUsuario,
              subject: 'Reservación cancelada en la aplicación Macao',
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
                                      <h2 style="color: #fff; margin: 0 0 7px; font-size: 34px; margin: 0 auto; text-align: center; padding-bottom: 40px">¡Reservación cancelada!</h2>
                                      <p style="margin: 2px; font-size: 22px; padding-left: 20px; color: #fff;">
                                          Estimado usuario ${nombreUsuario}, has cancelado la reservación del siguiente evento en Macao. </p>
                                      <ul style="font-size: 18px; color: #fff; margin: 10px 0; padding-left: 50px;">
                                          <li style="padding: 10px;">La reservación de su evento ${nombreEvento} ha sido cancelada satisfactoriamente</li>
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
   });
    }else{
      res.json(user);
    }
 });
};


module.exports.usuarioReserva = function (req, res) {
    const {idEvento, idUsuario} = req.body;

    eventoModel.findOne({_id: idEvento}, (error, evento) => {

    if (error) console.error(error);
        eventoModel.findByIdAndUpdate(idEvento, {$push: {reservas: idUsuario}}, {new: true},
        (error, response) => {
            if (error) console.error(error);
            res.json(response);
     });
 });
};

module.exports.eliminarUsuarioReserva = function (req, res) {
    const {idEvento, idUsuario} = req.body;

    eventoModel.findOne({_id: idEvento}, (error, evento) => {

    if (error) console.error(error);
        eventoModel.findByIdAndUpdate(idEvento, {$pull: {reservas: idUsuario}}, {new: true},
        (error, response) => {
            if (error) console.error(error);
            res.json(response);
     });
 });
};