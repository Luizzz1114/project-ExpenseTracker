import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Usuarios } from './usuarios.model';
import { Transacciones } from './transacciones.model';

@Entity()
export class Categorias extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  icono: string;

  @Column()
  color: string;

  @ManyToOne(() => Usuarios, (usuario) => usuario.categorias, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuarios;

  @OneToMany(() => Transacciones, (transaccion) => transaccion.categoria)
  transacciones: Transacciones[];

  @CreateDateColumn({ name: 'created_at'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at'})
  updatedAt: Date;
}