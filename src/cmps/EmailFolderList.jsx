export function EmailFolderList({ setFilterBy }) {
  function onSetFilter(status) {
    return () => {
      console.log('Filter status:', status);
      if (setFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, status }));
      } else {
        console.error('setFilterBy is not a function');
      }
    };
  }

  return (
    <aside className="email-folder-list">
      <button onClick={onSetFilter('inbox')}>Inbox</button>
      <button onClick={onSetFilter('sent')}>Sent</button>
      <button onClick={onSetFilter('starred')}>Starred</button>
      <button onClick={onSetFilter('trash')}>Trash</button>
    </aside>
  );
}
