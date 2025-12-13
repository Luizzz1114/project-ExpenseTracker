import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Categorias } from './categorias.model';
import { Transacciones } from './transacciones.model';

@Entity()
export class Usuarios extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contrasena: string;

  @OneToMany(() => Categorias, (categoria) => categoria.usuario)
  categorias: Categorias[];

  @OneToMany(() => Transacciones, (transaccion) => transaccion.usuario)
  transacciones: Transacciones[];

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}