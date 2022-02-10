import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        const id = this.productsService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id };
    }

    @Get()
    getAllProducts() {
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(
        @Param('id') prodId: string,
    ) {
        const product = this.productsService.getProductById(prodId);
        console.log('product in controller is ', product);
        return product;
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number,
    ) {
        this.productsService.updateProductById(prodId, prodTitle, prodDesc, prodPrice);
        return null;
    }

    @Delete(':id')
    removeProduct(
        @Param('id') prodId: string,
    ) {
        this.productsService.deleteProduct(prodId);
        return null;
    }
}
