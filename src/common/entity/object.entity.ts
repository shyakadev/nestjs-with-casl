import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'objects' })
export class ObjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
