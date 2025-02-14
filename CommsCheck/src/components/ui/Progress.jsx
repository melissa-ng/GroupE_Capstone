export function Progress({ value, className = "" }) {
    return (
      <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
        <div
          className="bg-blue-500 h-2.5 rounded-full transition-all"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  }
  