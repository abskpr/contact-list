public with sharing class ContactsListController {
    @AuraEnabled(Cacheable=true)
    public static Contact[] getAllContacts(){
        return [
            SELECT Id, Name, Phone, Fax, Account.Name, Title 
            FROM Contact 
            ORDER BY Name
            LIMIT 50
        ];
    }

    @AuraEnabled(Cacheable=true)
    public static Contact[] searchContacts(String searchTerm){
        searchTerm = searchTerm.trim();
        if(searchTerm == ''){
            return getAllContacts();
        }
        // Prepare query parameters
        searchTerm = '%'+ searchTerm + '%';
        // Execute search query
        return [
            SELECT Id, Name, Phone, Fax, Account.Name, Title
            FROM Contact
            WHERE Name Like :searchTerm
            ORDER BY Name
            LIMIT 50
        ];
    }
}
