import Card from './Card'

import './Hand.css'

const Hand = ({ player, name, isDealer, value }) => {
	const loadTitle = () => {
		return (
			<div id='title'>
				<span id='playerName'>{name}</span>
				<div className='fish red'>
					<div>{value}</div>
				</div>
			</div>
		)
	}

	return (
		<div id='hand'>
			{name !== 'Dealer' && loadTitle()}
			<div id='handCards'>
				{player.map((elem, i) => (
					<Card
						key={Math.random() + 1}
						hidden={isDealer && i !== player.length - 1}
						card={elem}
					/>
				))}
			</div>
			{name === 'Dealer' && loadTitle()}
		</div>
	)
}

export default Hand
