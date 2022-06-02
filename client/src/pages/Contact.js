import React, { useState } from 'react';
import { validateEmail } from '../utils/helpers';

const Contact = () => {

    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    const [errorMessage, setErrorMessage] = useState('');
    const { name, email, message } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!errorMessage) {
            console.log('Submit Form', formState);
        }
    };

    const handleChange = (e) => {
        if (e.target.name === 'email') {
            const isValid = validateEmail(e.target.value);
            if (!isValid) {
                setErrorMessage('Your email is invalid.');
            } else {
                setErrorMessage('');
            }
        } else {
            if (!e.target.value.length) {
                setErrorMessage(`${e.target.name} is required.`);
            } else {
                setErrorMessage('');
            }
        }
        if (!errorMessage) {
            setFormState({ ...formState, [e.target.name]: e.target.value });
            console.log('Handle Form', formState);
        }
    };

    return (
        <article className='contact-page-container'>
            <section className='contact-container'>
                <form onSubmit={handleSubmit} method='POST' action='https://getform.io/f/3f840aab-1948-44fd-b449-a15e9d8dce7f' className='contact-form'>
                    <div className='contact-text'>
                        <p className='contact-title'>Get in Touch</p>
                        <p className='contact-description'> We will get back to you asap!</p>
                    </div>
                    <input defaultValue={name} className='contact-name' type='text' placeholder='Name' name='name' onBlur={handleChange} />
                    <input defaultValue={email} className='contact-email' type='email' placeholder='Email' name='email onBlur={handleChange}' />
                    <textarea defaultValue={message} className='contact-message' name='message' rows='10' placeholder='Message' onBlur={handleChange}></textarea>
                    {errorMessage && (
                        <div>
                            <p className="error-text">{errorMessage}</p>
                        </div>
                    )}
                    <button type='submit' className='contact-button'>Lets Chat!</button>
                </form>
            </section>
        </article>
    )
}

export default Contact;
