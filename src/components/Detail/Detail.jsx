import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetails, getCountryDetails } from "../../redux/action/index";
import { useEffect } from "react";
import ActivityCards from "../ActivityCards/ActivityCards.jsx";
import travellingTheWorld from "../imagenes/travellingTheWorld.gif";
import "../Detail/Detail.css";

export function Detail({ id }) {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getCountryDetails(id));
	}, [dispatch]);
	useEffect(() => {
		dispatch(cleanDetails());
	}, [dispatch]);

	const myCountries = useSelector(state => state.details);
	const numberWithDot = x => {
		if (typeof x === "number") {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
		}
	};

	return myCountries && myCountries.id ? (
		<div>
			<h1 className="title-content">Detalles del pais</h1>
			<div className="container-detail" key={myCountries.id}>
				<div className="tarjeta">
					<div className="tarjeta-image">
						<img
							src={myCountries.flag}
							alt={myCountries.name}
							width="500px"
							height="320px"
						></img>
					</div>
					<div className="tarjeta-text">
						<h3>Pais: {myCountries.name}</h3>
						<h2>Continente: {myCountries.continents}</h2>
						<h2>Capital: {myCountries.capital}</h2>
						<h2>Subregion: {myCountries.subregion}</h2>
						<h2>Area: {numberWithDot(myCountries.area)} km²</h2>
						<h2>
							Poblacion: {numberWithDot(myCountries.population)}habitantes{" "}
						</h2>
					</div>
				</div>

				<div className="bar">
					<Link to={"/home"}>
						<button className="btn">Volver</button>
					</Link>
				</div>
			</div>
			<div className="card-atv">
				{myCountries.activities.map(el => {
					return (
						<div>
							<ActivityCards
								key={el.id}
								name={el.name}
								temporada={el.season}
								duracion={el.duration}
								dificultad={el.difficulty}
							/>
						</div>
					);
				})}
			</div>
		</div>
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
	);
}
