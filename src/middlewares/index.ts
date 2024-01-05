import express from "express";
import { get, merge } from "lodash";

import { obtenerUsuarioPorToken } from "../db/users";

export const esPropietario = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const usuarioActual = get(req, "identidad._id") as string;

    if (!usuarioActual) {
      return res.status(403).json({ error: "No autorizado" });
    }

    if (usuarioActual.toString() !== id) {
      return res.status(403).json({ error: "No autorizado" });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};

export const estaAutenticado = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const tokenDeLaSesion = req.cookies["TOKEN"];

    if (!tokenDeLaSesion) {
      return res.status(403).json({ error: "No autorizado" });
    }

    const usuarioExistente = await obtenerUsuarioPorToken(tokenDeLaSesion);

    if (!usuarioExistente) {
      return res.status(403).json({ error: "No autorizado" });
    }

    merge(req, { identidad: usuarioExistente });

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400).json({ error: error.message });
  }
};
