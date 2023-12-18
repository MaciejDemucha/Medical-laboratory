1. Konfiguracja połączenia z bazą danych:
W pliku Medical-laboratory\backend\src\main\resources\application.yml należy umieścić dane do schema'y w MySQL (przykład w pliku database_connection)
2. Backend:
Należy w folderze backend użyć komendy  ./mvnw spring-boot:run
3. Frontend:
Instalacja:
Należy zainstalować Node.js w wersji LTS: https://nodejs.org/en/download/
W folderze frontend należy zainstalować Angular CLI: npm install -g @angular/cli
link do instrukcji Angular: https://angular.io/guide/setup-local

Uruchomienie:
W folderze frontend należy użyć komendy: ng serve