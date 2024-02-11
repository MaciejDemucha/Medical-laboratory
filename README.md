Aplikacja internetowa usprawniająca obsługę laboratorium diagnostycznego. Pozwala ona klientowi laboratorium na wyszukiwanie placówek medycznych fikcyjnej sieci laboratoriów poprzez połączenie z API Google Maps. Ponadto, pacjenci laboratoriów mają możliwość kupna bonów na wybrane badania oraz sprawdzenia wyników swoich badań za pomocą udostępnionego hasła. Pracownicy mają wgląd w historię badań pacjentów i mogą wysyłać wiadomości z diagnozą wyników badań.

## Uruchomienie

1. Konfiguracja połączenia z bazą danych:
W pliku backend\src\main\resources\application.yml należy umieścić dane do połączenia z MySQL

![database_connection](https://github.com/MaciejDemucha/Medical-laboratory/assets/72813169/3f5c0f4e-58e1-485d-9b65-31e044d3db8a)

3. Backend:
Należy w folderze backend użyć komendy
- `./mvnw spring-boot:run`
3. Frontend:
Instalacja:
Należy zainstalować Node.js w wersji LTS: https://nodejs.org/en/download/
W folderze frontend należy zainstalować Angular CLI:
- `npm install -g @angular/cli`

Następnie należy użyć komendy npm install w celu zainstalowania bibliotek do projektu

Uruchomienie:
W folderze frontend należy użyć komendy: 
- `ng serve`
