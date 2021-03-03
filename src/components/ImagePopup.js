function ImagePopup(props) {
  return (
    <section className={props.card ? "popup popup_image popup_opened" : "popup popup_image"}>
      <div className="popup__container">
        <div className="popup__image-block">
          <img className="popup__picture" src={props.card.link} alt={props.card.name} />
          <p className="popup__picture-name">{props.card.name}</p>
        </div>
        <button type="button" className="popup__close-button popup__close-button_image" onClick={props.onClose}></button>
      </div>
    </section>
  )
}

export default ImagePopup;