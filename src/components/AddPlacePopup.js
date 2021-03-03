import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const [name, setName] = useState('');
  const [link, setLink] = useState('');


  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace(name, link);
    onClose();
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm title="Новое место" name="new-place" submit="Создать" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__place" name="name" id="add-name" type="text" placeholder="Название"
        required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
      <span className="popup__input-error" id="add-name-error"></span>
      <input className="popup__input popup__link" name="link" id="add-url" placeholder="Ссылка на картинку" required
        type="url" value={link} onChange={handleChangeLink} />
      <span className="popup__input-error" id="add-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;