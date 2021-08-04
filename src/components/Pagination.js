import React from "react";

function Pagination({ employeesPerPage, totalEmployees, paginate, size }) {
  // const pageNumbers = [];
  // for (let i = 1; i <= Math.ceil(totalEmployees / employeesPerPage); i++) {
  //   pageNumbers.push(i);
  // }

  const pageNumber = Math.ceil(size / 5);
  let sizeArray = [...Array(pageNumber).keys()];

  return (
    <nav>
      <ul className="pagination">
        {sizeArray.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number + 1)} className="page-link">
              {number + 1}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
