import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    nome: string;

    @IsInt()
    @IsOptional()
    valor: number;
}