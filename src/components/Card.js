import trash from '../images/element__trash-bin.svg';
import like from '../images/element__like.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `element__trash-bin ${isOwn ? 'element__trash-bin_visible' : 'element__trash-bin_hidden'}`
  );
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? 'element__like_active' : ''
  }`;

  function handleClick() {
    onCardClick(card)
  }
  function handleLikeClick() {
    onCardLike(card)
  }
  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <div className="element" >
      <button className="element__picture"><img className="element__image" src={card.link} alt={card.name} onClick ={handleClick}/></button>
      <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}><img src={trash}
        alt="Мусорное ведро" /></button>
      <div className="element__info">
        <p className="element__name">{card.name}</p>
        <div className="element__like-box">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}>
            <img src={like} alt="лайк" />
          </button>
          <p className="element__number-of-likes">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )

}

export default Card;