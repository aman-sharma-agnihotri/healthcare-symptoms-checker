import { useState, useEffect } from "react";
import { api } from "./api/client";
import SymptomForm from "./components/SymptomForm";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const fetchHistory = async () => {
    try {
      const res = await api.get("/symptoms/history");
      if (res.data?.success) {
        setHistory(res.data.data || []);
      }
    } catch (err) {
      console.warn("History error", err.message);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleCheckSymptoms = async (symptomsText) => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/symptoms/check", { symptomsText });
      if (res.data?.success) {
        setResult(res.data.data);
        // Reload latest history
        fetchHistory();
      } else {
        setError(res.data?.message || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center px-3 py-6 sm:py-10">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <header className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 m-3">
            Healthcare Symptom Checker
          </h1>
          <p className="text-sm text-slate-600 max-w-90%">
            Enter your symptoms in your own words. This tool uses AI to
            give <span className="font-semibold">general educational</span>{" "}
            information about possible causes and helpful questions to ask
            a doctor. It is <span className="font-semibold">not</span> a
            diagnosis or medical advice.
          </p>
          <p className="text-xs text-red-600 font-medium">
            ⚠️ Not for emergencies. If you have severe symptoms (e.g.
            chest pain, difficulty breathing, sudden weakness, confusion,
            heavy bleeding), call emergency services immediately.
          </p>
        </header>

        {/* Layout */}
        <main className="grid md:grid-cols-3 gap-4 md:gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <SymptomForm onSubmit={handleCheckSymptoms} loading={loading} />
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-700">
                {error}
              </div>
            )}
            <ResultCard result={result} />
          </div>

          <div className="md:col-span-1">
            <HistoryList items={history} />
          </div>
        </main>

        <footer className="text-[11px] text-slate-500">
          Made by Aman Sharma.
        </footer>
      </div>
    </div>
  );
}

export default App;
