const Rule = require("../models/Rule");

exports.getData = async (req, res) => {
  try {
    const rules = await Rule.find({});
    res.status(200).json({ data: rules });
  } catch (error) {
    console.error("Error fetching rules:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data from the database." });
  }
};

exports.getSingleData = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ message: "ID is required in the request body." });
  }

  try {
    const rule = await Rule.findById(id);

    if (!rule) {
      return res.status(404).json({ message: "Document not found." });
    }

    return res.status(200).json({ data: rule });
  } catch (error) {
    console.error("Error fetching rule by ID:", error);
    return res
      .status(500)
      .json({ message: "Failed to fetch data from the database." });
  }
};


exports.deleteRule = async (req, res) => {
    const { _id } = req.body;
  
    if (!_id) {
      return res.status(400).json({ error: "_id is required in the request body." });
    }
  
    try {
      const deletedRule = await Rule.findByIdAndDelete(_id);
  
      if (!deletedRule) {
        return res.status(404).json({ error: "Document not found." });
      }
  
      return res.status(200).json({ message: "Document deleted successfully." });
    } catch (error) {
      console.error("Error deleting rule by ID:", error);
      return res.status(500).json({ error: "Failed to delete the document from the database." });
    }
  };