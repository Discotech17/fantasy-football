import React, { useState } from 'react'

function Standings() {
	const data = [
		{
			key: 1,
			name: 'Cody',
			record: {
				wins: 4,
				losses: 2,
			},
			teamName: 'Team Cody',
			division: 'East',
		},
		{
			key: 2,
			name: 'Jeff',
			record: {
				wins: 3,
				losses: 2,
			},
			teamName: 'Team Jeff',
			division: 'West',
		},
		{
			key: 3,
			name: 'Matt',
			record: {
				wins: 5,
				losses: 1,
			},
			teamName: 'Team Matt',
			division: 'East',
		},
		{
			key: 4,
			name: 'Gavin',
			record: {
				wins: 3,
				losses: 5,
			},
			teamName: 'Team Gavin',
			division: 'West',
		},
	]

	const [division, setDivision] = useState(true)
	const [editing, setEditing] = useState(false)
	const [wins, setWins] = useState('')
	const [win, setWin] = useState()
	const [lose, setLose] = useState()
	const [losses, setLosses] = useState([])

	const eastDivision = []
		.concat(data)
		.filter((item) => item.division === 'East')
		.sort((a, b) => (a.record.wins < b.record.wins ? 1 : -1))

	const westDivision = []
		.concat(data)
		.filter((item) => item.division === 'West')
		.sort((a, b) => (a.record.wins < b.record.wins ? 1 : -1))
		.sort((a, b) => (a.record.losses > b.record.losses ? 1 : -1))

	function editEastStandings() {
		setEditing(true)
	}

	function submitEastStandings() {
		console.log(wins, losses)
		setEditing(false)
	}

	return (
		<div className="standingsContainer">
			{division ? (
				<div className="standingsBoardEast">
					<div className="trianglePage" />
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					{editing ? (
						<div className="standingsUpdate">
							<button
								style={{
									backgroundColor: 'lightblue',
									width: '100%',
									outline: 'none',
									border: 'none',
								}}
								onClick={() => submitEastStandings()}
							>
								Submit
							</button>
						</div>
					) : (
						<div className="editStandings">
							<button
								style={{
									backgroundColor: 'transparent',
									width: '100%',
									outline: 'none',
									border: 'none',
								}}
								onClick={() => editEastStandings()}
							/>
						</div>
					)}
					<div
						className="divisionSwap"
						onClick={editing ? null : () => setDivision(!division)}
					>
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
									<p>{item.teamName}</p>
								))}
							</div>
							{editing ? (
								<div className="standingsRecords">
									{eastDivision.map((item) => (
										<>
											<div className="standingsRecordsInput">
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.wins}
													value={win}
													onChange={(wins) => setWins(wins)}
												/>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.losses}
													value={lose}
													onChange={(losses) => setLosses(losses)}
												/>
											</div>
										</>
									))}
								</div>
							) : (
								<div className="standingsRecords">
									{eastDivision.map((item) => (
										<p>
											{item.record.wins}-{item.record.losses}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="standingsBoardWest">
					<div className="trianglePage" />
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					<div
						className="divisionSwap"
						onClick={editing ? null : () => setDivision(!division)}
					>
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
									<p>{item.teamName}</p>
								))}
							</div>
							<div className="standingsRecords">
								{westDivision.map((item) => (
									<p>
										{item.record.wins}-{item.record.losses}
									</p>
								))}
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Standings
