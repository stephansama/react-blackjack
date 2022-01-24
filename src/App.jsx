import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'

import Data from './CardData'
import Hand from './components/Hand'

import './App.css'

Modal.setAppElement('#root')

const App = () => {
	const [deck, setDeck] = useState([...Data].sort(() => Math.random() - 0.5))
	const [player, setPlayer] = useState([])
	const [dealer, setDealer] = useState([])
	const [playerVal, setPlayerVal] = useState([])
	const [dealerVal, setDealerVal] = useState([])
	const [modalOpen, setModalOpen] = useState(false)
	const [hideDealer, setHideDealer] = useState(false)

	console.log(React)

	// pull a card from the deck and return a new deck and the pulled cards
	const pullCard = (funcDeck = deck, numOfCards = 1) => {
		const [tempPlayer, tempDeck] = [[], funcDeck]
		for (let i = 0; i < numOfCards; i++) tempPlayer.push(tempDeck.shift())
		return [tempPlayer, tempDeck]
	}

	// calculate the value of a player based on their cards
	const calculateValue = (player) => {
		let pVal = 0
		player.forEach((elem) => (pVal += elem.value))
		return pVal
	}

	// open Modal
	const openModal = () => {
		setModalOpen(true)
	}
	const closeModal = () => {
		setModalOpen(false)
	}

	const checkWinConditions = (funcDealerVal = dealerVal) => {
		if (funcDealerVal > 21) {
			alert('You have won')
			return true
		}
		if (playerVal > 21 || funcDealerVal === 21) {
			alert('You have lost sir')
			return false
		}
		if (21 - funcDealerVal <= 21 - playerVal) {
			return false
		}
		return true
	}

	const onHit = (e) => {
		e.preventDefault()
		const [newPlayerCards, newDeck] = pullCard()
		setDeck(newDeck)
		setPlayer((oldPlayer) => [...oldPlayer, ...newPlayerCards])
	}

	const onStand = (e) => {
		let newVal,
			copyDeck = deck,
			copyDealer = dealer
		setDealerVal((newVal = calculateValue(dealer)))
		while (newVal < 21 && 21 - newVal > 7) {
			const [newCards, newDeck] = pullCard(copyDeck)
			copyDeck = newDeck
			copyDealer = [...dealer, ...newCards]
			setDealer(copyDealer)
			setDealerVal((newVal = calculateValue(copyDealer)))
		}
		setHideDealer(true)
	}

	const resetGame = () => {
		let tempDeck = [...Data].sort(() => Math.random() - 0.5)
		const [newPlayer, newDeck] = pullCard(tempDeck, 2)
		const [newDealer, newDeck2] = pullCard(newDeck, 2)

		setDeck(newDeck2)
		setPlayer(newPlayer)
		setDealer(newDealer)
		setHideDealer(false)
		setDealerVal(calculateValue([...newDealer].slice(1)))
	}

	//== useEffects ==//
	// start the game on load
	useEffect(() => resetGame(), [])
	// update player values
	useEffect(() => checkWinConditions(), [playerVal])
	useEffect(() => setPlayerVal(calculateValue(player)), [player])

	//== JSX ==//
	return (
		<div id='main'>
			<Modal isOpen={modalOpen} onRequestClose={closeModal}>
				<h4>TestModalHere</h4>
				<button onClick={closeModal}>Close</button>
			</Modal>
			<Hand
				name='Dealer'
				player={dealer}
				value={dealerVal}
				isDealer={!hideDealer}
			/>
			<div id='controls'>
				<button onClick={resetGame}>Reset Game</button>
				<button onClick={onHit}>Hit Card</button>
				<button onClick={onStand}>Stand</button>
			</div>
			<Hand name='Player' player={player} value={playerVal} />
		</div>
	)
}

export default App
