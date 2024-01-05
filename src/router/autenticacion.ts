import { registro } from "../controllers/autenticacion";
import express from "express";

export default (router: express.Router) => {
  router.post("/auth/registro", registro);
};
