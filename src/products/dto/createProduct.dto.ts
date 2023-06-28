import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductColorDto {
  @IsNotEmpty()
  hex_value: string;

  @IsNotEmpty()
  colour_name: string;
}

export class CreateProductDto {
  @IsOptional()
  @IsNumberString()
  id?: number;

  @IsNotEmpty()
  brand: string;

  @IsNotEmpty()
  name: string;

  description: string;

  @IsNotEmpty()
  product_type: string;

  @IsNotEmpty()
  api_featured_image: string;

  price_sign: string | null;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @ValidateNested({ each: true })
  @Type(() => ProductColorDto)
  product_colors: ProductColorDto[];

  @IsNumberString()
  price: string;
}

export default CreateProductDto;
