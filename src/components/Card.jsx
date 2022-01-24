import './Card.css'

const Card = ({card, hidden=false}) => {
  return (
    <div id="cardContainer">
      {hidden && <div className={hidden ? 'hiddenBackground':''}></div>}
      <img src={card.img} alt={card.name} />
    </div>
  )
}

export default Card