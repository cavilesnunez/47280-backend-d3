    import fs from 'fs/promises';

    export class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() { 
        try {
            const myData = await fs.readFile(this.path, 'utf-8');
            this.products = JSON.parse(myData);
        } catch (error) {
            this.products = [];
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf-8');
    }

    addProduct(product) {
        const newProduct = {
        ...product,
        id: this.products.length + 1, 
        };
        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }

    updateProduct(id, updatedProduct) {
        this.products = this.products.map((product) =>
        product.id === id ? { ...updatedProduct, id } : product
        );
        this.saveProducts();
    }

    deleteProduct(id) {
        this.products = this.products.filter((product) => product.id !== id);
        this.saveProducts();
    }
    }


    export default ProductManager;