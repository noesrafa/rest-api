import express from "express";
import { obtenerUsuarios } from "../db/users";

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
