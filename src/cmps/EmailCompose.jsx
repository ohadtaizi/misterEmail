import React, { useState } from 'react';
import { emailService } from '../services/emailService';
import { useNavigate } from 'react-router-dom';

export function EmailCompose({ viewState, email, onClose, onToggleViewState }) {
    const [draftEmail, setDraftEmail] = useState(email || {
        from: 'user@appsus.com',
        to: '',
        subject: '',
        body: '',
        sentAt: '' ,// Initialize sentAt field
        isDraft: true,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const autoSaveInterval = setInterval(() => {
            emailService.saveDraft(draftEmail); // Save the draft to storage
        }, 5000);

        return () => clearInterval(autoSaveInterval); // Clear interval on unmount
    }, [draftEmail]);
    
    function handleChange({ target }) {
        const { name, value } = target;
        setDraftEmail(prevDraft => ({ ...prevDraft, [name]: value }));
    }

    async function onSendEmail() {
        draftEmail.isDraft = false;
        draftEmail.sentAt = new Date().toISOString();
        console.log('Sending email:', draftEmail); // Debug log
        try {
            await emailService.save(draftEmail);
            navigate('/email/sent');
            onClose(); // Close the compose window after sending the email
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    function handleMinimize() {
        onToggleViewState('minimized');
    }

    function handleMaximize() {
        onToggleViewState(viewState === 'fullscreen' ? 'normal' : 'fullscreen');
    }

    return (
        <div className={`email-compose ${viewState}`}>
            <div className="compose-header">
                <button onClick={handleMinimize}>_</button>
                <button onClick={handleMaximize}>{viewState === 'fullscreen' ? '◽' : '⬜'}</button>
                <button onClick={onClose}>X</button>
            </div>
            {viewState !== 'minimized' && (
                <div className="compose-body">
                    <input
                        type="text"
                        name="from"
                        value={draftEmail.from}
                        onChange={handleChange}
                        placeholder="From"
                    />
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
                        rows="10"
                    />
                    
                    </div>
            )}
               {viewState !== 'minimized' && (
                <div className="compose-footer">
                    <button className="send-btn" onClick={onSendEmail}>send</button>
                    {/* Add more buttons as needed, such as attachments, formatting, etc. */}
                </div>
            )}
        </div>
    );
}
