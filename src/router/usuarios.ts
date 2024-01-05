import express from 'express';
import { obtenerTodosLosUsuarios } from '../controllers/usuarios';
import { estaAutenticado } from '../middlewares';

export default (router: express.Router) => {
  router.get('/usuarios', estaAutenticado, obtenerTodosLosUsuarios);
};