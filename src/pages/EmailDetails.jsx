import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom" // Ensure you import useNavigate from react-router-dom, not react-router
import { emailService } from "../services/emailService"
import { Link } from 'react-router-dom'

export function EmailDetails() {
    const { mailId } = useParams()
    // const navigate = useNavigate()
    const [email, setEmail] = useState(null)

    useEffect(() => {
        loadEmail(mailId)
    }, [mailId])

    // async function loadEmail() {
    //     const email = await emailService.getById(mailId)
    //     setEmail(email)
    // }
    async function loadEmail(emailId) {
        try {
            const email = await emailService.getById(emailId);
            if (email) {
                setEmail(email);
            } else {
                console.error(`Email with ID ${emailId} not found.`);
                // Handle the case where the email is not found (e.g., navigate back or show a message)
            }
        } catch (err) {
            console.error('Failed to load email', err);
            // Optionally handle the error, like showing an alert or navigating away
        }
    }
  

    if (!email) return <div>Loading...</div>

    return (
        <div className='email-details-container'>
        <h1 className='email-subject'>{email.subject}</h1>
        <p className='email-body'>{email.body}</p>
        <Link to="/emailIndex">Back</Link>
      </div> 
    )
}
