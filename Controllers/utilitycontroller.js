const Category = require('../models/CategoryModel');
const Sizes = require('../models/SizeModel');

const check_category = async (req, res, next) => {
    const categoryName = req.params.category;

    if (!categoryName) {
        return res.json({ error: 'Category parameter is required.' });
    }

    try {
        const category = await Category.findOne({ Name: categoryName });
        if (category) {
            res.status(404).json({ message: `Error there will be a duplicates`, color: 'danger' });

        } else {
            res.json({ message: `You can add.`, color: 'success' });
        }
    } catch (error) {
        console.error(error);
        res.json({ error: 'Internal Server Error' });
    }
};


const add_category = async (req, res, next) => {
    const categoryName = req.body.category_name;

    if (!categoryName) {
        return res.status(400).json({ error: 'Category parameter is required.' });
    }

    try {
        const existingCategory = await Category.findOne({ Name: categoryName });

        if (existingCategory) {
            // Category already exists
            return res.status(409).json({ message: `Category "${categoryName}" already exists.`, color: 'danger' });
        }

        // Create a new category
        const newCategory = new Category({ Name: categoryName });
        await newCategory.save();

        return res.status(409).json({message: "Added to category list successfully" , color: 'success' });

        } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const view_utilities = async (req, res,next) => 
{
    try
    {
        const category= await Category.find();
     
        return res.status(409).json({Categories: category });
    }
    catch (error) 
    {
        console.error(error);
        next(error);
    }
};

module.exports = { check_category , add_category , view_utilities};



