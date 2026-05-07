# 🚀 Playwright Hybrid Framework: MRS-Boilerplate

## 🌟 Wprowadzenie

Witaj w **MRS-Boilerplate** – nowoczesnym, hybrydowym szkielecie do testów automatycznych. Projekt ten powstał z połączenia trzech potężnych podejść do automatyzacji, biorąc z każdego to, co najlepsze:

- **Struktura i Mechanika (Angelo Loria - https://github.com/angelo-loria/playwright-boilerplate):** Solidny wzorzec POM z wykorzystaniem komponentów i fixtures.
- **Narzędzia i Stabilność (Akshayp7 - https://github.com/akshayp7/playwright-typescript-playwright-test):** Zaawansowane WebActions, rozbudowane raportowanie w Allure i obsługa plików (PDF/Excel).
- **Komunikacja Biznesowa (Vitalets - https://github.com/vitalets/playwright-bdd):** Pełne wsparcie dla BDD (Gherkin/Cucumber).

---

## 🛠️ Dlaczego Fixtures? (Modern Approach)

Nasz framework rezygnuje z tradycyjnego, manualnego tworzenia obiektów stron w każdym teście na rzecz mechanizmu **Fixtures**.

**Dlaczego to przełomowe rozwiązanie?**

- **Wstrzykiwanie Zależności (DI):** Nie musisz pisać `const loginPage = new LoginPage(page)`. Playwright sam dostarcza gotowy obiekt strony prosto do argumentów testu.
- **Leniwa Inicjalizacja:** Obiekty stron są tworzone tylko wtedy, gdy test faktycznie ich potrzebuje, co oszczędza zasoby.
- **Czystość Kodu:** Testy stają się krótkie i skupione wyłącznie na logice biznesowej.
- **Integracja BDD:** Fixtures stanowią naturalny pomost dla kroków w Gherkinie, pozwalając na łatwe współdzielenie stanu między krokami.

---

## 📂 Struktura folderu `src`

Cała inteligencja frameworka jest odseparowana od samych testów i znajduje się w katalogu `src`.

### 🧩 `pageObjects/`

Serce wzorca POM (Page Object Model). Tutaj mapujemy interfejs aplikacji na kod.

- **`pages/`**: Klasy reprezentujące pełne strony (np. `login.page.ts`). Odpowiadają za nawigację i główne akcje na danym adresie URL.
- **`components/`**: Reużywalne klasy reprezentujące fragmenty interfejsu (od prostych przycisków i pól wyboru, po złożone struktury jak tabele, menu nawigacyjne, widgety, czy okna modalne). Pozwalają na atomowe podejście do budowy Page Objectów.
- **`base.page.ts`**: Klasa abstrakcyjna, która stanowi fundament dla każdej strony. To tutaj "montujemy" wspólne elementy jak Header czy Footer.
- **`base.pageComponent.ts`**: Klasa bazowa dla wszystkich komponentów. Zawiera wspólny konstruktor i podstawowe metody, dzięki czemu każdy widget czy menu w Twoim frameworku ma natywny dostęp do tych samych narzędzi (np. WebActions) bez powielania kodu.

### 🔌 `fixtures/`

"Silnik" wstrzykiwania stron.

- **`pageFixture.ts`**: Plik konfigurujący, jakie obiekty stron mają być automatycznie dostępne dla programisty w testach.

### 🛠️ `utils/`

Skrzynka z narzędziami zwiększającymi stabilność i możliwości frameworka.

- **`WebActions.ts`**: Silnik operacyjny frameworka. Rozszerza standardowe akcje Playwrighta o:
    - **Smart Clicks**: Obsługa kliknięć przez tekst oraz "awaryjnych" kliknięć przez JS.
    - **File Management**: Wbudowane metody do odczytu/zapisu plików tekstowych.
    - **Advanced Data Verification**: Natywne wsparcie dla wyciągania treści z plików PDF oraz danych z arkuszy Excel (.xlsx).
- **`testConfig.ts`**: Zarządzanie środowiskami (DEV/STAGE/PROD) oraz danymi wrażliwymi poprzez pliki `.env`.
- **`PDFUtil.ts` / `ExcelUtil.ts`** – Zaawansowana weryfikacja oraz odczyt plików nie-webowych.
- **`MailUtil.ts`**: Moduł przygotowany do obsługi poczty elektronicznej (np. przechwytywanie kodów MFA, linków aktywacyjnych). Wspiera integrację z profesjonalnymi API (Mailosaur) oraz darmowymi protokołami (IMAP).
- **`DatabaseUtil.ts`**: Uniwersalny moduł typu *Plug & Play* do komunikacji z bazami SQL.
    - **Wsparcie Multi-Database**: Gotowa konfiguracja dla **PostgreSQL** oraz **MySQL** (wymaga jedynie odkomentowania odpowiedniego sterownika).
    - **Rozszerzalność**: Architektura pozwala na łatwe dodanie wsparcia dla MS SQL Server, Oracle czy SQLite.
    - **Zaawansowane Akcje**: Poza surowymi zapytaniami, oferuje gotowe metody do:
        - `isRecordPresent`: Szybka weryfikacja istnienia danych.
        - `getSingleValue`: Pobieranie konkretnych identyfikatorów (np. ID zamówienia).
        - `truncateTable`: Automatyczne czyszczenie środowiska przed/po testach.

---

## 🧪 Organizacja Testów

Stosujemy hybrydowy podział testów, oddzielając formę techniczną od priorytetu biznesowego:

### 📁 Struktura plików

- `tests/specs/` – Testy funkcjonalne oparte na kodzie TypeScript (`.spec.ts`).
- `tests/features/` – Scenariusze biznesowe (BDD) opisane w języku Gherkin (`.feature`).
- `tests/steps/` – Definicje kroków dla plików BDD (Step Definitions).

### 🏷️ Kategoryzacja (Tagowanie)

Nie stosujemy sztywnego podziału na foldery `smoke/regression`. Zamiast tego używamy **tagów**:

- `@smoke` – Krytyczne ścieżki (odpalane po każdym wdrożeniu).
- `@regression` – Pełny zestaw testów.
- `@ui` / `@api` – Rozróżnienie warstwy testowej.

Dzięki temu jeden test może należeć do wielu kategorii jednocześnie.

---

## 🛡️ Quality Gate & Standardy Kodu

Framework wymusza najwyższą jakość kodu dzięki automatycznym mechanizmom kontroli. To nie tylko testy, to czysty kod.

- **ESLint v9 (Flat Config):** Korzystamy z najnowszego standardu konfiguracji (`eslint.config.mjs`). Narzędzie to nie tylko wykrywa błędy składniowe, ale pilnuje dobrych praktyk specyficznych dla Playwrighta (plugin `eslint-plugin-playwright`), co zapobiega pisaniu niestabilnych testów.
- **Prettier:** Działa jako "strażnik estetyki". Automatycznie ujednolica formatowanie plików (wcięcia, średniki, typ cudzysłowu). Dzięki integracji z ESLintem (`eslint-config-prettier`), oba narzędzia współpracują w pełnej harmonii – Prettier dba o wygląd, a ESLint o logikę kodu.
- **Git Discipline:** Dzięki odpowiedniej konfiguracji `.gitignore`, repozytorium pozostaje lekkie i bezpieczne – dane wrażliwe (`.env`) oraz ciężkie zależności (`node_modules`) nigdy nie trafiają do kontroli wersji.

---

## ⚙️ Zarządzanie Konfiguracją (`.env` & `testConfig`)

Framework wykorzystuje bezpieczny i elastyczny system zarządzania danymi testowymi, oddzielając logikę testów od parametrów środowiskowych.

### 🔐 Plik `.env` (Sekrety i Zmienne)
Wszystkie dane wrażliwe oraz parametry zależne od środowiska przechowywane są w pliku `.env` w głównym katalogu projektu. Plik ten jest ignorowany przez Git, co gwarantuje bezpieczeństwo haseł i kluczy API.
- **Dynamiczne adresy URL:** Możliwość szybkiego przełączania między środowiskami (QA, DEV).
- **Zmienne czasowe:** Centralne sterowanie czasem oczekiwania (`WAIT_FOR_ELEMENT`).

### 📄 Szablon Konfiguracji (`.env.example`)
W repozytorium znajduje się plik `.env.example`, który służy jako wzorzec struktury zmiennych. 
- **Zastosowanie:** Dokumentuje on wszystkie wymagane klucze konfiguracji bez ujawniania rzeczywistych danych (haseł, prywatnych URL-i).
- **Instrukcja:** Aby uruchomić framework, skopiuj ten plik, zmień jego nazwę na `.env` i uzupełnij wartości zgodnie z Twoim środowiskiem testowym.

### 🧩 `testConfig.ts` (Twój Kontroler)
Plik `src/utils/testConfig.ts` działa jako inteligentny łącznik. Odczytuje on wartości z `.env` za pomocą biblioteki `dotenv` i udostępnia je reszcie frameworka w sposób ustrukturyzowany:
- **Typowanie:** Konwertuje tekstowe dane z `.env` na liczby lub typy logiczne (np. `parseInt` dla timeoutów).
- **Bezpieczniki (Fail-safes):** Definiuje wartości domyślne, dzięki którym testy nie zostaną przerwane nawet w przypadku braku pojedynczej zmiennej w pliku `.env`.

---

## 📊 Raportowanie (Allure Report)

Framework integruje się z **Allure Report**, dostarczając szczegółowe, wizualne raporty z przebiegu testów.

### ⚙️ Funkcje raportu:
* **Automatyczne Artefakty**: Screenshoty i nagrania wideo są dołączane automatycznie do raportu w przypadku błędu (`on-failure`).
* **Trace Viewer**: Integracja z Playwright Trace Viewer pozwala na analizę krok po kroku na osi czasu.
* **Kategoryzacja**: Możliwość tagowania testów (Severity, Feature, Story) dla lepszej przejrzystości.

### 🚀 Jak przeglądać raporty?
Po zakończeniu testów wykonaj poniższą komendę, aby wygenerować i otworzyć interaktywny raport w przeglądarce:

---

## ♿ Dostępność (a11y)

Framework jest **a11y-ready**. Posiada strukturę przygotowaną pod audyty dostępności cyfrowej:
- **Silnik Axe:** Gotowość do integracji z `@axe-core/playwright` w celu automatycznego wykrywania naruszeń standardów WCAG.
- **Rygorystyczne lokatory:** Promujemy używanie ról i tekstów (User-Centric Locators), co naturalnie wspiera testowanie dostępności.

