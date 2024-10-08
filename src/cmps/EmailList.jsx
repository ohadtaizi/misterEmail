import { Link } from "react-router-dom";
import { EmailPreview } from "./EmailPreview";

export function EmailList({ emails, onRemove }) {
console.log("email list ",emails)
if (!emails || emails.length === 0) {
    return <div>Loading emails...</div>;
}
    return (
        
        <section className="email-list">
            <ul>
                {emails.map(email => (
                    <li key={email.id}>
                    <Link to={`/email/${email.id}`}>
                        <EmailPreview email={email} onRemove={onRemove}/>
                    </Link>
                    {/* <button onClick={() => onRemove(email.id)}>x</button> */}
                </li>
                ))}
            </ul>
        </section>
    );
}
