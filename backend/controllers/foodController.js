const Food = require("./../models/FoodModel");

exports.addFood = async (req, res) => {
  const { name, description, category, image, price } = req.body;
  if (!name || !description || !category || !image || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newFood = new Food({
      name,
      description,
      category,
      image,
      price,
    });

    await newFood.save();
    res
      .status(201)
      .json({ message: "Food data added successfully", foodItem: newFood });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.getFoods = async (req, res) => {
  try {
    const foodItems = await Food.find();

    if (!foodItems) {
      return res
        .status(404)
        .json({ success: false, message: "No food items found" });
    }

    res
      .status(200)
      .json({ success: true, length: foodItems.length, foodItems });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
