import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { NextFunction, Request, Response } from "express";
import { Usuarios } from '../models/usuarios.model';
import { respuestaError } from "../utils/responses";

declare global {
  namespace Express {
    interface Request {
      usuario?: Usuarios;
    }
  }
}

export async function auntenticarToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if(!token) {
    return respuestaError(res, 401, 'Acceso no autorizado.');
  }
  try {
    const dataToken = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof dataToken === 'object' && dataToken.id) {
      const usuario = await Usuarios.findOneBy({ id: dataToken.id });
      if(usuario) {
        req.usuario = usuario;
        next();
      } else {
        respuestaError(res, 401, 'Token inválido.');
      }
    }
  } catch (error) {
    respuestaError(res, 401, 'Token inválido.');
  }
}