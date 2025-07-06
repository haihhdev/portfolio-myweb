import About from "../models/About.js";

export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne({});
    res.json(about);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching about data", error: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    const updated = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating about data", error: error.message });
  }
};

export const createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating about data", error: error.message });
  }
};

export const deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAbout = await About.findByIdAndDelete(id);
    if (!deletedAbout) {
      return res.status(404).json({ message: "About data not found" });
    }
    res.json({ message: "About data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting about data", error: error.message });
  }
};
