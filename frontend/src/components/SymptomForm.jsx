import { useState } from "react";

const SymptomForm = ({ onSubmit, loading }) => {
  const [symptomsText, setSymptomsText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!symptomsText.trim()) return;
    onSubmit(symptomsText.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Describe your symptoms
        </h2>
        <span className="text-xs text-slate-500">
          Type Symptoms below
        </span>
      </div>

      <textarea
        className="w-full h-32 rounded-xl border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        placeholder="Example: I have had a mild fever, dry cough, and sore throat for 3 days..."
        value={symptomsText}
        onChange={(e) => setSymptomsText(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-blue-600 text-white text-sm font-semibold py-2.5 hover:bg-blue-700 disabled:bg-blue-300 transition"
      >
        {loading ? "Analyzing..." : "Check Possible Causes"}
      </button>

      <p className="text-[11px] text-slate-500">
        This tool does <span className="font-semibold">not</span> give
        diagnoses or medical advice. It only provides general educational
        information. Always consult a doctor.
      </p>
    </form>
  );
};

export default SymptomForm;
