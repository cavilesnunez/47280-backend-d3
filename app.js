import express from 'express';
import { promises as fsPromises } from 'fs';
import { ProductManager } from './src/ProductManager.js';

const app = express();
const port = 5000;

const filePath = './src/products.txt';
const productManager = new ProductManager(filePath);

app.get('/products', async (req, res) => {
    try {
        const allProducts = await productManager.getProducts();
        res.json(allProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// app.get('/products', async (req, res) => {
//     try {
//         let limit = req.query.limit ? parseInt(req.query.limit) : undefined;
//         let allProducts = await productManager.getProducts();
//         let productsToSend = limit ? allProducts.slice(0, limit) : allProducts;

//         res.json(productsToSend);
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener los productos' });
//     }
// });


app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});



// app.get('/products/:pid', async (req, res) => {
//     try {
//         console.log('ID de producto solicitado:', req.params.pid);
//         let productId = parseInt(req.params.pid);
//         let product = await productManager.getProductById(productId);

//         if (product) {
//             res.json(product);
//         } else {
//             res.status(404).json({ error: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         res.status(500).json({ error: 'Error al obtener el producto' });
//     }
// });

app.listen(port, () => {
    console.log(`Servidor Express corriendo en http://localhost:${port}`);
});
