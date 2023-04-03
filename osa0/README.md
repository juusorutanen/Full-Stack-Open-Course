# Osa 0 vastaukset


# 0.4: uusi muistiinpano

```mermaid

sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin
    Käyttäjä->>Selain: Käyttäjä kirjoittaa muistiinpanon lomakkeelle ja painaa Save-painiketta
    
    Selain->>Palvelin: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of Palvelin: Käyttäjän kirjoittamasta muistiinpanosta muodostuu olio ja palvelin lisää sen taulukkoon notes
    Palvelin->>Selain: HTTP 302-statuskoodi
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/notes
    Palvelin->>Selain: Selain lataa uudelleen sivun
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Palvelin->>Selain: main.css
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    Palvelin->>Selain: main.js
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    Palvelin->>Selain: data.json
    Note left of Selain: Ohjelmakoodi main.js-tiedostosta hakee muistiinpanot data.json-tiedostosta ja siirtää ne HTML-tiedostoon, jonka selain näyttää
```

# 0.5: Single Page App

```mermaid
sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin
    
    Käyttäjä->>Selain: Käyttäjä menee sivustolle https://studies.cs.helsinki.fi/exampleapp/spa
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa
    Palvelin->>Selain: Palvelin lähettää HTML-sivun
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    Palvelin->>Selain: main.css
    Selain->>Palvelin: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    Palvelin->>Selain: spa.js
    Note left of Selain: spa.js koodi hakee JSON-tiedoston palvelimelta
    Selain->>Palvelin: GET  https://studies.cs.helsinki.fi/exampleapp/data.json
    Palvelin->>Selain: JSON-tiedoston sisältö
    Note left of Selain: Muistiinpanot renderöidään käyttäjälle näkyväksi tapahtumakäsittelijän (event handler) avulla
```
