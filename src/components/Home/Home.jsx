import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getCountry,
	filterContinente,
	orderByName,
	filterCountryByPopulation,
	getActivities,
	filterCreated,
} from "../../redux/action";
import { Card } from "../Card/Card";
import Buscador from "../Buscador/Buscador";
import Pages from "../Pages/Pages";
import "../Home/Home.css";
import { Link } from "react-router-dom";
import countries from "../imagenes/countries.png";
import travellingTheWorld from "../imagenes/travellingTheWorld.gif";

export const Home = () => {
	const [, setInOrder] = useState("");
	const [, setOrden] = useState("");
	const dispatch = useDispatch();

	const allCountry = useSelector(state => state.countries);
	// const activities = useSelector(state => state.activities);
	// console.log(activities);
	const [currentPage, setCurrentPage] = useState(1);
	const [countriPerPage, setCountriPerPage] = useState(10);

	// console.log(setCountriPerPage);
	const indexOfLastCountri = currentPage * countriPerPage;
	const indexOfFirsCountri = indexOfLastCountri - countriPerPage;
	let currentCountri = allCountry.slice(indexOfFirsCountri, indexOfLastCountri);
	const paginado = pageNumber => {
		setCurrentPage(pageNumber);
	};
	if (indexOfLastCountri === 10) {
		currentCountri = allCountry.slice(0, 9);
	}

	useEffect(() => {
		dispatch(getCountry());
		dispatch(getActivities());
	}, [dispatch]);

	const hanleClick = e => {
		e.preventDefault();
		dispatch(getCountry());
	};

	function handleFilterContinente(e) {
		if (e.target.value === "all") {
			dispatch(getCountry());
		} else {
			dispatch(filterContinente(e.target.value));
			setCurrentPage(1);
		}
	}

	function handleSort(e) {
		e.preventDefault();
		if (e.target.value === "all") {
			dispatch(getCountry());
		} else {
			dispatch(orderByName(e.target.value));
			setCurrentPage(1);
			setOrden(`Ordenado ${e.target.value}`);
		}
	}

	function handleSortPopulation(e) {
		e.preventDefault();
		if (e.target.value === "all") {
			dispatch(getCountry());
		} else {
			dispatch(filterCountryByPopulation(e.target.value));
			setCurrentPage(1);
			setInOrder(`Ordenado ${e.target.value}`);
		}
	}
	// console.log(allCountry);
	function handleSelec(el) {
		el.preventDefault();
		dispatch(filterCreated(el.target.value));
		setCurrentPage(1);
	}

	return (
		<div todo-app>
			<div className="encabe">
				<div className="container barr">
					<img src={countries} alt="" height="70px"></img>
					<h1>Hotel Urban </h1>
					<div className="actividad">
						<div>
							<Link className="crear" to="/form">
								Crear Actividades
							</Link>
						</div>
					</div>
					<div className="filtro-act">
						<select onChange={el => handleSelec(el)}>
							<option value="sin-filtro">Sin Actividad</option>
							<option value="actividad">Con Actividad</option>
						</select>
					</div>
				</div>
				<div className="filtrados">
					<select
						onClick={e => {
							handleSort(e);
						}}
					>
						<option value="all">Alfabeticamente</option>
						<option value="asc">A - Z</option>
						<option value="desc">Z - A</option>
					</select>

					<select onClick={e => handleSortPopulation(e)}>
						<option value="all">Población</option>
						<option value="menor">Menor población</option>
						<option value="mayor">Mayor población</option>
					</select>

					<select onChange={e => handleFilterContinente(e)}>
						<option value="all">Continentes</option>
						<option value="Africa">África</option>
						<option value="America">Américas</option>
						<option value="Asia">Asia</option>
						<option value="Europe">Europa</option>
						<option value="Oceania">Oceania</option>
						<option value="Antarctic">Antártica</option>
					</select>
					<div className="titi">
						<button
							className="barr2"
							onClick={e => {
								hanleClick(e);
							}}
						>
							Recargar Paises
						</button>
						<div>
							<Buscador setCurrentPage={setCurrentPage} />
						</div>
					</div>
				</div>
			</div>

			<div className="container-app-cont">
				<div className="container grid">
					{currentCountri.length ? (
						currentCountri.map(e => {
							return (
								<div key={e.id}>
									<Card
										capital={e.capital}
										id={e.id}
										name={e.name}
										continents={e.continents}
										image={e.flag}
									/>
								</div>
							);
						})
					) : (
						<div className="gif">
							<img
								src={travellingTheWorld}
								width="500px"
								height="500px"
								alt="travelling the world"
							/>
							<p>Loading...</p>
						</div>
					)}
				</div>

				<div className="barr3">
					<Pages
						countriPerPage={countriPerPage}
						allCountry={allCountry.length}
						paginado={paginado}
					/>
					<br />
				</div>
			</div>
		</div>
	);
};
export default Home;
