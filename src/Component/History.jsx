import React, { useState, useEffect } from 'react'
import startFireBase from '../firebase.js'
import { ref, onValue } from 'firebase/database'

const db = startFireBase()

function History() {
	const [data, setData] = useState([])
	const [isActive, setIsActive] = useState('')
	const [isMobile, setIsMobile] = useState()

	useEffect(() => {
		if (window.innerWidth < '600') {
			setIsMobile(true)
		} else {
			setIsMobile(false)
		}

		const dbRef = ref(db, '/history')

		onValue(dbRef, (snapshot) => {
			let records = []
			snapshot.forEach((childSnapshot) => {
				let season = childSnapshot.val()
				records.push(season)
			})
			setData(records)
		})
	}, [])

	function active(e) {
		if (e === isActive) {
			setIsActive()
		} else {
			setIsActive(e)
		}
	}

	const seasons = [].concat(data).sort((a, b) => (a.year < b.year ? 1 : -1))

	return (
		<>
			<div className="historyContainer">
				<div className="historyTitle">Historical Seasons</div>
				<div className="historySeasonContainer">
					<div className="historySeasonNumber">
						{seasons.map((item) => (
							<>
								<div
									className="season"
									index={item.year}
									onClick={() => active(item.year)}
								>
									<div className="seasonNumber">
										{item.year}
										<div className="seasonActive" index={item.year}>
											{isActive === item.year ? '-' : '+'}
										</div>
									</div>
								</div>
								{isActive === item.year ? (
									<div className="seasonInformation">
										{isMobile ? (
											<>
												<div className="champID">CHAMP</div>
												<div className="seasonChampContainer">
													<div className="champTeamName">
														{item.champ.teamName}
													</div>
													<div className="champSection">
														<div className="champRecord">
															{item.champ.record.wins}-
															{item.champ.record.losses}
														</div>
														<div className="historyChampName">
															{item.champ.name}
														</div>
													</div>
												</div>
												<div className="seasonSecondPlace">
													<div className="secondPlaceTeamName">
														{item.secondPlace.teamName}
													</div>
													<div className="secondPlaceSection">
														<div className="secondPlaceRecord">
															{item.secondPlace.record.wins}-
															{item.secondPlace.record.losses}
														</div>
														<div className="secondPlaceName">
															{item.secondPlace.name}
														</div>
													</div>
												</div>
												<div className="seasonThirdPlace">
													<div className="thirdPlaceTeamName">
														{item.thirdPlace.teamName}
													</div>
													<div className="thirdPlaceSection">
														<div className="thirdPlaceRecord">
															{item.thirdPlace.record.wins}-
															{item.thirdPlace.record.losses}
														</div>
														<div className="thirdPlaceName">
															{item.thirdPlace.name}
														</div>
													</div>
												</div>
											</>
										) : (
											<>
												<div className="champID">CHAMP</div>
												<div className="seasonChampContainer">
													<div className="champTeamName">
														{item.champ.teamName}
													</div>
													<div className="champSection">
														<div className="historyChampName">
															{item.champ.name}
														</div>
														<div className="champRecord">
															{item.champ.record.wins}-
															{item.champ.record.losses}
														</div>
													</div>
												</div>
												<div className="champID">CHAMP</div>
												<div className="seasonSecondPlace">
													<div className="secondPlaceTeamName">
														{item.secondPlace.teamName}
													</div>
													<div className="secondPlaceSection">
														<div className="secondPlaceName">
															{item.secondPlace.name}
														</div>
														<div className="secondPlaceRecord">
															{item.secondPlace.record.wins}-
															{item.secondPlace.record.losses}
														</div>
													</div>
												</div>
												<div className="seasonThirdPlace">
													<div className="thirdPlaceTeamName">
														{item.secondPlace.teamName}
													</div>
													<div className="thirdPlaceSection">
														<div className="thirdPlaceName">
															{item.secondPlace.name}
														</div>
														<div className="thirdPlaceRecord">
															{item.secondPlace.record.wins}-
															{item.secondPlace.record.losses}
														</div>
													</div>
												</div>
											</>
										)}
									</div>
								) : null}
							</>
						))}
					</div>
				</div>
			</div>
		</>
	)
}

export default History
