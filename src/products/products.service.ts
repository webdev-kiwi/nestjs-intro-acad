import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const productId = Math.random().toString();
        const newProduct = new Product(productId, title, desc, price);
        this.products.push(newProduct);
        return productId;
    }

    getProducts() {
        // use spread here to return a new array and not a pointer to our local array
        return [...this.products];
    }

    getProductById(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProductById(productId: string, title: string, desc: string, price: number) {
        // array destructuring
        const [product, index] = this.findProduct(productId);
        const updatedProduct = { ...product };
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        this.products[index] = updatedProduct;
    }

    deleteProduct(productId: string) {
        const [_, index] = this.findProduct(productId);
        this.products.splice(index, 1);
    }

    // this return type is an example of a 'tuple'
    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex(prod => prod.id === id); 
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}
