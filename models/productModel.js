const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const productSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4
  },
  nombre: {
    type: String,
    required: true,
    maxlength: 50
  },
  sku: {
    type: String,
    required: true,
    maxlength: 30,
    unique: true
  },
  precio: {
    type: Number,
    required: true,
    min: 1
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  activo: {
    type: Boolean,
    default: true
  }
}, { _id: false });

module.exports = mongoose.model('Producto', productSchema);
