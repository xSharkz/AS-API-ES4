require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Producto = require('../models/productModel');
const connectDB = require('../config/db');

const generarProductos = (cantidad = 100) => {
  const productos = [];

  for (let i = 0; i < cantidad; i++) {
    productos.push({
      _id: faker.string.uuid(),
      nombre: faker.commerce.productName().slice(0, 50),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      precio: faker.number.int({ min: 1000, max: 100000 }),
      stock: faker.number.int({ min: 0, max: 100 }),
      activo: faker.datatype.boolean(),
    });
  }

  return productos;
};

const seed = async () => {
  try {
    await connectDB();
    await Producto.deleteMany();
    const productos = generarProductos(100);
    await Producto.insertMany(productos);
    console.log(`Se insertaron ${productos.length} productos`);
    process.exit();
  } catch (error) {
    console.error('Error al poblar productos:', error);
    process.exit(1);
  }
};

seed();
