import { useState, useEffect } from 'react'
import Card from './Card'

import './Hand.css'

const Hand = ({ player, name, isDealer, value }) => {
	// internal player value
	const [handPlayer, setHand] = useState(player)
	const [handValue, setValue] = useState(0)

	// update component variable on prop change
	useEffect(() => {
		setHand(player)
	}, [player])
	useEffect(() => {
		setValue(value)
	}, [value])

	const loadTitle = () => {
		return (
			<div id='title'>
				<span id='playerName'>{name}</span>
				<div className='pokerchip'>{handValue}</div>
			</div>
		)
	}

	return (
		<div id='hand'>
			{name !== 'Dealer' && loadTitle()}
			<div id='handCards'>
				{handPlayer.map((elem, i) => (
					<Card
						key={Math.random() + 1}
						hidden={isDealer && i !== handPlayer.length - 1}
						card={elem}
					/>
				))}
			</div>
			{name === 'Dealer' && loadTitle()}
		</div>
	)
}

export default Hand
