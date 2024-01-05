import express from "express";
import autenticacion from "./autenticacion";
import usuarios from "./usuarios";

const router = express.Router();

export default (): express.Router => {
  autenticacion(router);
  usuarios(router);
  return router;
};
