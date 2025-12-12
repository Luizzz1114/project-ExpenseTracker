import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function generarToken(id: Number, nombre: String, correo: String): string {
  return jwt.sign({ id, nombre, correo }, process.env.JWT_SECRET, { expiresIn: '5h' });
}