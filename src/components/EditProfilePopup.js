import {useState} from 'react';
import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { isOpen, onClose } = props;



  function handleChangeName(e){
    setName(e.target.value)
}
function handleChangeDescription(e){
    setDescription(e.target.value)
}


  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <>
      <PopupWithForm title="Редактировать профиль" name="profile" submit="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
        <input className="popup__input popup__name" id="edit-title" name="title" type="text" placeholder="Имя" required
          minLength="2" maxLength="40" value={name || ''} onChange={handleChangeName}/>
        <span className="popup__input-error" id="edit-title-error"></span>
        <input className="popup__input popup__profession" id="edit-subtitle" name="subtitle" type="text"
          placeholder="Вид деятельности" required minLength="2" maxLength="200" value={description || ''} onChange={handleChangeDescription} />
        <span className="popup__input-error" id="edit-subtitle-error"></span>
      </PopupWithForm>
    </>
  )
}

export default EditProfilePopup;