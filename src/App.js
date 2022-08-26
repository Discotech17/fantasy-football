import { Champ, Standings, History, TeamNames } from './Component'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState } from 'react'
import './App.css'

function App() {
	return (
		<div className="appContainer">
			<div className="appContainerTwo">
				<section className="section champ">
					<Champ />
				</section>
				<section className="section standings">
					<Standings />
				</section>
				<section className="section history">
					<History />
				</section>
				<section className="section teamNames">
					<TeamNames />
				</section>
			</div>
		</div>
	)
}

export default App
