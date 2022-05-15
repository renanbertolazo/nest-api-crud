import { Injectable, Inject } from '@nestjs/common';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product';
//import { EntityManager, getConnection, DataSource, QueryRunner, getManager } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) { }

  async findOne(cod_produto: number): Promise<ProductEntity> {
    return await this.productRepository.findOne({
      where: {
        cod_produto: cod_produto
      }
    });
  }

  async create(dto: CreateProductDto): Promise<ProductEntity> {
    let product = new ProductEntity();
    product.nome = dto.nome;
    product.valor = dto.valor;

    const queryRunner = this.productRepository.manager.connection.createQueryRunner();

    try {
      await queryRunner.startTransaction();
      const result = await queryRunner.manager.save(product);

      await queryRunner.commitTransaction();

      return result;

    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release()
    }
  }

  async findAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  async delete(cod_produto: number): Promise<DeleteResult> {
    return await this.productRepository.delete(cod_produto);
  }

  async update(dto: UpdateProductDto, cod_produto: number): Promise<UpdateResult> {
    return await this.productRepository.update({ cod_produto },
      {
        nome: dto.nome,
        valor: dto.valor
      });
  }
}
