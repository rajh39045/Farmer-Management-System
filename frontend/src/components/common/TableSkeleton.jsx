const TableSkeleton = ({ rows = 6 }) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100">
            {[...Array(5)].map((_, index) => (
              <th
                key={index}
                className="p-4"
              >
                <div className="h-5 bg-gray-300 rounded animate-pulse" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex}>
              {[...Array(5)].map((_, colIndex) => (
                <td
                  key={colIndex}
                  className="p-4"
                >
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;