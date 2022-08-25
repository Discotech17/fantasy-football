import { Champ, Standings, History } from './Component'
import React, { useState } from 'react'
import './App.css'

function App() {
	const [theme, setTheme] = useState('light')

	function switchTheme() {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		document.body.style.backgroundColor =
			newTheme === 'light' ? 'white' : '#2a2a2a'
		setTheme(newTheme)
	}

	return (
		<div className="appContainer" data-theme={theme}>
			<div className="appContainerTwo">
				<section className="section champ">
					<label htmlFor="toggleTheme" className="toggler">
						<input
							onClick={() => switchTheme()}
							type="checkbox"
							id="toggleTheme"
						/>
						<span className="ball" />
						<i className="light" />
						<i className="dark" />
					</label>
					<Champ />
				</section>
				<section className="section standings">
					<Standings />
				</section>
				<section className="section history">
					<History />
				</section>
			</div>
		</div>
	)
}

export default App
