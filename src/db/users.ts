import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre_usuario: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  autenticacion: {
    contrasena: {
      type: String,
      required: true,
      select: false,
    },
    sal: {
      type: String,
      select: false,
    },
    tokenSesion: {
      type: String,
      select: false,
    },
  },
});

export const ModeloUsuario = mongoose.model("Usuario", UsuarioSchema);

export const obtenerUsuarios = ModeloUsuario.find();

export const obtenerUsuarioPorEmail = (email: string) =>
  ModeloUsuario.findOne({ correo: email });

export const obtenerUsuarioPorToken = (tokenSesion: string) =>
  ModeloUsuario.findOne({ "autenticacion.tokenSesion": tokenSesion });

export const obtenerUsuarioPorId = (id: string) => ModeloUsuario.findById(id);

export const crearUsuario = (valores: Record<string, any>) =>
  new ModeloUsuario(valores).save().then((usuario: any) => usuario.toObject());

export const borrarUsuarioPorId = (id: string) =>
  ModeloUsuario.findOneAndDelete({ _id: id });

export const actualizarUsuarioPorId = (
  id: string,
  valores: Record<string, any>
) => ModeloUsuario.findByIdAndUpdate(id, valores);
