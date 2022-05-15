import { IsString, IsInt } from 'class-validator';

export class ProductDto {
  @IsInt()
  cod_produto: number;

  @IsString()
  nome?: string;

  @IsInt()
  valor?: number;
}
