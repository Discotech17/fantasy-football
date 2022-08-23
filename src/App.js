import { Champ, Standings, History } from './Component'
import './App.css'

function App() {
	return (
		<div className="appContainer">
			<section className="section champ">
				<Champ />
			</section>
			<section className="section standings">
				<Standings />
			</section>
			<section className="section history">
				<History />
			</section>
		</div>
	)
}

export default App
