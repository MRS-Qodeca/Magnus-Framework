# 🚀 Playwright Hybrid Framework: MRS-Boilerplate

## 🌟 Wprowadzenie

Witaj w **MRS-Boilerplate** – nowoczesnym, hybrydowym szkielecie do testów automatycznych. Projekt ten powstał z połączenia trzech potężnych podejść do automatyzacji, biorąc z każdego to, co najlepsze:

- **Struktura i Mechanika (Angelo Loria):** Solidny wzorzec POM z wykorzystaniem komponentów i fixtures.
- **Narzędzia i Stabilność (Akshayp7):** Zaawansowane WebActions, rozbudowane raportowanie w Allure i obsługa plików (PDF/Excel).
- **Komunikacja Biznesowa (Vitalets):** Pełne wsparcie dla BDD (Gherkin/Cucumber).

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
- **`components/`**: Reużywalne klasy reprezentujące fragmenty interfejsu (od prostych przycisków i pól wyboru, po złożone struktury jak tabele, menu nawigacyjne czy okna modalne). Pozwalają na atomowe podejście do budowy Page Objectów.
- **`base.page.ts`**: Klasa abstrakcyjna, która stanowi fundament dla każdej strony. To tutaj "montujemy" wspólne elementy jak Header czy Footer.

### 🔌 `fixtures/`

"Silnik" wstrzykiwania stron.

- **`pageFixture.ts`**: Plik konfigurujący, jakie obiekty stron mają być automatycznie dostępne dla programisty w testach.

### 🛠️ `utils/`

Skrzynka z narzędziami zwiększającymi stabilność i możliwości frameworka.

- **`WebActions.ts`**: Wrappery na standardowe metody Playwrighta, wzbogacone o logowanie akcji i inteligentne mechanizmy oczekiwania.
- **`testConfig.ts`**: Zarządzanie środowiskami (DEV/STAGE/PROD) oraz danymi wrażliwymi poprzez pliki `.env`.
- **`PDFUtil.ts` / `ExcelUtil.ts`** – Zaawansowana weryfikacja plików nie-webowych.

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
