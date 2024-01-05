import express from "express";
import { obtenerUsuarioPorEmail, crearUsuario } from "../db/users";
import { random, autentication } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(403).json({ error: "Campos incompletos" });
    }

    const usuario = await obtenerUsuarioPorEmail(correo).select(
      "+autenticacion.sal +autenticacion.contrasena"
    );

    if (!usuario) {
      return res.status(403).json({ error: "Usuario inexistente" });
    }

    const hashEsperado = autentication(usuario.autenticacion.sal, contrasena);

    if (usuario.autenticacion.contrasena !== hashEsperado) {
      return res.status(403).json({ error: "Contraseña incorrecta" });
    }

    const sal = random();
    usuario.autenticacion.tokenSesion = autentication(
      sal,
      usuario._id.toString()
    );

    await usuario.save();

    res.cookie("TOKEN", usuario.autenticacion.tokenSesion, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(usuario).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};

export const registro = async (req: express.Request, res: express.Response) => {
  try {
    const { correo, contrasena, nombre_usuario } = req.body;

    if (!correo || !contrasena || !nombre_usuario) {
      return res.status(403).json({ error: "Campos incompletos" });
    }

    const usuarioExistente = await obtenerUsuarioPorEmail(correo);

    if (usuarioExistente) {
      console.log("Usuario ya existe");
      return res.status(403).json({ error: "Usuario existente" });
    }

    const sal = random();
    const contrasenaHash = autentication(sal, contrasena);

    const usuario = await crearUsuario({
      correo,
      nombre_usuario,
      autenticacion: {
        contrasena: contrasenaHash,
        sal,
      },
    });

    return res.status(200).json(usuario).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
