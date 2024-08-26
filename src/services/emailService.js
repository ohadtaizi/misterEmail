import { storageService } from './async-storage.service.js'
import { loadFromStorage, saveToStorage, makeId } from './util.service.js'

export const emailService = {
    queryfromLocalStorge,
    getById,
    remove,
    save,
    saveDraft,
    getDefaultFilter,
}

const STORAGE_KEY = 'emails'
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

// const emailTemplate = {
//     id: util.service._makeId(),
//     subject: '',
//     body: '',
//     isRead: false,
//     isStarred: false,
//     sentAt: Date.now(),
//     removedAt: null,
//     from: '',
//     to: loggedinUser.email
//   }
_createEmails();
async function _createEmails() {

    let emails = await queryfromLocalStorge();
    console.log(emails);
    if (emails && emails.length > 0) return

    emails = [
        //     {
        //         id: makeId(),
        // subject: "the email app is up",
        // body: "this app is revotunalsry",
        // isRead: false,
        // isStarred: false,
        // sentAt: "June 26 ",
        // removedAt: null,
        //  from: 'billing@service.com',
        //         to: 'user@appsus.com'

        //     },
        {

            id: makeId(),
            subject: 'Meeting reminder',
            body: 'Don\'t forget about our meeting tomorrow at 10am.',
            isRead: false,
            isStarred: true,
            from: 'hr@company.com',
            to: 'user@appsus.com',
            sentAt: "June 28 ", removedAt: null,
        },
        {

            id: makeId(),
            subject: 'Sale now on!',
            body: 'Check out our latest discounts in store.',
            isRead: true,
            isStarred: false,
            sentAt: "June 28 ", removedAt: null,
            from: 'billing@service.com',
            to: 'momo@appsus.com',
            sentAt: 1551133930594
        },
        {

            id: makeId(),
            subject: 'Your invoice',
            body: 'Here is your invoice for the recent purchase.',
            isRead: true,
            isStarred: false,
            sentAt: "september 11 ", removedAt: null,
            from:  "ohad@taizi.com" ,
            to: 'billing@momo.com',
            sentAt: 1551133930594
        },
        {

            id: makeId(),
            subject: 'Starred email',
            body: 'This is a starred email.',
            from: 'friend@appsus.com',
            isRead: true,
            isStarred: true,
            sentAt: "juny 11 ", removedAt: null,
            from: "ohad@taizi.com",
            to: 'billing@momo.com',
            sentAt: 1551133930563
        }
    ];

    saveToStorage(STORAGE_KEY, emails);
    return emails;
}





async function queryfromLocalStorge(filterBy = {}) {
    console.log("queryfromLocalStorge");

    try {
        let emails = await storageService.query(STORAGE_KEY);

        if (filterBy?.status) {
            emails = emails.filter(email => {
                if (filterBy.status === 'inbox') {
                    return email.to === loggedinUser.email && !email.removedAt && !email.isDraft;
                } else if (filterBy.status === 'sent') {
                    return email.from === loggedinUser.email && !email.removedAt && !email.isDraft;
                } else if (filterBy.status === 'trash') {
                    return email.removedAt !== null;
                } else if (filterBy.status === 'starred') {
                    return email.isStarred === true && !email.removedAt && !email.isDraft;
                } else if (filterBy.status === 'draft') {
                    return email.isDraft; // Filter only drafts
                }
                return !email.removedAt; // Default: exclude trashed emails
            });
        }

        if (filterBy?.txt) {
            emails = emails.filter(email =>
                email.subject.toLowerCase().includes(filterBy.txt.toLowerCase()) ||
                email.body.toLowerCase().includes(filterBy.txt.toLowerCase())
            );
        }

        // if (filterBy?.isRead !== null) {

        //     emails = emails?.filter(email => email?.isRead === filterBy?.isRead);
        // }

        return emails;
    }

    catch (error) {
        console.log(error);
        throw error
    }
}



function getById(emailId) {
    return storageService.get(STORAGE_KEY, emailId)
}
function remove(emailId) {
    return storageService.remove(STORAGE_KEY, emailId)
}
async function saveDraft(draftEmail) {
    if (!draftEmail.id) {
        draftEmail.id = makeId(); // Generate an ID for new drafts
    }
    draftEmail.isDraft = true; // Mark the email as a draft
    return save(draftEmail); // Save the draft using the existing save method
}

function save(emailToSave) {
    console.log('Attempting to save email:', emailToSave);
    if (emailToSave.id) {
        // Check if the email exists before attempting to update it
        return storageService.get(STORAGE_KEY, emailToSave.id).then(existingEmail => {
            if (existingEmail) {
                // Email exists, update it
                console.log('Email exists, updating:', existingEmail);
                return storageService.put(STORAGE_KEY, emailToSave);
            } else {
                // If the email does not exist in storage, create a new one
                console.log('Email not found, creating new email');
                return storageService.post(STORAGE_KEY, emailToSave);
            }
        }).catch((err) => {
            console.error('Error while checking email existence:', err);
            // Always create a new email in case of errors (e.g., if the email was already deleted)
            return storageService.post(STORAGE_KEY, emailToSave);
        });
    } else {
        // New email, assign ID and create it
        emailToSave.id = makeId();
        console.log('New email ID assigned:', emailToSave.id);
        emailToSave.from = loggedinUser.email;
        emailToSave.sentAt = Date.now();
        return storageService.post(STORAGE_KEY, emailToSave);
    }
}



function getDefaultFilter() {
    return {
        status: 'inbox',
        txt: '',
        isRead: null,

    }
}