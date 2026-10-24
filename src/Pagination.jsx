
function Pagination(props) {
  if (props.totalPages <= 1) return null;

  const pages = Array.from({ length: props.totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((page) => (
        <button
          key={page}
          className={page === props.currentPage ? "page active" : "page"}
          onClick={() => props.onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;