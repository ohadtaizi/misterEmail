import React, { useState, useEffect } from "react";

export function EmailFilter({ setFilterBy }) {
    const [filter, setFilter] = useState({ txt: '', isRead: '' });
    const [isRead, setIsRead] = useState(null);
    useEffect(() => {
        onSetFilter();
    }, [filter]);

    function handleChange({ target }) {
        const { name, value } = target;
        setFilter(prev => ({ ...prev, [name]: value }));
    }
    function btnText(){
        return isRead === null ? "All" : isRead ? "Read" : "Unread";
    }
    function onSetFilter() {
        setFilterBy({ ...filter, isRead });
    }

    function onReadBtnClicked() {
        setIsRead(prev => (prev === null ? true : prev === true ? false : null));
        setFilter(prev => ({ ...prev, isRead: isRead === null ? true : isRead === true ? false : null }));
    }

    return (
        <section className="email-filter">
            <input 
                name="txt" 
                type="text"
                placeholder="Search"
                onChange={handleChange} 
                value={filter.txt} 
                // placeholder='Search...'
            />
            {/* <select name="isRead" value={filter.isRead} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">Read</option>
                <option value="false">Unread</option>
            </select> */}
    <button className="isRead" onClick={onReadBtnClicked}>{btnText()}</button>
    </section>
    );
}
