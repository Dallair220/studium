# TH Köln Praxisprojekt - League Ladder

Dieses Projekt ist eine auf Node.js basierende Webanwendung. Wichtige technische Aspekte sind:
- Node.js und Express.js: Verwendet für den Aufbau der serverseitigen Logik, die Handhabung von Routen und HTTP-Anfragen (Controller).
- MVC-Architektur: Das Projekt folgt dem Model-View-Controller (MVC) Designmuster.
- MongoDB und Mongoose: NoSQL-Datenbank, verwendet für die Datenspeicherung und Schemavalidierung. Unterstützt CRUD-Operationen auf Datenbankeinträge.
- Benutzerauthentifizierung: Implementierung von Google OAuth2 und lokaler Authentifizierung mit Passport.js. Bei der lokalen Strategie wird das Passwort-Hashing mit bcrypt umgesetzt.
- Die Anwendung integriert die Riot Games API.
- Best Practices für Sicherheit und Leistung: Helmet zur Verbesserung der Sicherheit durch Setzen verschiedener HTTP-Header, Compression zur Leistungssteigerung durch Komprimierung der Antwortdaten, und Rate Limiting zur Verhinderung von DoS-Angriffen durch Begrenzung der Anzahl der Anfragen, die ein einzelner Client in einem bestimmten Zeitraum stellen kann.
- React: Verwendet für den Aufbau der Benutzeroberfläche auf der Clientseite.
- Vite: Verwendet für den Build des clientseitigen Codes.
- Deployment: Die Anwendung wird auf Heroku gehostet. Das Verzeichnis client/dist, das von Vite generiert wird, enthält den produktionsbereiten clientseitigen Code. 

Live Website: https://praxisprojekt-cf89137f47c5.herokuapp.com/

![image](https://github.com/Dallair220/studium/assets/93786532/748f6bdc-cc1d-41f1-8485-0c8860bc0cfe)

![image](https://github.com/Dallair220/studium/assets/93786532/b0d3eac4-c4ce-42ce-835f-d69fa4037092)

Live Website: https://praxisprojekt-cf89137f47c5.herokuapp.com/
