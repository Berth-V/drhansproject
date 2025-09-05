import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./Form.css";

export default function Form({ variant = "full" }) {
  const [status, setStatus] = useState({ sending: false, ok: null });
  const [open, setOpen] = useState(true);

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ sending: true, ok: null });
    await new Promise((r) => setTimeout(r, 700));
    setStatus({ sending: false, ok: true });
    e.currentTarget.reset();
  }

  // Comportamiento FULL (sin toggle, sin animación)
  if (variant === "full") {
    return (
      <section className="homeForm homeForm--full">
        <div className="homeForm__wrap">
          <h2 className="homeForm__title">Make an appointment</h2>
          <p className="homeForm__subtitle">
            Book your consultation quickly and easily.
          </p>
          <form className="homeForm__form" onSubmit={onSubmit}>
            <div className="homeForm__row">
              <input
                className="homeForm__input"
                name="name"
                type="text"
                placeholder="Full Name"
                autoComplete="name"
                required
              />
              <input
                className="homeForm__input"
                name="email"
                type="email"
                placeholder="Email Address"
                autoComplete="email"
                required
              />
            </div>
            <div className="homeForm__row">
              <input
                className="homeForm__input"
                name="phone"
                type="tel"
                placeholder="Phone Number"
                autoComplete="tel"
              />
              <div className="homeForm__spacer" />
            </div>
            <textarea
              className="homeForm__textarea"
              name="message"
              placeholder="Message"
              rows={5}
            />
            <button
              className="homeForm__btn"
              type="submit"
              disabled={status.sending}
            >
              {status.sending ? "Sending…" : "Appointment"}
            </button>
            {status.ok && (
              <p className="homeForm__ok">Thanks! We’ll contact you soon.</p>
            )}
          </form>
        </div>
      </section>
    );
  }

  // Comportamiento STICKY (con toggle y animación)
  return (
    <div className="homeForm homeForm--sticky">
      <button
        className="homeForm__toggle"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "✕" : "Form"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.section
            className="homeForm__panel"
            initial={{ x: "-110%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-110%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 25 }}
          >
            <h2 className="homeForm__title">Make an appointment</h2>
            <p className="homeForm__subtitle">
              Book your consultation quickly and easily.
            </p>
            <form className="homeForm__form" onSubmit={onSubmit}>
              <div className="homeForm__row">
                <input
                  className="homeForm__input"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                />
                <input
                  className="homeForm__input"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                />
              </div>
              <div className="homeForm__row">
                <input
                  className="homeForm__input"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  autoComplete="tel"
                />
                <div className="homeForm__spacer" />
              </div>
              <textarea
                className="homeForm__textarea"
                name="message"
                placeholder="Message"
                rows={4}
              />
              <button
                className="homeForm__btn"
                type="submit"
                disabled={status.sending}
              >
                {status.sending ? "Sending…" : "Appointment"}
              </button>
              {status.ok && (
                <p className="homeForm__ok">Thanks! We’ll contact you soon.</p>
              )}
            </form>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
