import express from "express";
import autenticacion from "./autenticacion";

const router = express.Router();

export default (): express.Router => {
  autenticacion(router);
  return router;
};
