# Osa 0 vastaukset


# 0.4: uusi muistiinpano

```mermaid

sequenceDiagram
    participant Käyttäjä
    participant Selain
    participant Palvelin
    Käyttäjä->>Selain: Käyttäjä kirjoittaa muistiinpanon lomakkeelle ja painaa Save-painiketta
    
    Selain->>Palvelin: HTTP POST, Request URL: https://studies.cs.helsinki.fi/exampleapp/new_note
    Palvelin->>Selain: 

   
    
```
