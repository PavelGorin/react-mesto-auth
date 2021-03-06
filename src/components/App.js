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
import { Route, Switch, useHistory } from "react-router-dom";
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = useState(false)
  const [loggedIn, setLoggedIn] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(false)
  const [registerState, setRegisterState] = useState(false);
  const [userName, setUsername] = useState('')
  const history = useHistory();


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleSetRegisterState() {
    setRegisterState(!registerState);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
    setIsInfoTooltipOpened(false);
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

  function handleRegister(data) {
    api.registration(data)
      .then((res) => {
        if (res.data) {
          setIsInfoTooltipOpened(true);
          setRegisterStatus(true);
          history.push('/sign-in');
          setRegisterState(false);
        } else {
          setIsInfoTooltipOpened(true);
          setRegisterStatus(false);
          setRegisterState(true);
        }

      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleLogin(data) {
    api.login(data)
      .then((res) => {
        console.log(data)
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setUsername(data.email);
          history.push('/');

        } else {
          setLoggedIn(false);
          setIsInfoTooltipOpened(true);
          setRegisterStatus(false);
          setRegisterState(false);
        }
      })

      .catch((err) => {
        console.log(err);
      })
  }

  function handleLogout() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  }

  function handleTokenCheck(jwt) {
    api.checkToken(jwt)
      .then((res) => {
        setUsername(res.data.email)
        if (res) {
          setLoggedIn(true);
          history.push('/');
        }
      })

  }

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      handleTokenCheck(jwt);

    }
  }, []);

  return (
    <div className="noclassyet">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userName={userName} handleLogout={handleLogout} handleRegisterState={handleSetRegisterState} registerState={registerState} state={loggedIn} />

        <Switch>
          <ProtectedRoute exact path='/' component={Main} loggedIn={loggedIn} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />

          <Route path='/sign-up'>
            <Register handleRegister={handleRegister} />
          </Route>
          <Route path='/sign-in'>
            <Login handleLogin={handleLogin} />
          </Route>
        </Switch>

        <Footer />
        <InfoTooltip state={registerStatus} isOpened={isInfoTooltipOpened} onClose={closeAllPopups} />
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
