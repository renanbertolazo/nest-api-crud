import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryGeneratedColumn()
  cod_produto: number;

  @Column({ length: 45 })
  nome: string;

  @Column()
  valor: number;
}
