import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuarios } from "./usuarios.models";
import { Categorias } from "./categorias.model";

@Entity()
export class Transacciones {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  monto: number;

  @Column()
  descripcion: string;

  @Column()
  tipo: string;

  @Column()
  fecha: Date;

  @ManyToOne(() => Usuarios, (usuario) => usuario.transacciones)
  @JoinColumn({ name: "usuario_id" })
  usuario: Usuarios;

  @ManyToOne(() => Categorias, (categoria) => categoria.transacciones)
  @JoinColumn({ name: "categoria_id" })
  categoria: Categorias;

  @CreateDateColumn({ name: "created_at"})
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at"})
  updatedAt: Date;
}