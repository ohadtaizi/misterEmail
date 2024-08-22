import React, { useState, useEffect } from 'react';
import whiteStar from '../assets/imgs/whiteStar.png';
import yellowStar from '../assets/imgs/yellowStar.png';
import { emailService } from '../services/emailService.js';

export function EmailPreview({ email, onToggleStar, onToggleRead, onDelete, onOpenEmail }) {
    const [isHovered, setIsHovered] = useState(false);
    const [isStarred, setIsStarred] = useState(email.isStarred || false);
    const [isRead, setIsRead] = useState(email.isRead || false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        // Sync email updates (e.g., star, read status) to storage
        const updatedEmail = { ...email, isStarred, isRead };
        emailService.save(updatedEmail);
    }, [isStarred, isRead]);

    function handleToggleStar(e) {
        e.stopPropagation(); // Prevent triggering other click events
        e.preventDefault();
        setIsStarred(prev => !prev);
        if (onToggleStar) onToggleStar(email.id);
    }

    function handleToggleRead(e) {
        e.stopPropagation(); // Prevent triggering other click events
        e.preventDefault();
        setIsRead(prev => !prev);
        if (onToggleRead) onToggleRead(email.id);
    }

    function handleDelete(e) {
        e.stopPropagation(); // Prevent triggering other click events
        e.preventDefault();
        if (onDelete) onDelete(email.id);
    }

    const handleOpenEmail = () => {
        setIsExpanded(prev => !prev); 
        if (onOpenEmail) onOpenEmail(email.id);
    };

    return (
        <>
        <div
            className={`email-preview ${isRead ? 'read' : 'unread'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOpenEmail} // Add onClick to open the email
        >
            <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            <img 
                src={isStarred ? yellowStar : whiteStar} 
                alt="Star" 
                className="star-icon" 
                onClick={handleToggleStar} 
            />
            <span className="email-from">{email.from.email}</span>
            <span className="email-subject">{email.subject}</span>
            <span className="email-body-snippet">{email.body.substring(0, 50)}...</span>
            <span className="email-date">{email.sentAt}</span>
            <button onClick={handleDelete}>Delete</button>
        
        </div>
           {isExpanded && (
            <div className="email-full-body">
                <h2>{email.subject}</h2>
                <p>{email.body}</p>
            </div>
        )}
        </>
    );
}
