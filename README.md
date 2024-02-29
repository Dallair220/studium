# League Ladder - Praxisprojekt TH Köln

Das "League Ladder"-Projekt ist eine Webanwendung, die für das Praxisprojekt an der TH Köln entwickelt wurde. Es handelt sich um eine Plattform, die es Spielern von "League of Legends" ermöglicht, ihre Ranglistenpositionen zu verfolgen und zu vergleichen.

Die Anwendung nutzt eine Express.js-Backend und ein React-Frontend. Die Daten der Spieler und ihrer Ränge werden in einer MongoDB-Datenbank gespeichert und können über die bereitgestellten APIs abgerufen werden.

Die Live-Version der Anwendung kann unter diesem Link aufgerufen werden: https://praxisprojekt-cf89137f47c5.herokuapp.com/

## Technische Aspekte
- Node.js und Express.js: Verwendet für den Aufbau der serverseitigen Logik, die Handhabung von Routen und HTTP-Anfragen (Controller).
- MVC-Architektur: Das Projekt folgt dem Model-View-Controller (MVC) Designmuster.
- MongoDB und Mongoose: NoSQL-Datenbank, verwendet für die Datenspeicherung und Schemavalidierung. Unterstützt CRUD-Operationen auf Datenbankeinträge.
- Benutzerauthentifizierung: Implementierung von Google OAuth2 und lokaler Authentifizierung mit Passport.js. Bei der lokalen Strategie wird das Passwort-Hashing mit Bcrypt umgesetzt.
- Die Anwendung integriert die Riot Games API.
- Best Practices: Helmet für Sicherheit, Compression für Leistung, und Rate Limiting gegen DoS-Angriffe.
- React und Vite: React wird für das User Interface genutzt, während Vite für das Bundling und die Entwicklungsumgebung eingesetzt wird.
- Deployment: Die Anwendung wird auf Heroku gehostet. Das Verzeichnis /client/dist, enthält den produktionsbereiten clientseitigen Code. 

## Lokal ausführen
1. Klone dieses Repository auf Ihren lokalen Rechner
2. Führe `npm install` innerhalb von /studium aus
3. Erstelle eine .env-Datei und setze die folgenden Variablen:
  - `MONGODB_CONNECTION_URI` = Der Connection String deines MongoDB Clusters (https://cloud.mongodb.com/v2/)
  - `RIOT_API_KEY` = Generiere einen Key hier: https://developer.riotgames.com/
  - `SESSION_SECRET` (Optional, für Login/Registrierung) = Zufälliges Passwort
  - `GOOGLE_CLIENT_ID` und `GOOGLE_CLIENT_SECRET` (Optional, für Google OAuth2) = Erstelle deinen Zugang hier: https://console.cloud.google.com/apis/credentials > CREATE CREDENTIALS > OAuth client ID
4. Wechsel zu /client und installier ebenfalls mit `npm install`
5. Erstelle den Build des Frontends mit `npm run build`
6. Starte den Server mit `npm run serverstart`, innerhalb des root-Ordners
7. Besuche die Website im Browser unter http://localhost:3000/

## Screenshots
![image](https://github.com/Dallair220/studium/assets/93786532/748f6bdc-cc1d-41f1-8485-0c8860bc0cfe)

![image](https://github.com/Dallair220/studium/assets/93786532/b0d3eac4-c4ce-42ce-835f-d69fa4037092)

## Live Website
https://praxisprojekt-cf89137f47c5.herokuapp.com/

## Autor
**Paul Hermann**  
paul.hermann@smail.th-koeln.de
