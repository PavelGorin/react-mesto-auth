function PopupWithForm(props) {

  const {name, isOpen, title, children, submit, onClose, onSubmit} = props;

  return (
    <section className={isOpen ? `popup_opened popup popup_${name}` : `popup popup_${name}`}>
      <form action="#" className={`popup__container popup__container_${name}`} name={`${name}`} noValidate onSubmit={onSubmit}>
        <div className="popup__blank">
          <p className="popup__title">{title}</p>
          {children}
          <button className={`popup__save-button popup__save-button_${name}`} type="submit">{submit}</button>
        </div>
        <button type="button" className={`popup__close-button popup__close-button_${name}`} onClick={onClose}></button>
      </form>
    </section>
  )
}

export default PopupWithForm;