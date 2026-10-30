import './ContactBar.css';
import CallButton from '../CallButton/CallButton';
import WhatsAppBtn from '../WhatsAppBtn/WhatsAppBtn';

// En escritorio son dos botones flotantes; en celular, una barra fija abajo que no tapa el texto
export default function ContactBar() {
  return (
    <div className="contact-bar">
      <CallButton />
      <WhatsAppBtn />
    </div>
  );
}
