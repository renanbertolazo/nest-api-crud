import { IsString, IsInt, IsBIC, IsCurrency } from 'class-validator';

export class CreateProductDto {
    @IsString()
    nome: string;

    @IsInt()
    valor: number;
}