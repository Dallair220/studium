# TH Köln Praxisprojekt - League Ladder

Das "League Ladder"-Projekt ist eine Webanwendung, die für das Praxisprojekt an der TH Köln entwickelt wurde. Es handelt sich um eine Plattform, die es Spielern des Spiels "League of Legends" ermöglicht, ihre Ranglistenpositionen zu verfolgen und zu vergleichen.

Die Anwendung nutzt eine Express.js-Backend und ein React-Frontend. Die Daten der Spieler und ihrer Ränge werden in einer MongoDB-Datenbank gespeichert und können über die bereitgestellten APIs abgerufen werden.

Die Anwendung bietet Funktionen zum Erstellen und Speichern von Spieler- und Rangdaten. Die Spielerdaten enthalten den Spielernamen und den Tag, während die Rangdaten Details wie Rang, Division, Liga-Punkte, Siege, Niederlagen und gespielte Spiele enthalten.

Die Live-Version der Anwendung ist auf Heroku gehostet und kann unter diesem Link aufgerufen werden.



Dieses Projekt ist eine auf Node.js basierende Webanwendung. Wichtige technische Aspekte sind:
- Node.js und Express.js: Verwendet für den Aufbau der serverseitigen Logik, die Handhabung von Routen und HTTP-Anfragen (Controller).
- MVC-Architektur: Das Projekt folgt dem Model-View-Controller (MVC) Designmuster.
- MongoDB und Mongoose: NoSQL-Datenbank, verwendet für die Datenspeicherung und Schemavalidierung. Unterstützt CRUD-Operationen auf Datenbankeinträge.
- Benutzerauthentifizierung: Implementierung von Google OAuth2 und lokaler Authentifizierung mit Passport.js. Bei der lokalen Strategie wird das Passwort-Hashing mit bcrypt umgesetzt.
- Die Anwendung integriert die Riot Games API.
- Best Practices: Helmet für Sicherheit, Compression für Leistung, und Rate Limiting gegen DoS-Angriffe.
- React und Vite: React wird für das User Interface genutzt, während Vite für das Bundling und die Entwicklungsumgebung eingesetzt wird.
- Deployment: Die Anwendung wird auf Heroku gehostet. Das Verzeichnis /client/dist, enthält den produktionsbereiten clientseitigen Code. 

Live Website: https://praxisprojekt-cf89137f47c5.herokuapp.com/

![image](https://github.com/Dallair220/studium/assets/93786532/748f6bdc-cc1d-41f1-8485-0c8860bc0cfe)

![image](https://github.com/Dallair220/studium/assets/93786532/b0d3eac4-c4ce-42ce-835f-d69fa4037092)

Live Website: https://praxisprojekt-cf89137f47c5.herokuapp.com/
