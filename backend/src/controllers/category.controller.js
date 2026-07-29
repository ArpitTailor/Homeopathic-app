const prisma = require('../utils/prismaClient');

// Create a new category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, slug, description, image } = req.body;

    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this slug already exists' });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description,
        image,
      },
    });

    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ categories });
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update a category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, image } = req.body;

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        slug,
        description,
        image,
      },
    });

    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete a category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.category.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
