import success from '../images/success.png';
import failed from '../images/failed.png'

function InfoTooltip(props) {

  return (
    <section className={`popup popup_auth ${props.isOpened && 'popup_opened'}`}>
      <div className="popup__container">
        <div className="popup__auth-block">
          <img className="popup__auth-img" src={props.state ? success : failed} alt='' />
          <p className="popup__title popup__title_black">{props.state ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
        </div>
        <button type="button" className="popup__close-button popup__close-button_image" onClick={props.onClose}></button>
      </div>
    </section>
  )
}
export default InfoTooltip;