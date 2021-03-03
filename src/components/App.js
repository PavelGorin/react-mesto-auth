import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState, useEffect } from "react";
import api from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import '../index.css';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleCardClick(props) {
    setSelectedCard(props);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => { console.log(err) });
  }

  function handleAddPlaceSubmit(name, link) {
    api.sendNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);

      })
      .catch((err) => { console.log(err) });
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([user, initialCards]) => {
        setCurrentUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (!isLiked) {
      api.setLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
        .catch((err) => { console.log(err) });
    } else {
      api.removeLike(card._id).then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
        .catch((err) => { console.log(err) });
    }

  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  return (
    <div className="noclassyet">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        <PopupWithForm title="Вы уверены?" name="del-card" submit="Да">
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
      </CurrentUserContext.Provider>
    </div>
  );
}


export default App;
