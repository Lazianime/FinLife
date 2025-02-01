/* eslint-disable react/prop-types */
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

function RecaptchaVerification({ onVerify }) {
    const [message, setMessage] = useState("");

    function handleRecaptchaChange(value) {
        try {
            if (value) {
                setMessage("reCAPTCHA verified successfully");
                onVerify(true);
            } else {
                setMessage("reCAPTCHA verification failed. Please try again.");
                onVerify(false);
            }
        } catch (error) {
            console.error("Error during reCAPTCHA verification:", error);
            setMessage("An error occurred during verification. Please try again.");
        }
    }

    return (
        <div>
            <ReCAPTCHA
                sitekey="6Ldo-cYqAAAAAG7w6Nz91uu4EKvlDqIir4YqwPo2"
                onChange={handleRecaptchaChange}
                theme="light"
            />
        </div>
    );
}

export default RecaptchaVerification;