import express from "express";
import {
  actualizarUsuario,
  borrarUsuario,
  obtenerTodosLosUsuarios,
} from "../controllers/usuarios";
import { esPropietario, estaAutenticado } from "../middlewares";

export default (router: express.Router) => {
  router.get("/usuarios", estaAutenticado, obtenerTodosLosUsuarios);
  router.delete("/usuarios/:id", estaAutenticado, esPropietario, borrarUsuario);
  router.patch(
    "/usuarios/:id",
    estaAutenticado,
    esPropietario,
    actualizarUsuario
  );
};
