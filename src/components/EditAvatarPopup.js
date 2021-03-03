import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup( { isOpen, onClose, onUpdateAvatar }) {

  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" submit="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
    <input ref={inputRef} className="popup__input popup__avatar-link" type="url" name="avatar" placeholder="Ссылка на avatar"
      id="avatar-url" required minLength="2" />
    <span className="popup__input-error" id="avatar-url-error"></span>
  </PopupWithForm>
  );
}

export default EditAvatarPopup;