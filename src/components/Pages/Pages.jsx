import React from "react";
import "../Pages/Pages.css";

export default function Pages({ countriPerPage, paginado, allCountry }) {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(allCountry / countriPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="pag">
			<ul className="pagination">
				{pageNumbers &&
					pageNumbers.map(number => (
						<li className="border" key={number}>
							<button className="pagina" onClick={() => paginado(number)}>{number}</button>
						</li>
					))}
			</ul>
		</nav>
	);
}
