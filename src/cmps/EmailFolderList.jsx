import React, { useState, useEffect } from "react";
import { EmailCompose } from './EmailCompose';
import { useNavigate, useLocation } from 'react-router-dom';

export function EmailFolderList({ setFilterBy }) {
    const [isComposeVisible, setIsComposeVisible] = useState(false);
    const [composeViewState, setComposeViewState] = useState('normal');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        if (queryParams.get('compose') === 'new') {
            setIsComposeVisible(true);
        }
    }, [location.search]);

    function toggleCompose() {
        setIsComposeVisible(prev => !prev);
        if (!isComposeVisible) {
            navigate(`${location.pathname}?compose=new`);
        } else {
            navigate(location.pathname);
        }
    }

    function onSetFilter(status) {
        return () => {
            if (setFilterBy) {
                setFilterBy(prevFilter => ({ ...prevFilter, status }));
            } else {
                console.error('setFilterBy is not a function');
            }
        };
    }

    return (
        <aside className="email-folder-list">
            <button onClick={toggleCompose}>New Email</button>
            <button onClick={onSetFilter('inbox')}>Inbox</button>
            <button onClick={onSetFilter('sent')}>Sent</button>
            <button onClick={onSetFilter('starred')}>Starred</button>
            <button onClick={onSetFilter('trash')}>Trash</button>
            <button onClick={onSetFilter('draft')}>Draft</button>

            {isComposeVisible && (
                <div className="popup-overlay">
                    <div className="popup">
                      
                        <EmailCompose 
                            viewState={composeViewState} 
                            onClose={() => setIsComposeVisible(false)}
                            onToggleViewState={setComposeViewState}
                        />
                    </div>
                </div>
            )}
        </aside>
    );
}
