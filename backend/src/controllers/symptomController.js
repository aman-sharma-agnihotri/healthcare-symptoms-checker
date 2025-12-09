import { analyzeSymptomsWithLLM } from "../services/llmService.js";
import { SymptomQuery } from "../models/SymptomQuery.js";

export const checkSymptoms = async (req, res) => {
  try {
    const { symptomsText } = req.body;

    if (!symptomsText || !symptomsText.trim()) {
      return res
        .status(400)
        .json({ message: "symptomsText is required" });
    }

    const ipAddress =
      req.headers["x-forwarded-for"] ||
      req.socket.remoteAddress ||
      "";

    const analysis = await analyzeSymptomsWithLLM(symptomsText);

    // Save to DB if connected
    let saved = null;
    try {
      saved = await SymptomQuery.create({
        symptomsText,
        ipAddress,
        result: analysis,
      });
    } catch (err) {
      console.warn("⚠️ Could not save history:", err.message);
    }

    return res.json({
      success: true,
      data: analysis,
      id: saved?._id || null,
    });
  } catch (err) {
    console.error("LLM error:", err.message);
    return res.status(500).json({
      success: false,
      message:
        "Sorry, something went wrong analyzing the symptoms.",
    });
  }
};

export const getHistory = async (_req, res) => {
  try {
    const items = await SymptomQuery.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return res.json({ success: true, data: items });
  } catch (err) {
    console.error("History error:", err.message);
    return res
      .status(500)
      .json({ success: false, message: "Could not load history." });
  }
};
