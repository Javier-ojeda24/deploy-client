import React from "react";
import { Link, useHistory } from "react-router-dom";
import { getCountry, postActivity } from "../../redux/action/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Actividades/Actividad.css";

function validate(input) {
	let errors = {};
	if (!input.name || input.name.length < 3) {
		errors.name = "Se requiere que ingrese un nombre para la actividad";
	} else if (!input.difficulty) {
		errors.difficulty =
			"Se requiere que ingrese una dificultad para la actividad";
	} else if (!input.duration) {
		errors.duration = "Se requiere que ingrese una duración para la actividad";
	} else if (!input.season) {
		errors.season = "Se requiere que ingrese una estación para la actividad";
	} else if (!input.countries) {
		errors.countries = "Se requiere que ingrese un pais para la actividad";
	}
	return errors;
}

export default function CreatedActivity() {
	const dispatch = useDispatch();
	const history = useHistory();
	const countries = useSelector(state => state.countries);
	const [errors, setErrors] = useState({});
	const [input, setInput] = useState({
		name: "",
		difficulty: "",
		duration: "",
		season: "",
		countries: [],
	});

	useEffect(() => {
		dispatch(getCountry());
	}, [dispatch]);

	function handleDelete(e) {
		setInput({
			...input,
			countries: input.countries.filter(countries => countries !== e), // me devuelve el estado nuevo, que es un array, sin el elemento que clickee
		});
	}

	function handleChange(e) {
		//cada vez que se ejecuta handlechange, al estado input,
		setInput({
			//ademas de lo que tiene, se le agrega el target.value
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
		// console.log(input);
	}

	function handleSelect(e) {
		if (!input.countries.includes(e.target.value)) {
			// cuando mando el country, traigo lo que ya habia en el estado y le concateno el target value
			setInput({
				...input,
				countries: [...input.countries, e.target.value],
			});
		}
	}

	function handleSubmit(e) {
		// console.log(errors);
		e.preventDefault();
		setErrors(validate(input));
		const errorCompletarFormu = validate(input);
		if (Object.values(errorCompletarFormu).length !== 0 || !input.countries) {
			alert("Todos los campos deben ser requeridos");
		} else {
			dispatch(postActivity(input));
			alert("Actividad creada con éxito");
			setInput({
				name: "",
				difficulty: "",
				duration: "",
				season: "",
				countries: [],
			});
			history.push("/home");
		}
	}

	return (
		<div className="form-contain">
			<div className="btn-volver">
				<Link to="/home">
					{" "}
					<button> Volver </button>
				</Link>
			</div>

			<div>
				<h1 className="crear-titulo"> Crea tus Actividades </h1>
			</div>

			<form onSubmit={e => handleSubmit(e)} className="formulario">
				<div>
					<label htmlFor="">Nombre de la actividad</label>
					<input
						type="text"
						value={input.name}
						name="name"
						autocomplete="off"
						onChange={e => handleChange(e)}
					/>
					{errors.name && <p className="error">{errors.name}</p>}
					<label className="display-block">Dificultad</label>
					<select
						name="difficulty"
						value={input.difficulty}
						className=""
						onChange={e => handleChange(e)}
					>
						<option value="">Selecciona la dificultad</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						{errors.difficulty && <p className="error">{errors.difficulty}</p>}
					</select>
				</div>
				<div>
					<label className="display-block">Ingresar tiempo de duración</label>
					<input
						type="number"
						value={input.duration}
						name="duration"
						autocomplete="off"
						min="0"
						onChange={e => handleChange(e)}
					/>
					{errors.duration && <p className="error">{errors.duration}</p>}
				</div>
				<div>
					<label className="display-block">Estación del año</label>
					<select
						value={input.season}
						name="season"
						onChange={e => handleChange(e)}
					>
						<option value="">Selecciona la estación</option>
						<option value="Summer">Verano</option>
						<option value="Autumn">Otoño</option>
						<option value="Winter">Invierno</option>
						<option value="Spring">Primavera</option>
						{errors.season && <p className="error">{errors.season}</p>}
					</select>
				</div>
				<div>
					<label className="display-block">País</label>
					<select onChange={e => handleSelect(e)}>
						{countries.map(countries => (
							<option value={countries.name}>{countries.name}</option>
						))}
					</select>
				</div>

				<button className="submit-button" type="submit">
					Crear actividad
				</button>
			</form>
			{input.countries.map(e => (
				<div className="country-added">
					<p>{e}</p>
					<button className="botonX" onClick={() => handleDelete(e)}>
						X
					</button>
				</div>
			))}
		</div>
	);
}
