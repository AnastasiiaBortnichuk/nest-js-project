import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cosmetics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  brand: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  product_type: string;

  @Column()
  api_featured_image: string;

  @Column('text', { nullable: true })
  price_sign: string | null;

  @Column('jsonb', { array: true, nullable: true })
  product_colors: { hex_value: string; colour_name: string }[];

  @Column({ nullable: true })
  price: string;
}
