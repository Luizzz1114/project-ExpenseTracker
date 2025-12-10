import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuarios } from "./usuarios.models";
import { Transacciones } from "./transacciones.model";

@Entity()
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column()
  icono?: string;

  @Column()
  color?: string;

  @ManyToOne(() => Usuarios, (usuario) => usuario.categorias)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuarios;

  @OneToMany(() => Transacciones, (transaccion) => transaccion.categoria)
  transacciones: Transacciones[];

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;
}