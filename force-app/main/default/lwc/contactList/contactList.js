/* eslint-disable no-console */
import { LightningElement, track, wire } from 'lwc';
import searchContacts from '@salesforce/apex/ContactsListController.searchContacts'
export default class ContactList extends LightningElement {
    @track searchTerm = ''
    @track contacts
    @track selectedContact
    @wire(searchContacts, { searchTerm: '$searchTerm' })
    loadContacts(result) {
        this.contacts = result
    }

    handleContactSearch(event) {
        //Debounce the method
        window.clearTimeout(this.delayTimeout)
        const searchTerm = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.delayTimeout = setTimeout(() => {
            this.searchTerm = searchTerm
        }, 300)
    }

    handleContactClick(event) {
        let contactIdUnformatted = event.currentTarget.id;
        // console.log(typeOfData);
        // let typeOfData = typeof contactIdUnformatted;
        // console.log(contactIdUnformatted.toString());
        // console.log(contactIdUnformatted.split('-')[0]);
        // console.log(event.target.id);
        // if(contactIdUnformatted != null){
        // 
        // console.log(contactIdUnformatted.split('-')[0]);
        // }
        console.log(this.selectedContact);
        let contactId = contactIdUnformatted.split('-')[0];
        let contactList = this.contacts.data;
        contactList.forEach(contact => {
            if(contact.Id === contactId){
                this.selectedContact = contact;
            }
        });
    }
}