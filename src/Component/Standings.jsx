import React, { useState, useEffect } from 'react'

function Standings() {
	const [data, setData] = useState([
		{
			key: 0,
			name: 'Cody',
			record: {
				wins: 4,
				losses: 2,
			},
			teamName: 'Team Cody',
			division: 'East',
		},
		{
			key: 1,
			name: 'Jeff',
			record: {
				wins: 3,
				losses: 2,
			},
			teamName: 'Team Jeff',
			division: 'West',
		},
		{
			key: 2,
			name: 'Matt',
			record: {
				wins: 5,
				losses: 1,
			},
			teamName: 'Team Matt',
			division: 'East',
		},
		{
			key: 3,
			name: 'Gavin',
			record: {
				wins: 3,
				losses: 5,
			},
			teamName: 'Team Gavin',
			division: 'West',
		},
	])

	const [division, setDivision] = useState(true)
	const [editing, setEditing] = useState(false)
	var win
	var lose

	const eastDivision = []
		.concat(data)
		.filter((item) => item.division === 'East')
		.sort((a, b) =>
			a.record.wins >= b.record.wins && a.record.losses <= b.record.losses
				? -1
				: 1
		)

	const westDivision = []
		.concat(data)
		.filter((item) => item.division === 'West')
		.sort((a, b) =>
			a.record.wins >= b.record.wins && a.record.losses <= b.record.losses
				? -1
				: 1
		)

	function editStandings(e) {
		e.preventDefault()
		setEditing(true)
	}

	function submitStandings(e, item, win, lose) {
		e.preventDefault()
		const newData = [...data]
		newData.splice(item.key, 1, item)
		console.log(newData)
		setData(newData)
		setEditing(false)
	}

	function updateRecord(item, number, winLose) {
		const newData = [...data]
		console.log(item)
		let person = data.find((obj) => obj.name === item.name)
		winLose ? (person.record.wins = number) : (person.record.losses = number)
		newData.splice(person.key, 1, person)
	}

	return (
		<div className="standingsContainer">
			{division ? (
				<div className="standingsBoard">
					<div
						className="trianglePage"
						onClick={editing ? null : () => setDivision(!division)}
					/>
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					{editing ? (
						<div className="standingsUpdate">
							<button
								form="record"
								type="submit"
								style={{
									backgroundColor: 'lightblue',
									width: '100%',
									outline: 'none',
									border: 'none',
								}}
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
								onClick={(e) => editStandings(e)}
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
								{eastDivision.map((item, index) => (
									<p key={index}>{item.teamName}</p>
								))}
							</div>
							{editing ? (
								<div className="standingsRecords">
									{eastDivision.map((item, index) => (
										<>
											<form
												id="record"
												onSubmit={(e) => submitStandings(e, item, win, lose)}
												className="standingsRecordsInput"
											>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.wins}
													key={index}
													value={win}
													onChange={(win) =>
														updateRecord(item, win.target.value, true)
													}
												/>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.losses}
													key={index}
													value={lose}
													onChange={(lose) =>
														updateRecord(item, lose.target.value, false)
													}
												/>
											</form>
										</>
									))}
								</div>
							) : (
								<div className="standingsRecords">
									{eastDivision.map((item, index) => (
										<p key={index}>
											{item.record.wins}-{item.record.losses}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			) : (
				<div className="standingsBoard">
					<div
						className="trianglePage"
						onClick={editing ? null : () => setDivision(!division)}
					/>
					<div className="standingsTitle">
						<h1>Standings</h1>
					</div>
					{editing ? (
						<div className="standingsUpdate">
							<button
								form="record"
								type="submit"
								style={{
									backgroundColor: 'lightblue',
									width: '100%',
									outline: 'none',
									border: 'none',
								}}
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
								onClick={(e) => editStandings(e)}
							/>
						</div>
					)}
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
								{westDivision.map((item, index) => (
									<p key={index}>{item.teamName}</p>
								))}
							</div>
							{editing ? (
								<div className="standingsRecords">
									{westDivision.map((item, index) => (
										<>
											<form
												id="record"
												onSubmit={(e) => submitStandings(e, item, win, lose)}
												className="standingsRecordsInput"
											>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.wins}
													value={win}
													key={index}
													onChange={(win) =>
														updateRecord(item, win.target.value, true)
													}
												/>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.losses}
													key={index}
													value={lose}
													onChange={(lose) =>
														updateRecord(item, lose.target.value, false)
													}
												/>
											</form>
										</>
									))}
								</div>
							) : (
								<div className="standingsRecords">
									{westDivision.map((item, index) => (
										<p key={index}>
											{item.record.wins}-{item.record.losses}
										</p>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Standings
