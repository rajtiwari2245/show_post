import React from "react";

function Pagination({ totalItems, perPage, currentPage, onPageChange }) {
  const totalPage = Math.max(1, Math.ceil(totalItems / perPage));

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const next = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  const page = [];
  for (let i = 1; i <= totalPage; i++) {
    page.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-4 mb-4">
      <button
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
        onClick={prev}
        disabled={currentPage === 1}
      >
        prev
      </button>

      {page.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded ${
            p === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => onPageChange(p)}
        >
          {p}
        </button>
      ))}

      <button
        onClick={next}
        disabled={currentPage === totalPage}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-300 disabled:opacity-50 cursor-pointer"
      >
        next
      </button>
    </div>
  );
}

export default Pagination;
