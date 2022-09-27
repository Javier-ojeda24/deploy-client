import React from "react";
import { Link } from "react-router-dom";
import "../LandigPage/LandingPage.css"

export const LandingPage = () => {
	return (
		<header  >
        <div className='texto' >
            <h1>Urban</h1>
            <p>Proyecto Individual</p>
            <Link to ='/home'>
                <button>Ingresar</button>
            </Link>
        </div>
        </header>
	);
};
