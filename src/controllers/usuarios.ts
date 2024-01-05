import express from "express";
import {
  borrarUsuarioPorId,
  obtenerUsuarioPorId,
  obtenerUsuarios,
} from "../db/users";

export const obtenerTodosLosUsuarios = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const usuarios = await obtenerUsuarios();

    return res.status(200).json(usuarios).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};

export const borrarUsuario = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const usuarioBorrado = await borrarUsuarioPorId(id);

    return res.json(usuarioBorrado).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};

export const actualizarUsuario = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { nombre_usuario } = req.body;

    if (!nombre_usuario) {
      return res.status(403).json({ error: "Campos incompletos" });
    }

    const usuario = await obtenerUsuarioPorId(id);

    usuario.nombre_usuario = nombre_usuario;
    await usuario.save();

    return res.status(200).json(usuario).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};
