import React, { useState, useEffect } from 'react';
import { emailService } from '../services/emailService';
import { useNavigate } from 'react-router-dom';

export function EmailCompose({ viewState, email }) {
    const [draftEmail, setDraftEmail] = useState(email || {
        to: '',
        subject: '',
        body: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const intervalId = setInterval(() => {
            emailService.saveDraft(draftEmail);
        }, 5000);

        return () => clearInterval(intervalId);
    }, [draftEmail]);

    function handleChange({ target }) {
        const { name, value } = target;
        setDraftEmail(prevDraft => ({ ...prevDraft, [name]: value }));
    }

    async function onSendEmail() {
        draftEmail.isDraft = false;
        await emailService.save(draftEmail);
        navigate('/email/sent');
    }

    return (
        <div className={`email-compose ${viewState}`}>
            <input
                type="text"
                name="to"
                value={draftEmail.to}
                onChange={handleChange}
                placeholder="To"
            />
            <input
                type="text"
                name="subject"
                value={draftEmail.subject}
                onChange={handleChange}
                placeholder="Subject"
            />
            <textarea
                name="body"
                value={draftEmail.body}
                onChange={handleChange}
                placeholder="Body"
            />
            <button onClick={onSendEmail}>Send</button>
        </div>
    );
}
