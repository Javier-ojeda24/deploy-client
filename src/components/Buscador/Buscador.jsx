import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Buscador/buscador.css";
import { getCountryName } from "../../redux/action";

export default function Buscador({ setCurrentPage }) {
	const dispatch = useDispatch();
	const [name, setName] = useState("");

	function handleInputChange(e) {
		e.preventDefault();
		setName(e.target.value);
	}
	const allCountries = useSelector(state => state.allCountries);

	function handleSubmit(e) {
		e.preventDefault();
		const busqueda = allCountries.filter(
			c => c.name.toLowerCase() === name.toLowerCase()
		);
		console.log(busqueda);

		if (!name) {
			alert("Dedes escribir el nombre de algun pais.");
		} else if (!busqueda || busqueda.length === 0) {
			alert("No existe ese pais");
		}
		dispatch(getCountryName(name));
		setName("");
		setCurrentPage(1);
	}
	return (
		<div>
			<div className="containerr">
				<input
					value={name}
					type="text"
					placeholder=" Buscar..."
					onChange={el => handleInputChange(el)}
				/>
				<div className="btnn">
					<button
						className="search"
						type="submit"
						onClick={el => handleSubmit(el)}
					>
						Buscar
					</button>
				</div>
			</div>
		</div>
	);
}
