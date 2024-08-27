import React, { useState, useEffect } from "react";

export function EmailFilter({ setFilterBy,onSetSort  }) {
    const [filter, setFilter] = useState({ txt: '', isRead:  null });
    // const [sortBy, setSortBy] = useState({ field: 'date', order: 'desc' }); // Add state for sorting
    // const [isRead, setIsRead] = useState(null);
    useEffect(() => {
        setFilterBy(filter);
    }, [filter,setFilterBy]);

    function handleChange({ target }) {
        const { name, value } = target;
        setFilter(prev => ({ ...prev, [name]: value }));
    }
    function btnText(){
        return filter.isRead === null ? "All" : filter.isRead ? "Read" : "Unread";
    }
    // function onSetFilter() {
    //     setFilterBy({ ...filter, isRead });
    // }

    function onReadBtnClicked() {
        setFilter(prev => ({ 
            ...prev, 
            isRead: prev.isRead === null ? true : !prev.isRead
        }));
        // setIsRead(prev => (prev === null ? true : prev === true ? false : null));
        // setFilter(prev => ({ ...prev, isRead: isRead === null ? true : isRead === true ? false : null }));
    }
    // function onSetSort(field, order) {
    //     setSortBy({ field, order }); // Update the sorting criteria
        
    //   }
      

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
    <div className="email-sort">
                <button onClick={() => onSetSort('date', filter.order === 'asc' ? 'desc' : 'asc')}>Sort by Date</button>
                <button onClick={() => onSetSort('title', filter.order === 'asc' ? 'desc' : 'asc')}>Sort by Title</button>
            </div>
    </section>
    );
}
