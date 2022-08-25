import React, { useState, useEffect } from 'react'
import startFireBase from '../firebase.js'
import { ref, onValue, update } from 'firebase/database'

const db = startFireBase()

function Standings() {
	const [tableData, setTableData] = useState([])

	useEffect(() => {
		const dbRef = ref(db, '/')

		onValue(dbRef, (snapshot) => {
			let dataRecords = []
			snapshot.forEach((childSnapshot) => {
				let data = childSnapshot.val()
				dataRecords.push(data)
			})
			setTableData(dataRecords)
		})
	}, [])

	const [division, setDivision] = useState(true)
	const [editing, setEditing] = useState(false)
	var win
	var lose

	const eastDivision = []
		.concat(tableData)
		.filter((item) => item.division === 'East')
		.sort((a, b) =>
			a.record.wins >= b.record.wins && a.record.losses <= b.record.losses
				? -1
				: 1
		)

	const westDivision = []
		.concat(tableData)
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

		tableData.forEach((team) =>
			update(ref(db, `/${team.key}`), {
				record: {
					wins: team.record.wins,
					losses: team.record.losses,
				},
			})
		)
		setEditing(false)
	}

	function updateRecord(item, number, winLose) {
		const newData = [...tableData]
		let person = tableData.find((obj) => obj.key === item.key)
		winLose ? (person.record.wins = number) : (person.record.losses = number)
		newData.splice(person.key, 1, person)
	}

	return (
		<div className="standingsContainer">
			{division ? (
				<div className="standingsBoard">
					<div className="standingsTitle">Standings</div>
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
						className="trianglePage"
						onClick={editing ? null : () => setDivision(!division)}
					/>
					<div
						className="divisionSwap"
						onClick={editing ? null : () => setDivision(!division)}
					>
						<div className="standingsDivision">
							<h2 className="standingsDivisionText">East</h2>
						</div>
						<div className="standingsRecordHeader">
							<h3 className="standingsRecordHeader">Team</h3>
							<h3 className="standingsRecordHeader">Record</h3>
						</div>
						<div className="standingRecordContainer">
							<div className="standingsTeams">
								{eastDivision.map((item) => (
									<p key={item.key}>{item.teamName}</p>
								))}
							</div>
							{editing ? (
								<div className="standingsRecords">
									{eastDivision.map((item) => (
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
													key={item.teamName}
													onChange={(win) =>
														updateRecord(item, win.target.value, true)
													}
												/>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.losses}
													value={lose}
													key={item.name}
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
									{eastDivision.map((item) => (
										<p key={item.key}>
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
					<div className="standingsTitle">Standings</div>
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
						className="trianglePage"
						onClick={editing ? null : () => setDivision(!division)}
					/>
					<div
						className="divisionSwap"
						onClick={editing ? null : () => setDivision(!division)}
					>
						<div className="standingsDivision">
							<h2 className="standingsDivisionText">West</h2>
						</div>
						<div className="standingsRecordHeader">
							<h3 className="standingsRecordHeader">Team</h3>
							<h3 className="standingsRecordHeader">Record</h3>
						</div>
						<div className="standingRecordContainer">
							<div className="standingsTeams">
								{westDivision.map((item) => (
									<p key={item.key}>{item.teamName}</p>
								))}
							</div>
							{editing ? (
								<div className="standingsRecords">
									{westDivision.map((item) => (
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
													key={item.key}
													onChange={(win) =>
														updateRecord(item, win.target.value, true)
													}
												/>
												<input
													type="text"
													style={{ width: '25px' }}
													defaultValue={item.record.losses}
													value={lose}
													key={item.key}
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
									{westDivision.map((item) => (
										<p key={item.key}>
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
