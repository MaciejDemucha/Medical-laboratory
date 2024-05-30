Aplikacja internetowa usprawniająca obsługę laboratorium diagnostycznego. Pozwala ona klientowi laboratorium na wyszukiwanie placówek medycznych fikcyjnej sieci laboratoriów poprzez połączenie z API Google Maps. Ponadto, pacjenci laboratoriów mają możliwość kupna bonów na wybrane badania oraz sprawdzenia wyników swoich badań za pomocą udostępnionego hasła. Pracownicy mają wgląd w historię badań pacjentów i mogą wysyłać wiadomości z diagnozą wyników badań.

Pokaz działania aplikacji:
https://drive.google.com/file/d/1CACnXz3ValLD4i4QZmAowEnROr72xaoj/view?usp=sharing

## Uruchomienie

1. Konfiguracja połączenia z bazą danych:
W pliku backend\src\main\resources\application.yml należy umieścić dane do połączenia z MySQL

![303913019-3f5c0f4e-58e1-485d-9b65-31e044d3db8a](https://github.com/MaciejDemucha/Medical-laboratory/assets/72813169/8f357970-cc04-4e49-92bd-8d6b6f25b5c3)

2. Backend:
Należy zainstalować środowisko Java: https://www.oracle.com/pl/java/technologies/downloads/.
Należy w folderze backend użyć komendy
- `./mvnw spring-boot:run`
3. Frontend:
Instalacja:
Należy zainstalować Node.js w wersji LTS: https://nodejs.org/en/download/.
W folderze frontend należy zainstalować Angular CLI:
- `npm install -g @angular/cli`

Następnie należy użyć komendy npm install w celu zainstalowania bibliotek do projektu

Uruchomienie:
W folderze frontend należy użyć komendy: 
- `ng serve`

Aplikacja jest dostępna pod adresem: http://localhost:4200/
