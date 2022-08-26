import React, { useState, useEffect } from 'react'
import startFireBase from '../firebase.js'
import { ref, onValue, update } from 'firebase/database'

const db = startFireBase()

function TeamNames() {
	const [data, setData] = useState([])

	useEffect(() => {
		const dbRef = ref(db, '/teamNames')

		onValue(dbRef, (snapshot) => {
			let dataRecords = []
			snapshot.forEach((childSnapshot) => {
				let name = childSnapshot.val()
				dataRecords.push(name)
			})
			setData(dataRecords)
		})
	}, [])

	function submitVote(e, item) {
		e.preventDefault()
		item.votes++

		update(ref(db, `/teamNames/${item.key}`), {
			votes: item.votes,
		})
	}

	const teamNames = []
		.concat(data)
		.sort((a, b) => (a.votes <= b.votes ? 1 : -1))

	return (
		<div className="teamNameContainer">
			<div className="teamNameVoteTitle">
				Vote for your favorite name. Scroll down for more.
			</div>
			<div className="teamNameVoteContainer">
				{teamNames.map((item) => (
					<>
						<div className="teamName" onClick={(e) => submitVote(e, item)}>
							{item.name}
						</div>
					</>
				))}
			</div>
		</div>
	)
}

export default TeamNames
