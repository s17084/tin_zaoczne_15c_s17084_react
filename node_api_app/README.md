# Instrukcja uruchomienia projektu:

Projekt dostępny jest pod adresem:

https://github.com/s17084/tin-projekt-kulig-s17084

1. Lista wykorzystanych technologii:
    - Node.js
    - Sequelize
    - EJS
    - MySQL

2. Uruchomienie bazy danych MySQL:
    - Sprawdź czy masz zainstalowanego Docker'a: docker --version
    - Uruchom Docker desktop
    - Uruchom terminal w katalogu: <lokalizacja projektu>/docker
    - Wykonaj komendę: docker-compose up
    - BRAWO! Uruchomiona została instancja bazy danych z odpowiednimi danymi!

3. Uruchomienie projektu oraz zasilenie bazy danych:
    - Uruchom terminal w katalogu projektu (katalog z plikiem package.json)
    - Wykonaj komendę: nam install
    - Utworzony został folder node_modules a w nim zainstalowano wszystkie niezbędne biblioteki
    - Wykonaj komendę: npm start
    - Uruchom przeglądarkę internetową i przejdź pod adres: http://localhost:3000/
    - BRAWO! Uruchomiłeś aplikację - możesz rozpocząć korzystanie z niej :)
    - P.S. Baza danych zasilona została danymi z pliku init.js

4. Dodatkowa konfiguracja bazy danych:
    - W celu zarządzania bazą danych uruchom program IntelliJ
    - Otwórz projekt (wskaż lokalizację projektu z plikiem package.json)
    - Otwórz zakładkę "Database" (View -> Tool Windows -> Database) i skonfiguruj połączenie z bazą z następującymi danymi (New):
      * Host: localhost
      * Port: 3306
      * User: root
      * Password: root
      * Database: tin-s17084
    - Możesz korzystać z bazy z poziomu IntelliJ!
    - Możesz również wykorzystać konsolę phpMyAdmin pod adresem http://localhost:8183/
      * Serwer: mysql
      * User: root
      * Password: root