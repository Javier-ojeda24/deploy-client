import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

export const Card = ({ name, image, continents, id }) => {
	return (
		<div className="card">
			<div className="face front">
				<img src={image} alt="imagen no encontrada" />
				<h3>{name}</h3>
			</div>
			<div className="face back">
				<h3>{name}</h3>
				<h5>{continents}</h5>
				<div className="link">
					<Link className="color" to={`/home/${id}`}>
						{id}
					</Link>
				</div>
			</div>
		</div>
	);
};
