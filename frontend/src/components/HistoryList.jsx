const HistoryList = ({ items }) => {
    if (!items?.length) return null;
  
    return (
      <div className="bg-white shadow-sm rounded-2xl p-4 sm:p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-800">
            Recent checks (local history)
          </h2>
          <span className="text-[10px] text-slate-400">
            Stored anonymously (symptoms text only)
          </span>
        </div>
  
        <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item._id}
              className="border border-slate-100 rounded-xl p-3"
            >
              <p className="text-xs text-slate-600 mb-1 line-clamp-2">
                {item.symptomsText}
              </p>
              <p className="text-[10px] text-slate-400">
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HistoryList;
  