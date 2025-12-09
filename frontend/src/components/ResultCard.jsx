const Pill = ({ children }) => (
    <span className="inline-block text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded-full mr-1 mb-1">
      {children}
    </span>
  );
  
  const ResultCard = ({ result }) => {
    if (!result) return null;
  
    const { possibleCauses, nextSteps, redFlags, disclaimer } = result;
  
    return (
      <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-800">
          Educational summary (not a diagnosis)
        </h2>
  
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">
            Possible general causes / areas to learn about
          </h3>
          {possibleCauses?.length ? (
            <div className="flex flex-wrap">
              {possibleCauses.map((c, i) => (
                <Pill key={i}>{c}</Pill>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No possible causes found.
            </p>
          )}
        </div>
  
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-700">
            Suggested next steps
          </h3>
          {nextSteps?.length ? (
            <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
              {nextSteps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">
              No next steps suggested.
            </p>
          )}
        </div>
  
        {redFlags?.length ? (
          <div className="space-y-2 border border-red-200 bg-red-50 rounded-xl p-3">
            <h3 className="text-sm font-semibold text-red-700">
              Red-flag signs – seek urgent medical care if present
            </h3>
            <ul className="list-disc list-inside text-xs text-red-800 space-y-1">
              {redFlags.map((flag, i) => (
                <li key={i}>{flag}</li>
              ))}
            </ul>
          </div>
        ) : null}
  
        <p className="text-[11px] text-slate-500 leading-snug">
          {disclaimer}
        </p>
      </div>
    );
  };
  
  export default ResultCard;
  