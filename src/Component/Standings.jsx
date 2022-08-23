import React, { useState } from 'react'

function Standings() {
	const data = require('../fantasy.json')

	const [division, setDivision] = useState(true)

	const eastDivision = []
		.concat(data)
		.filter((item) => item.division === 'East')
		.sort((a, b) => (a.record.wins < b.record.wins ? 1 : -1))

	const westDivision = []
		.concat(data)
		.filter((item) => item.division === 'West')
		.sort((a, b) => (a.record.wins < b.record.wins ? 1 : -1))
		.sort((a, b) => (a.record.losses > b.record.losses ? 1 : -1))

	return (
		<div className="standingsContainer" onClick={() => setDivision(!division)}>
			{division ? (
				<div className="standingsBoardEast">
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					<div className="standingsDivision">
						<h2>East</h2>
					</div>
					<div className="standingsRecordHeader">
						<h3>Team</h3>
						<h3>Record</h3>
					</div>
					<div className="standingRecordContainer">
						<div className="standingsTeams">
							{eastDivision.map((item) => (
								<p style={{ 'margin-top': '25px' }}>{item.name}</p>
							))}
						</div>
						<div className="standingsRecords">
							{eastDivision.map((item) => (
								<p style={{ 'margin-top': '25px' }}>
									{item.record.wins}-{item.record.losses}
								</p>
							))}
						</div>
					</div>
				</div>
			) : (
				<div className="standingsBoardWest">
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					<div className="standingsDivision">
						<h2>West</h2>
					</div>
					<div className="standingsRecordHeader">
						<h3>Team</h3>
						<h3>Record</h3>
					</div>
					<div className="standingRecordContainer">
						<div className="standingsTeams">
							{westDivision.map((item) => (
								<p style={{ 'margin-top': '25px' }}>{item.name}</p>
							))}
						</div>
						<div className="standingsRecords">
							{westDivision.map((item) => (
								<p style={{ 'margin-top': '25px' }}>
									{item.record.wins}-{item.record.losses}
								</p>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Standings
