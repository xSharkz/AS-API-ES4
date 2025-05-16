const Producto = require('../models/productModel');

exports.createProduct = async (req, res) => {
  try {
    const { nombre, sku, precio, stock, activo } = req.body;

    if (!nombre || !sku || precio <= 0 || stock < 0) {
      return res.status(400).json({ message: 'Datos inválidos' });
    }

    const existente = await Producto.findOne({ sku });
    if (existente) return res.status(400).json({ message: 'SKU ya existe' });

    const nuevo = new Producto({ nombre, sku, precio, stock, activo });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.getProductsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const productos = await Producto.find().skip(skip).limit(limit);
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { nombre, sku, precio, stock, activo } = req.body;
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    if (nombre !== undefined) producto.nombre = nombre;
    if (sku !== undefined) producto.sku = sku;
    if (precio !== undefined && precio > 0) producto.precio = precio;
    if (stock !== undefined && stock >= 0) producto.stock = stock;
    if (activo !== undefined) producto.activo = activo;

    await producto.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });

    producto.activo = false;
    await producto.save();
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
};
