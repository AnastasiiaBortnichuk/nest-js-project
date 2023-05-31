import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  id?: number;

  brand: string;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  product_type: string;

  @IsNotEmpty()
  api_featured_image: string;

  price_sign: string | null;

  product_colors: { hex_value: string; colour_name: string }[];

  price: string;
}

export default CreateProductDto;
