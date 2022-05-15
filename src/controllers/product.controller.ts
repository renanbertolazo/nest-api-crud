import { Controller, HttpCode, Header, Post, Get, Put, Delete, Param, Body } from '@nestjs/common';
import { Query, HttpStatus, Response, HttpException, UseFilters, ConsoleLogger, Res } from '@nestjs/common';
import { ProductsService } from '../services/product.service';
import { CreateProductDto, UpdateProductDto, ProductDto } from 'src/dtos/product';
//import { Product } from 'src/interfaces/product.interface';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
  constructor(private productsService: ProductsService, private httpService: HttpService) {}

  @Get(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async findOne(@Param('id') id: number): Promise<ProductDto> {
    return this.productsService.findOne(id);
  }

  @Get(':id/axios')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  getAxios(): Observable<AxiosResponse<any[]>> {
    return this.httpService.get('https://api.thecatapi.com/v1/categories'); 
  }

  @Get()
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async findAll(): Promise<ProductDto[]> {
    return this.productsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(@Body() createProductDto: CreateProductDto): Promise<any> {
    const result = await this.productsService.create(createProductDto);
    
    return result;
  }

  @Put(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto): Promise<UpdateResult> {
    return this.productsService.update(updateProductDto, id);
  }

  @Delete(':id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    const resultado = await this.productsService.delete(id);
    return resultado;
  }
}
