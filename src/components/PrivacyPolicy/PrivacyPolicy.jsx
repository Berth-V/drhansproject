// src/pages/PrivacyPolicy/PrivacyPolicy.jsx
import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
    return (
        <section className="privacy">
            <div className="privacy__container">
                <h1 className="privacy__title">Privacy Policy</h1>

                <p className="privacy__text">
                    Dr. Hans Ruiz, located in Tijuana, Baja California, Mexico, is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect the information you provide through our website{" "}
                    <a href="https://hansruiztrauma.com" target="_blank" rel="noopener noreferrer">
                        https://hansruiztrauma.com
                    </a>.
                </p>

                <h2 className="privacy__subtitle">1. Information we collect</h2>
                <p className="privacy__text">
                    We collect personal information such as your name, email address, and phone number when you fill out our contact or appointment forms.
                </p>

                <h2 className="privacy__subtitle">2. How we use your information</h2>
                <ul className="privacy__list">
                    <li className="privacy__list-item">To schedule medical appointments or consultations.</li>
                    <li className="privacy__list-item">To communicate regarding medical services and procedures.</li>
                    <li className="privacy__list-item">To provide information requested by you.</li>
                </ul>

                <h2 className="privacy__subtitle">3. Data protection</h2>
                <p className="privacy__text">
                    We implement administrative, physical, and technical safeguards to ensure your data is protected against unauthorized access, disclosure, or misuse.
                </p>

                <h2 className="privacy__subtitle">4. Data sharing</h2>
                <p className="privacy__text">
                    We do not sell, rent, or share your information with third parties, except when required by law.
                </p>

                <h2 className="privacy__subtitle">5. Your rights</h2>
                <p className="privacy__text">
                    You may request to access, update, or delete your personal data by contacting us at{" "}
                    <a href="mailto:traumatologiahans@gmail.com">traumatologiahans@gmail.com</a>.
                </p>

                <h2 className="privacy__subtitle">6. International users</h2>
                <p className="privacy__text">
                    By using this website, you understand that your information may be transferred to and processed in Mexico where our clinic is located.
                </p>

                <h2 className="privacy__subtitle">7. Updates</h2>
                <p className="privacy__text">
                    We may update this Privacy Policy periodically. Any changes will be reflected on this page with the updated date below.
                </p>

                <p className="privacy__update">Last updated: October 2025</p>
            </div>
        </section>
    );
};

export default PrivacyPolicy;
