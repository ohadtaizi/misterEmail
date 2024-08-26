import React, { useState, useEffect } from 'react';
import whiteStar from '../assets/imgs/whiteStar.png';
import yellowStar from '../assets/imgs/yellowStar.png';
import { emailService } from '../services/emailService.js';

export function EmailPreview({ email, onToggleStar, onToggleRead, onDelete, onOpenEmail,darkMode = false }) {
    if (!email) {
        // If email is undefined, return a placeholder or null
        return <div className="email-preview-placeholder">Loading email...</div>;
    }
    
    const [isHovered, setIsHovered] = useState(false);
    const [isStarred, setIsStarred] = useState(email.isStarred || false);
    const [isRead, setIsRead] = useState(email.isRead || false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isDark, setIsDark] = useState(darkMode);


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

    function handleToggleRead() {
        // e.stopPropagation(); // Prevent triggering other click events
        // e.preventDefault();
        // setIsRead(prev => !prev);
        // if (onToggleRead) onToggleRead(email.id);
        setIsRead(prev => !prev); // Toggle read/unread status
        if (onToggleRead) onToggleRead(email.id);
    }

    function handleDelete(e) {
        e.stopPropagation(); // Prevent triggering other click events
        e.preventDefault();
           // Update email object to move it to trash
    const updatedEmail = { ...email, removedAt: Date.now() }; // Set a timestamp when the email was "deleted"
    emailService.save(updatedEmail).then(() => {
        if (onDelete) onDelete(email.id); // Notify parent component or update state
    });
    }

    const handleOpenEmail = () => {
        handleToggleRead(); // Toggle read/unread status
        toggleDarkMode(); // Toggle dark mode based on read/unread status
        setIsExpanded(prev => !prev); 
        if (onOpenEmail) onOpenEmail(email.id);
    };
    function toggleDarkMode() {
        setIsDark((prevIsDark) => !prevIsDark);
        console.log(isDark);
    }

    function sectionStyle() {
        var classList = ['email-preview'];
        if (isDark) classList.push('dark');
        return classList.join(' ');
    }
    const formattedDate = new Date(email.sentAt).toLocaleString('en-US', { day: 'numeric', month: 'short' });

    return (
        <>
        <div
            className={sectionStyle()}
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
            <span className="email-from">{typeof email.from === 'object' ? email.from?.email : email.from || 'Unknown Sender'}</span>
            <span className="email-subject">{email.subject}</span>
            <span className="email-body-snippet">{email.body.substring(0, 50)}...</span>
            <span className="email-date">{formattedDate}</span>
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
