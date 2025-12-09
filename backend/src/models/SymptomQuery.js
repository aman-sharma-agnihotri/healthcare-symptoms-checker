import mongoose from "mongoose";

const SymptomQuerySchema = new mongoose.Schema(
  {
    symptomsText: { type: String, required: true },
    ipAddress: { type: String },
    result: {
      possibleCauses: [{ type: String }],
      nextSteps: [{ type: String }],
      redFlags: [{ type: String }],
      rawText: { type: String },
    },
  },
  { timestamps: true }
);

export const SymptomQuery =
  mongoose.models.SymptomQuery ||
  mongoose.model("SymptomQuery", SymptomQuerySchema);
