import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Products {
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

  @Column({ nullable: true })
  price: string;

  @Column('jsonb', { array: true, nullable: true })
  product_colors: { hex_value: string; colour_name: string }[];
}
