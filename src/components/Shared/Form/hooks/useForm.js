import { useState } from 'react';

export default function useForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState({ sending: false, ok: null, error: '' });
  const [errors, setErrors] = useState({});

  const regex = {
    name: /^[A-Za-zÀ-ÿ\s]{3,40}$/,
    email: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    phone: /^[0-9+\-\s()]{7,20}$/,
  };

  function validateField(name, value) {
    if (!value.trim()) return `${name} is required.`;

    switch (name) {
      case 'name':
        if (!regex.name.test(value)) return 'Please enter a valid name.';
        break;
      case 'email':
        if (!regex.email.test(value))
          return 'Please enter a valid email address.';
        break;
      case 'phone':
        if (value && !regex.phone.test(value))
          return 'Please enter a valid phone number.';
        break;
      default:
        break;
    }
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  }

  function validateAll() {
    const newErrors = {};
    for (const key in formData) {
      if (['name', 'email', 'phone'].includes(key)) {
        const msg = validateField(key, formData[key]);
        if (msg) newErrors[key] = msg;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status.sending) return;

    if (!consent) {
      setStatus({
        sending: false,
        ok: false,
        error: 'Please accept our Privacy Policy.',
      });
      return;
    }

    if (!validateAll()) {
      setStatus({
        sending: false,
        ok: false,
        error: 'Please correct the highlighted fields.',
      });
      return;
    }

    setStatus({ sending: true, ok: null, error: '' });

    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
      fd.append('formId', 'appointment');
      if (import.meta.env.VITE_FORM_KEY)
        fd.append('form_key', import.meta.env.VITE_FORM_KEY);

      const res = await fetch(import.meta.env.VITE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
        },
        body: new URLSearchParams(fd),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json?.error || json?.message);

      setStatus({ sending: false, ok: true, error: '' });
      setFormData({ name: '', email: '', phone: '', message: '' });
      setConsent(false);
      if (window.turnstile?.reset) window.turnstile.reset();

      if (window.gtag) {
        window.gtag('event', 'Formulario', {
          event_category: 'Form',
          event_label: 'Appointment Form',
        });
      }
    } catch (err) {
      let message = 'Error while sending.';
      if (err?.name === 'AbortError') message = 'Request timeout. Try again.';
      else if (typeof err?.message === 'string') message = err.message;

      setStatus({ sending: false, ok: false, error: message });
      if (window.turnstile?.reset) window.turnstile.reset();
      console.error(err);
    }
  }

  return {
    formData,
    consent,
    status,
    errors,
    setConsent,
    handleChange,
    onSubmit,
  };
}
