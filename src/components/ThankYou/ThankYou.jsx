import { Link } from 'react-router-dom';
import './ThankYou.css';

export default function ThankYou() {
    return (
        <section className="thankyou">
            <h1 className="thankyou__title">Thank You!</h1>
            <div className="thankyou__divider"></div>
            <p className="thankyou__message">
                Your message has been successfully submitted. Our team will contact you
                as soon as possible to confirm your appointment.
            </p>
            <Link to="/" className="thankyou__btn">
                Back to Home
            </Link>
        </section>
    );
}
