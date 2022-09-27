import axios from "axios";
export function getCountry() {
	return async function (dispatch) {
		let json = await axios("https://deploy-javi22.herokuapp.com/countries");
		return dispatch({
			type: "GET_COUNTRIES",
			payload: json.data,
		});
	};
}

export function getCountryName(name) {
	return async function (dispatch) {
		let json = await axios.get(`https://deploy-javi22.herokuapp.com/countries?name=${name}`);
		return dispatch({
			type: "GET_COUNTRY-NAME",
			payload: json.data,
		});
	};
}

export function filterContinente(payload) {
	return {
		type: "FILTER_BY_CONTINENT",
		payload,
	};
}

export function orderByName(payload) {
	return {
		type: "ORDER_BY_NAME",
		payload,
	};
}
export function filterCountryByPopulation(payload) {
	return {
		type: "FILTER_BY_POPULATION",
		payload,
	};
}

export function getCountryDetails(id) {
	return async function (dispatch) {
		try {
			var json = await axios.get("https://deploy-javi22.herokuapp.com/countries/" + id);
			return dispatch({
				type: "GET_COUNTRY_DETAILS",
				payload: json.data,
			});
		} catch (error) {
			console.log(error);
		}
	};
}
export function cleanDetails() {
	return {
		type: "CLEAN_DETAILS",
	};
}
export function postActivity(payload) {
	return async function () {
		const response = await axios.post(
			"https://deploy-javi22.herokuapp.com/activities",
			payload
		);
		return response;
	};
}

export function getActivities() {
	return async function (dispatch) {
		var info = await axios.get("https://deploy-javi22.herokuapp.com/activities");

		return dispatch({
			type: "GET_ACTIVITIES",
			payload: info.data,
		});
	};
}

export function filterCreated(payload) {
	return {
		type: "FILTER_CREATED",
		payload,
	};
}
