# GameHive Dokumentation
---
## Game Library
    En collection i MongoDB
Innehåller data om spel som vi initialt matar in själva för att ha en bas att börja med, sen kan användare med developer-roll lägga in sina egna titlar efterhand. Den data vi själva lägger in består till större delen av riktiga spel som existerar i verkligheten, medan de titlar som developers lägger in är fiktiva.

**Användning av bilder och media**

För de verkliga speltitlarna i databasen sparar vi endast länkar till bildfiler som tillhandahålls av ett API (GameBrain), detta för att inte bryta mot lagar om rättigheter för användning och upphovsrätt. För att simulera användning av vår tjänst för spelutvecklare så skapar vi själva fiktiva spel och tar fram bilder och eventuell annan media med generativ AI. 