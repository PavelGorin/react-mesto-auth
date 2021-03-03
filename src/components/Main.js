import avataredit from '../images/profile__avatar-edit.svg';
import editbutton from '../images/profile__edit-button.svg';
import addbutton from '../images/profile__add-button.svg';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';
import {useContext} from 'react';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete, }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <>
      <div className="page">
        <section className="profile">
          <button className="profile__avatar-section" onClick={onEditAvatar}>
            <img src={avataredit} alt="иконка редактирования"
              className="profile__avatar-button" />
            <img className="profile__avatar" src={currentUser.avatar} alt="Аватар пользователя" />
          </button>
          <div className="profile__info">
            <p className="profile__name">{currentUser.name}</p>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}><img src={editbutton}
              alt="кнопка редактирования" /></button>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}><img src={addbutton}
            alt="кнопка добаления профайла" /></button>
        </section>

        <section className="elements">
          {cards.map((item) => {
            return (<Card key={item._id} card={item} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)
          })}
        </section>
      </div>
    </>
  )
}

export default Main;


