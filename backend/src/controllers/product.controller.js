const fs = require('fs');
const path = require('path');

// Fallback to static JSON file if DB is unavailable
const productsFilePath = path.join(__dirname, '../../products.json');

exports.getAllProducts = async (req, res) => {
  try {
    if (fs.existsSync(productsFilePath)) {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      return res.status(200).json(products);
    }
    // Fallback if no json
    res.status(200).json([]);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    if (fs.existsSync(productsFilePath)) {
      const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
      const product = products.find(p => p.slug === slug);
      if (product) {
        return res.status(200).json(product);
      }
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(404).json({ message: 'Product not found' });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createProduct = async (req, res) => {
  res.status(501).json({ message: 'Not implemented in JSON mock mode' });
};

exports.updateProduct = async (req, res) => {
  res.status(501).json({ message: 'Not implemented in JSON mock mode' });
};

exports.deleteProduct = async (req, res) => {
  res.status(501).json({ message: 'Not implemented in JSON mock mode' });
};
