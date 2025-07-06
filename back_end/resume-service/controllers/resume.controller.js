import Resume from "../models/Resume.js";

export const getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({});
    res.json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching resume data", error: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const updated = await Resume.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updated);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating resume data", error: error.message });
  }
};

export const createResume = async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.status(201).json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating resume data", error: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedResume = await Resume.findByIdAndDelete(id);
    if (!deletedResume) {
      return res.status(404).json({ message: "Resume data not found" });
    }
    res.json({ message: "Resume data deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting resume data", error: error.message });
  }
};

export const exportResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({});
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Set headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="resume.pdf"');

    // Here you would typically generate PDF using a library like puppeteer or jsPDF
    // For now, we'll return the JSON data
    res.json(resume);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error exporting resume", error: error.message });
  }
};
