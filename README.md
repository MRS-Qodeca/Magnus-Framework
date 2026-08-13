# 🛡️ MAGNUS: The Test Automation Engine

> **Language / Język:** [🇬🇧 English Version](#-english-version) | [🇵🇱 Wersja Polska](#-wersja-polska)

<!-- ================================================================= -->

## 🇬🇧 English Version

<!-- ================================================================= -->

## 🌟 I. Introduction

Welcome to **Magnus Framework** – a modern, hybrid test automation skeleton. This project was built by combining three powerful approaches to test automation, taking the best practices from each:

- **Structure & Mechanics (Angelo Loria - https://github.com/angelo-loria/playwright-boilerplate):** A robust POM pattern using components and fixtures.
- **Utilities & Stability (Akshayp7 - https://github.com/akshayp7/playwright-typescript-playwright-test):** Advanced WebActions, comprehensive Allure reporting, and file handling (PDF/Excel).
- **Business Communication (Vitalets - https://github.com/vitalets/playwright-bdd):** Full BDD support (Gherkin/Cucumber).

---

## 📋 II. Quick Start Guide

This guide is designed to get the framework up and running in 5 minutes, regardless of your experience level.

---

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (LTS version recommended) – [Download here](https://nodejs.org/)
- **VS Code** (Code Editor) – [Download here](https://code.visualstudio.com/)
- **Git** – [Download here](https://git-scm.com/)

---

### Step-by-Step Installation

Follow the steps below to set up the Magnus environment and run your first tests.

#### 1. Clone the repository

Download the project to your local drive:
`git clone https://github.com/MRS-Qodeca/Magnus-Framework.git`

To navigate to the new project directory, run in your terminal:
`cd Magnus-Framework`

#### 2. Install dependencies

Run `npm install`. This command will download all required packages and dependencies.

#### 3. Install Playwright browsers

Download the necessary browser engines (Chromium, Firefox, WebKit):
`npx playwright install`

#### 4. Configure environment variables

The framework uses a `.env` file to store sensitive data and configurations.

- Rename the `.env.example` file to `.env` in the root directory of the project.
- Enter the environment details specific to your target project.

#### 5. Prepare BDD tests (Optional)

Since Magnus uses `playwright-bdd`, you need to generate test files before running tests for the first time (or after any changes to `.feature` files):
`npm run bdd:gen`

#### 6. Run tests

You can use predefined scripts in `package.json`:

- All tests (Spec + BDD): `npm run test:all`
- Spec tests only: `npm run test:specs`
- BDD tests only: `npm run test:bdd`
- Tests on Chromium: `npm run test:chromium`
- UI Mode (Interactive): `npm run test:ui`
- Critical tests (@critical tag): `npm run test:critical`

Additional scripts are described in the corresponding section of `package.json`.

#### 7. Reports (Optional Allure Reports)

To generate and open a clear graphical report after test execution:

**Playwright Test Report:**

- Generate standard Playwright report: `npm run report`

**Allure Report:**

- Clear old results: `npm run allure:clear`
- Generate and open report: `npm run allure:report`

---

## 🛠️ III. Why Fixtures? (Modern Approach)

Our framework moves away from traditional, manual page object instantiation in every test, leveraging the **Fixtures** mechanism instead.

**Why is this a game-changer?**

- **Dependency Injection (DI):** No need to write `const loginPage = new LoginPage(page)`. Playwright automatically injects the ready-to-use page object directly into test arguments.
- **Lazy Initialization:** Page objects are instantiated only when the test actually requests them, saving resources.
- **Clean Code:** Tests stay concise and focused purely on business logic.
- **BDD Integration:** Fixtures serve as a natural bridge for Gherkin steps, allowing effortless state sharing across steps.

---

## 📂 IV. `src` Folder Structure

All framework logic is decoupled from the test files and resides inside the `src` directory.

### 🧩 `pageObjects/`

The core of the Page Object Model (POM) pattern. This is where we map the application interface to code.

- **`pages/`**: Classes representing full pages (e.g., `login.page.ts`). Responsible for navigation and primary actions on a specific URL.
- **`components/`**: Reusable classes representing UI fragments (ranging from simple buttons and checkboxes to complex structures like tables, navigation menus, widgets, or modals). Enables an atomic design approach to Page Objects.
- **`base.page.ts`**: An abstract class serving as the foundation for every page. Common elements like Header or Footer are assembled here.
- **`base.pageComponent.ts`**: Base class for all components. Contains a shared constructor and core methods, giving every widget or menu native access to identical tools (e.g., WebActions) without code duplication.

### 🔌 `fixtures/`

The Dependency Injection layer that automates the creation of page and component instances. Thanks to its modular design, the framework allows for rapid test scenario creation without manual object initialization.

- **`pageFixture.ts`**: Page Object instance factory (e.g., `loginPage`). Responsible for defining and supplying specific application pages to tests.
- **`componentFixture.ts`**: The factory for universal components (e.g., `navBar`, `footer`). Connects reusable class templates with specific selectors/configs for a given application.
- **`appFixture.ts`**: **The Command Center.** Uses `mergeTests` to combine page and component fixtures into a single powerful `test` object.

> **Important Rule:** In test files (`*.spec.ts`), always import `test` and `expect` from `appFixture.ts`. This grants test arguments immediate access to all defined pages and components (e.g., `async ({ loginPage, navBar }) => { ... }`).

### 🛠️ `utils/`

A toolbox designed to enhance framework stability and capabilities.

- **`WebActions.ts`**: The operational engine of the framework. Extends standard browser context actions with custom methods, including:
  - **Smart Clicks**: Support for text-based clicks and "fallback" JS clicks.
  - **File Management**: Built-in methods for reading/writing text files.
  - **Advanced Data Verification**: Native support for extracting text from PDF files and reading data from Excel spreadsheets (`.xlsx`).
- **`testConfig.ts`**: Environment management (DEV/STAGE/PROD) and handling of sensitive data via `.env` files.
- **`PDFUtil.ts` / `ExcelUtil.ts`**: Advanced parsing and verification of non-web files (integrated with WebActions).
- **`MailUtil.ts`**: Module designed for email handling (e.g., capturing MFA codes, activation links). Supports integration with professional APIs (Mailosaur) as well as free protocols (IMAP).
- **`DBUtil.ts`**: A universal _Plug & Play_ module for SQL database communication.
  - **Multi-Database Support**: Pre-configured for **PostgreSQL** and **MySQL** (requires only uncommenting the corresponding driver).
  - **Extensibility**: Architecture allows easy extension to MS SQL Server, Oracle, or SQLite.
  - **Advanced Actions**: Beyond raw queries, it offers out-of-the-box methods for:
    - `isRecordPresent`: Quick data existence checks.
    - `getSingleValue`: Fetching specific identifiers (e.g., Order ID).
    - `truncateTable`: Automated environment cleanup before/after tests.

---

## 🥒 V. Behavior-Driven Development (BDD)

Magnus supports the BDD approach via the `playwright-bdd` library. This enables writing test scenarios in plain language (Gherkin) while retaining the full capability of our Page Objects and Fixtures.

### 🏗️ Solution Architecture

To prevent conflicts between traditional `.spec.ts` tests and generated BDD tests, the framework uses **Playwright Projects**.

- **`specs` Project**: Dedicated to technical tests (`tests/specs/*.spec.ts`).
- **`bdd` Project**: Dedicated to business tests, operating on the `.features-gen` folder.

### 🚦 BDD Test Workflow (Step-by-Step)

1. **Create Scenario**
   - In `tests/features/`, create a `.feature` file.
   - Example: `tests/features/login.feature`.

2. **Define Steps (Step Definitions)**
   - In `tests/steps/`, create a `.steps.ts` file.
   - **Important:** Always import `test` from `src/pageObjects/fixtures/appFixture` to preserve Allure logging and access to POM.
   - Example: `import { test } from '../../src/pageObjects/fixtures/appFixture';`

3. **Generate Code (Synchronization)**
   - Any change in a `.feature` file requires regenerating the hidden `.features-gen` folder:
     `npx bddgen`

---

## 🧪 VI. Test Organization

We employ a hybrid test division strategy, separating technical execution formats from business priority:

### 📁 File Structure

- `tests/specs/` – **Scripted Tests** – Tests written directly in TypeScript. Main location for E2E, Integration, API, Security, and Performance tests. Allows full use of framework capabilities and the POM pattern.
- `tests/features/` – **BDD Scenarios** – Plain language descriptions of system behavior (Gherkin), focused on business processes and readable by non-technical stakeholders.
- `tests/steps/` – **Step Definitions** – Technical implementation of Gherkin steps, bridging business language with Page Object logic.

### 🏗️ Projects (Playwright Projects)

The framework utilizes a project system to isolate test environments and browsers, allowing precise execution of targeted test suites:

- **[SPEC]** – Projects dedicated to technical tests (TypeScript).
- **[BDD]** – Projects dedicated to business scenarios (Gherkin/Cucumber).

The `playwright.config.ts` configures the following project groups:

1. **Desktop Browsers**: Full support for Chromium (Chrome, Edge), Firefox, and WebKit (Safari).
2. **Branded Browsers**: Optional verification on commercial distributions (Google Chrome, MS Edge).
3. **Mobile Emulation**: Mobile device emulation (e.g., iPhone 16, Pixel 5) for responsiveness testing.
4. **Lighthouse (WIP)**: Performance and accessibility audits (under implementation).

### ⌨️ Execution Scripts (CLI)

To streamline workflows, dedicated scripts are provided in `package.json`. Every BDD script automatically triggers the generator (`bdd:gen`) to keep test code up to date.

#### Execution by Type:

- `npm run test:specs` – Runs all technical tests across 3 main browsers.
- `npm run test:bdd` – Runs all business scenarios across 3 main browsers.

#### Execution by Platform:

- `npm run test:desktop` – Comprehensive regression suite across all desktop browsers (Chrome, Firefox, Safari) for both layers (SPEC + BDD).
- `npm run test:mobile` – Runs responsiveness tests on emulated mobile devices (Android/iOS).
- `npm run test:branded` – Verification on stable builds of commercial browsers (Google Chrome, Microsoft Edge).

> **⚠️ Note on Optional Projects:** Projects in the **Mobile** and **Branded** groups are commented out by default in `playwright.config.ts`. This reduces execution times in standard CI/CD pipelines and avoids errors on environments without commercial browsers installed. To use them, uncomment the relevant entries in the `projects` array.

#### Execution by Browser:

- `npm run test:chromium` – Runs SPEC + BDD suites on Chromium engine only.
- `npm run test:firefox` – Runs SPEC + BDD suites on Firefox engine only.
- `npm run test:webkit` – Runs SPEC + BDD suites on Safari engine only.

#### Special Modes:

- `npm run test:all` – Full regression run (all projects).
- `npm run test:ui` – Opens the interactive Playwright UI Mode.
- `npm run test:debug` – Runs tests in debug mode (Playwright Inspector).

> **Pro Tip:** Before executing tests, the `pretest` script automatically terminates orphaned Chrome browser processes, preventing file locks and improving local run stability.

### 🏷️ Categorization (Tagging)

We do not rely on rigid folder structures for classification. Instead, we use a multi-tiered **tagging system** for fine-grained control over CI/CD queues:

#### 🚀 Criticality Levels (Business Priority)

- `@smoke` – Fast health check (is the app alive?).
- `@critical` – Core business flows (Critical Path) where failure blocks business operation.
- `@regression` – Full system stability verification suite.

#### 🛠️ Types and Layers (Testing Type)

- `@ui` – Functional tests driven through the user interface.
- `@api` – Integration layer and endpoint tests (fast and stable).
- `@visual` – Visual regression tests (screenshot comparisons/pixel matching).
- `@performance` – Performance tests (response times, load).
- `@security` – Vulnerability and permission testing.

#### 🔍 Perspective and Paths (Test Perspective)

- `@functional` – Standard application features (Happy Path) outside critical paths.
- `@negative` – Negative scenarios (error validation, invalid data, missing permissions).
- `@edge-case` – Boundary condition and edge behavior tests.

#### 🧪 Status and Stability

- `@flaky` – Tests with unstable outcomes requiring fixes (isolated from main reports).
- `@wip` – Tests currently being written (Work In Progress).

---

## ⚙️ VII. Configuration Management (`.env` & `testConfig`)

The framework implements a secure, flexible test data management system that decouples test logic from environment parameters.

### 🔐 `.env` File (Secrets and Variables)

All sensitive data and environment-specific parameters are stored in a `.env` file at the root of the project. This file is ignored by Git to keep passwords and API keys secure.

- **Dynamic URLs:** Quick toggling between environments (QA, DEV).
- **Time Variables:** Centralized timeout management (`WAIT_FOR_ELEMENT`).

### 📄 Configuration Template (`.env.example`)

A `.env.example` file is included in the repository as a structural template.

- **Purpose:** Documents all required configuration keys without exposing real data (passwords, private URLs).
- **Instructions:** Copy this file, rename it to `.env`, and populate the values according to your test environment.

### 🧩 `testConfig.ts` (Your Controller)

`src/utils/testConfig.ts` acts as a smart bridge. It reads `.env` values using `dotenv` and exposes them in a structured format across the framework:

- **Type Casting:** Converts text values from `.env` into numbers or booleans (e.g., `parseInt` for timeouts).
- **Fail-safes:** Defines fallback defaults so missing variables in `.env` do not break test execution.

---

## 🏗️ VIII. Framework Hierarchy & Architecture

The tables below detail the structure, file responsibilities, and dependency flows within our boilerplate.

### ⚙️ 1. Configuration Layer (Data & Environment)

_Determines WHERE and HOW tests are executed._

| File                   | Responsibility                                      | Dependencies (Imports) | Access To...     |
| :--------------------- | :-------------------------------------------------- | :--------------------- | :--------------- |
| `.env`                 | Stores credentials, logins, and URLs (uncommitted). | None                   | Operating System |
| `testConfig.ts`        | Maps `.env` variables to TypeScript object.         | `dotenv`, `path`       | `.env`           |
| `playwright.config.ts` | Engine setup: timeouts, browsers, reports (Allure). | `testConfig.ts`        | Entire Framework |

---

### 🛠️ 2. Utility Layer (Utils)

_Technical task specialists. The "muscles" of the framework._

| File            | Responsibility                                              | Dependencies                           | Usage                      |
| :-------------- | :---------------------------------------------------------- | :------------------------------------- | :------------------------- |
| `WebActions.ts` | Resilient UI actions (click, fill), PDF and Excel handling. | `playwright`, `fs`, `exceljs`, `pdfjs` | Injected into `BasePage`   |
| `MailUtils.ts`  | Email API integration (capturing links/MFA codes).          | HTTP/API Library                       | Called in tests (Fixtures) |
| `DbUtils.ts`    | Database communication (SQL/NoSQL).                         | DB Drivers                             | Called in tests (Fixtures) |

---

### 🧱 3. POM Abstraction Layer (Foundation)

_Standards for all page objects and components._

| File                   | Responsibility                                    | Key Features                                         |
| :--------------------- | :------------------------------------------------ | :--------------------------------------------------- |
| `BasePage.ts`          | Parent class for Pages. Initializes `WebActions`. | Protected access to `this.page` and `this.actions`.  |
| `BasePageComponent.ts` | Parent class for Components (e.g., Navbar).       | Operates on `rootLocator` (scoped inside component). |

---

### 🔌 4. Fixture Layer

_Application mapping and automated dependency injection._

| File                  | Responsibility                                                 | Operates On...                         |
| :-------------------- | :------------------------------------------------------------- | :------------------------------------- |
| `pageFixture.ts`      | Page Object instance factory (e.g., `loginPage`).              | Classes extending `BasePage`.          |
| `componentFixture.ts` | Component instance factory (e.g., `navBar`).                   | Classes extending `BasePageComponent`. |
| `appFixture.ts`       | Command Center. Combines all fixtures and manages Allure tags. | `mergeTests` (Entry point for tests).  |

---

### 🏗️ 5. Implementation Layer (Concrete POM)

_Lowest hierarchy level of business logic – direct UI representation._

| Type                  | Responsibility                                    | Example Usage                                       |
| :-------------------- | :------------------------------------------------ | :-------------------------------------------------- |
| **Page Classes**      | Define locators and methods for full pages (E2E). | `LoginPage.ts`, `CheckoutPage.ts`, `AccountPage.ts` |
| **Component Classes** | Define reusable UI fragments (widgets, menus).    | `NavBar.ts`, `SearchModal.ts`, `ProductCard.ts`     |

> **Flow Rule:** Implementation classes extend Foundation (3), are instantiated in Fixtures (4), and their methods are ultimately invoked inside Tests (`specs`).

---

## 🛡️ IX. Quality Gate & Code Standards

The framework enforces code quality through automated checks to maintain a clean codebase.

- **ESLint v9 (Flat Config):** Configured via `eslint.config.mjs`. Detects syntax issues and enforces Playwright-specific best practices (`eslint-plugin-playwright`) to prevent test flakiness.
- **Prettier:** Handles code formatting (indentation, semicolons, quotes). Integrated with ESLint (`eslint-config-prettier`) so both tools run in harmony—Prettier controls style while ESLint handles code logic.
- **Git Discipline:** Proper `.gitignore` setup ensures sensitive data (`.env`) and heavy dependencies (`node_modules`) are excluded from version control.

---

## 📊 X. Reporting (Allure Report)

The framework integrates with **Allure Report** to deliver detailed, visual test execution insights.

### ⚙️ Report Features:

- **Engine Artifacts**: Integrated with Playwright to attach screenshots and video recordings on failure (`on-failure`).
- **Trace Viewer Analysis**: Includes direct links to trace files that can be downloaded and opened in Trace Viewer for timeline analysis.
- **Dynamic Categorization**: Automatically maps `@` tags from test names to native Allure metadata (Tags, Severity) for filtering without extra code.

### 🚀 How to View Reports?

After running tests, execute the command below to generate and serve the interactive report in your browser:
`npx allure serve allure-results`

### Available Allure Scripts:

- `npm run allure:clear` – Clears old test results.
- `npm run allure:report` – Generates and serves the Allure report locally.

---

## ♿ XI. Accessibility Testing (A11y)

Magnus incorporates the **Axe-core** engine (via `@axe-core/playwright`), an industry standard for automated accessibility auditing. These checks verify compliance with **WCAG 2.1** guidelines.

### 🔍 How It Works

The engine evaluates the live DOM tree, checking accessibility rules without manual scanning steps. In Magnus, audits cover:

- **Standard Compliance:** Checks Level **A** and **AA** tags (`wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`).
- **Contrast Analysis:** Calculates text-to-background luminance ratios.
- **Semantic Structure:** Validates HTML5 markup correctness (e.g., checking that buttons use `<button>` tags instead of empty `<div>` elements).
- **Interactivity:** Verifies interactive controls contain appropriate screen reader labels (`aria-label`, `label`).

### 🛠️ Usage in Projects

Integrated into `BasePage`, accessibility auditing is accessible to every Page Object and can be called inside Spec tests or BDD scenarios.

**Code Example (`.spec.ts`):**
`await dropdownPage.verifyAccessibility('Dropdown Page Audit');`

<!-- ================================================================= -->

## 🇵🇱 Wersja Polska

<!-- ================================================================= -->

# 🛡️ MAGNUS: The Test Automation Engine

## 🌟 I. Wprowadzenie

Witaj w **Magnus Framework** – nowoczesnym, hybrydowym szkielecie do testów automatycznych. Projekt ten powstał z połączenia trzech potężnych podejść do automatyzacji, biorąc z każdego to, co najlepsze:

- **Struktura i Mechanika (Angelo Loria - https://github.com/angelo-loria/playwright-boilerplate):** Solidny wzorzec POM z wykorzystaniem komponentów i fixtures.
- **Narzędzia i Stabilność (Akshayp7 - https://github.com/akshayp7/playwright-typescript-playwright-test):** Zaawansowane WebActions, rozbudowane raportowanie w Allure i obsługa plików (PDF/Excel).
- **Komunikacja Biznesowa (Vitalets - https://github.com/vitalets/playwright-bdd):** Pełne wsparcie dla BDD (Gherkin/Cucumber).

---

## 📋 II: Instrukcja Szybkiego Startu

Ta instrukcja została zaprojektowana tak, aby umożliwić uruchomienie frameworka w 5 minut, niezależnie od poziomu zaawansowania użytkownika.

---

### Wymagania wstępne

Zanim zaczniesz, upewnij się, że na Twoim komputerze zainstalowane są:

- **Node.js** (zalecana wersja LTS) – [Pobierz tutaj](https://nodejs.org/)
- **VS Code** (edytor tekstu) – [Pobierz tutaj](https://code.visualstudio.com/)
- **Git** – [Pobierz tutaj](https://git-scm.com/)

---

### Instalacja krok po kroku

Podążaj za poniższymi krokami, aby przygotować środowisko Magnus i uruchomić pierwsze testy.

#### 1. Klonowanie repozytorium

Pobierz projekt na swój dysk lokalny:
`git clone https://github.com/MRS-Qodeca/Magnus-Framework.git`
Aby przejść do katalogu nowego projektu, wpisz w terminalu:
`cd Magnus-Framework`

#### 2. Instalacja zależności

Wykonaj komendę `npm install`. Pobierze ona wszystkie potrzebne paczki i zależności.

#### 3. Instalacja przeglądarek Playwright

Pobierz niezbędne silniki przeglądarek (Chromium, Firefox, WebKit):
`npx playwright install`

#### 4. Konfiguracja zmiennych środowiskowych

Framework korzysta z pliku `.env` do przechowywania wrażliwych danych i konfiguracji.

- Zmień nazwę pliku `.env.example` na `.env` w głównym katalogu projektu
- Wprowadź w nim dane środowiskowe dla docelowego projektu

#### 5. Przygotowanie testów BDD (opcjonalnie)

Ponieważ Magnus korzysta z playwright-bdd, przed pierwszym uruchomieniem (lub po każdej zmianie w plikach .feature) należy wygenerować pliki testowe:
`npm run bdd:gen`

#### 6. Uruchamianie testów

Możesz korzystać z predefiniowanych skryptów w `package.json`:

- Wszystkie testy (Spec + BDD): `npm run test:all`
- Wyłącznie testu typu Spec: `npm run test:specs`
- Wyłącznie testy typu BDD: `npm run test:bdd`
- Testy na Chromium: `npm run test:chromium`
- Tryb UI (Interaktywny): `npm run test:ui`
- Testy krytyczne (Tag @critical): `npm run test:critical`

Pozostałe skrypty zostały opisane w odpowiedniej sekcji w pliku `package.json`.

#### 7. Raporty (opcjonalnie raporty Allure)

Aby wygenerować i otworzyć czytelny raport graficzny po testach:

**Playwright Test Report:**

- Wygenerowanie standardowego raportu Playwright: `npm run report`

**Allure**

- Wyczyszczenie starych wyników: `npm run allure:clear`
- Wygenerowanie i otwarcie raportu `npm run allure:report`

---

## 🛠️ III. Dlaczego Fixtures? (Modern Approach)

Nasz framework rezygnuje z tradycyjnego, manualnego tworzenia obiektów stron w każdym teście na rzecz mechanizmu **Fixtures**.

**Dlaczego to przełomowe rozwiązanie?**

- **Wstrzykiwanie Zależności (DI):** Nie musisz pisać `const loginPage = new LoginPage(page)`. Playwright sam dostarcza gotowy obiekt strony prosto do argumentów testu.
- **Leniwa Inicjalizacja:** Obiekty stron są tworzone tylko wtedy, gdy test faktycznie ich potrzebuje, co oszczędza zasoby.
- **Czystość Kodu:** Testy stają się krótkie i skupione wyłącznie na logice biznesowej.
- **Integracja BDD:** Fixtures stanowią naturalny pomost dla kroków w Gherkinie, pozwalając na łatwe współdzielenie stanu między krokami.

---

## 📂 IV. Struktura folderu `src`

Cała inteligencja frameworka jest odseparowana od samych testów i znajduje się w katalogu `src`.

### 🧩 `pageObjects/`

Serce wzorca POM (Page Object Model). Tutaj mapujemy interfejs aplikacji na kod.

- **`pages/`**: Klasy reprezentujące pełne strony (np. `login.page.ts`). Odpowiadają za nawigację i główne akcje na danym adresie URL.
- **`components/`**: Reużywalne klasy reprezentujące fragmenty interfejsu (od prostych przycisków i pól wyboru, po złożone struktury jak tabele, menu nawigacyjne, widgety, czy okna modalne). Pozwalają na atomowe podejście do budowy Page Objectów.
- **`base.page.ts`**: Klasa abstrakcyjna, która stanowi fundament dla każdej strony. To tutaj "montujemy" wspólne elementy jak Header czy Footer.
- **`base.pageComponent.ts`**: Klasa bazowa dla wszystkich komponentów. Zawiera wspólny konstruktor i podstawowe metody, dzięki czemu każdy widget czy menu w Twoim frameworku ma natywny dostęp do tych samych narzędzi (np. WebActions) bez powielania kodu.

### 🔌 `fixtures/`

Warstwa wstrzykiwania zależności (Dependency Injection), która automatyzuje tworzenie instancji stron i komponentów. Dzięki strukturze modułowej, framework pozwala na błyskawiczne budowanie scenariuszy testowych bez ręcznej inicjalizacji obiektów.

- **`pageFixture.ts`**: Fabryka instancji Page Objectów (np. `loginPage`). Odpowiada za definiowanie i dostarczanie konkretnych stron aplikacji do testów.
- **`componentFixture.ts`**: "Szwalnia" uniwersalnych komponentów (np. `navBar`, `footer`). To tutaj łączymy uniwersalne szablony klas z konkretnymi selektorami (configami) dla danej aplikacji.
- **`appFixture.ts`**: **Centrum Dowodzenia.** Wykorzystuje funkcję `mergeTests`, aby scalić fixtury stron i komponentów w jeden potężny obiekt `test`.

> **Ważna zasada:** W plikach testowych `*.spec.ts` zawsze importujemy `test` oraz `expect` z `appFixture.ts`. Dzięki temu w argumentach testu mamy od razu dostęp do wszystkich zdefiniowanych stron i komponentów (np. `async ({ loginPage, navBar }) => { ... }`).

### 🛠️ `utils/`

Skrzynka z narzędziami zwiększającymi stabilność i możliwości frameworka.

- **`WebActions.ts`**: Silnik operacyjny frameworka. Rozszerza standardowe akcje w kontekście przeglądarki o dodatkowe metody, w tym:
  - **Smart Clicks**: Obsługa kliknięć przez tekst oraz "awaryjnych" kliknięć przez JS.
  - **File Management**: Wbudowane metody do odczytu/zapisu plików tekstowych.
  - **Advanced Data Verification**: Natywne wsparcie dla wyciągania treści z plików PDF oraz danych z arkuszy Excel (.xlsx).
- **`testConfig.ts`**: Zarządzanie środowiskami (DEV/STAGE/PROD) oraz danymi wrażliwymi poprzez pliki `.env`.
- **`PDFUtil.ts` / `ExcelUtil.ts`** – Zaawansowana weryfikacja oraz odczyt plików nie-webowych (zintegrowane z WebActions).
- **`MailUtil.ts`**: Moduł przygotowany do obsługi poczty elektronicznej (np. przechwytywanie kodów MFA, linków aktywacyjnych). Wspiera integrację z profesjonalnymi API (Mailosaur) oraz darmowymi protokołami (IMAP).
- **`DBUtil.ts`**: Uniwersalny moduł typu _Plug & Play_ do komunikacji z bazami SQL.
  - **Wsparcie Multi-Database**: Gotowa konfiguracja dla **PostgreSQL** oraz **MySQL** (wymaga jedynie odkomentowania odpowiedniego sterownika).
  - **Rozszerzalność**: Architektura pozwala na łatwe dodanie wsparcia dla MS SQL Server, Oracle czy SQLite.
  - **Zaawansowane Akcje**: Poza surowymi zapytaniami, oferuje gotowe metody do:
    - `isRecordPresent`: Szybka weryfikacja istnienia danych.
    - `getSingleValue`: Pobieranie konkretnych identyfikatorów (np. ID zamówienia).
    - `truncateTable`: Automatyczne czyszczenie środowiska przed/po testach.

---

## 🥒 V. Behavior-Driven Development (BDD)

Magnus wspiera podejście BDD przy użyciu biblioteki `playwright-bdd`. Pozwala to na pisanie scenariuszy testowych w języku naturalnym (Gherkin), przy jednoczesnym zachowaniu pełnej mocy naszych Page Objectów i Fixtur.

### 🏗️ Architektura Rozwiązania

Aby uniknąć konfliktów między tradycyjnymi testami `.spec.ts` a generowanymi testami BDD, framework wykorzystuje **Playwright Projects**.

- **Projekt `specs`**: Przeznaczony dla klasycznych testów technicznych (`tests/specs/*.spec.ts`).
- **Projekt `bdd`**: Przeznaczony dla testów biznesowych, operujący na folderze `.features-gen`.

### 🚦 Cykl pracy z testem BDD (Step-by-Step)

1. **Stworzenie Scenariusza**
   - W folderze `tests/features/` utwórz plik `.feature`.
   - Przykład: `tests/features/login.feature`.

2. **Definicja Kroków (Step Definitions)**
   - W folderze `tests/steps/` utwórz plik `.steps.ts`.
   - **Ważne:** Zawsze importuj `test` z `src/pageObjects/fixtures/appFixture`, aby zachować logowanie Allure i dostęp do POM.
   - Przykład: `import { test } from '../../src/pageObjects/fixtures/appFixture';`

3. **Generowanie Kodu (Synchronizacja)**
   - Każda zmiana w pliku `.feature` wymaga odświeżenia ukrytego folderu `.features-gen`:
     npx bddgen

---

## 🧪 VI. Organizacja Testów

Stosujemy hybrydowy podział testów, oddzielając formę techniczną od priorytetu biznesowego:

### 📁 Struktura plików

- `tests/specs/` – **Scripted Tests** – testy pisane bezpośrednio w TypeScript. To główne miejsce na testy E2E, integracyjne, API, bezpieczeństwa oraz wydajnościowe. Pozwalają na pełne wykorzystanie mocy frameworka i wzorca POM.
- `tests/features/` – **BDD Scenarios** – opisy zachowań systemu w języku naturalnym (Gherkin), skupione na procesach biznesowych i czytelne dla osób nietechnicznych.
- `tests/steps/` – **Step Definitions** – techniczna implementacja kroków Gherkin, łącząca język biznesowy z logiką zapisaną w Page Objectach.

### 🏗️ Projekty (Playwright Projects)

Framework wykorzystuje system projektów do separacji środowisk testowych i przeglądarek. Pozwala to na precyzyjne uruchamianie konkretnych zestawów testów:

- **[SPEC]** – Projekty dedykowane testom technicznym (TypeScript).
- **[BDD]** – Projekty dedykowane scenariuszom biznesowym (Gherkin/Cucumber).

W konfiguracji `playwright.config.ts` zdefiniowano następujące grupy:

1.  **Desktop Browsers**: Pełne wsparcie dla silników Chromium (Chrome, Edge), Firefox oraz WebKit (Safari).
2.  **Branded Browsers**: Opcjonalna weryfikacja na konkretnych dystrybucjach (Google Chrome, MS Edge).
3.  **Mobile Emulation**: Emulacja urządzeń mobilnych (np. iPhone 16, Pixel 5) dla testów responsywności.
4.  **Lighthouse (WIP)**: Audyty wydajnościowe i dostępnościowe (w trakcie implementacji).

### ⌨️ Skrypty uruchomieniowe (CLI)

W celu uproszczenia pracy z frameworkiem przygotowano dedykowane skrypty w `package.json`. Każdy skrypt BDD automatycznie wywołuje generator (`bdd:gen`), zapewniając aktualność kodu testowego.

#### Wykonanie według typu:

- `npm run test:specs` – Uruchamia wszystkie testy techniczne na 3 głównych przeglądarkach.
- `npm run test:bdd` – Uruchamia wszystkie scenariusze biznesowe na 3 głównych przeglądarkach.

#### Wykonanie według platformy:

- `npm run test:desktop` – Kompleksowy test regresyjny na wszystkich desktopowych przeglądarkach (Chrome, Firefox, Safari) dla obu warstw (SPEC + BDD).
- `npm run test:mobile` – Uruchamia testy responsywności na emulowanych urządzeniach mobilnych (Android/iOS).
- `npm run test:branded` – Weryfikacja na stabilnych wersjach przeglądarek komercyjnych (Google Chrome, Microsoft Edge).

> **⚠️ Uwaga dot. projektów opcjonalnych:** Projekty z grup **Mobile** oraz **Branded** są w `playwright.config.ts` domyślnie zakomentowane. Pozwala to na skrócenie czasu trwania testów w standardowej kolejce CI/CD oraz zapobiega błędom na środowiskach, które nie posiadają zainstalowanych przeglądarek komercyjnych. Aby z nich skorzystać, odkomentuj odpowiednie sekcje w tablicy `projects`.

#### Wykonanie według przeglądarki:

- `npm run test:chromium` – Odpala zestaw SPEC + BDD tylko na silniku Chromium.
- `npm run test:firefox` – Odpala zestaw SPEC + BDD tylko na silniku Firefox.
- `npm run test:webkit` – Odpala zestaw SPEC + BDD tylko na silniku Safari.

#### Tryby specjalne:

- `npm run test:all` – Pełne wykonanie regresji (wszystkie projekty).
- `npm run test:ui` – Otwiera interaktywny interfejs Playwright UI Mode.
- `npm run test:debug` – Uruchamia testy w trybie debugowania (Playwright Inspector).

> **Pro Tip:** Przed każdym testem skrypt `pretest` automatycznie czyści wiszące procesy przeglądarki Chrome, co zapobiega blokowaniu plików i zwiększa stabilność lokalnych uruchomień.

### 🏷️ Kategoryzacja (Tagowanie)

W naszych projektach nie stosujemy sztywnego podziału na foldery. Zamiast tego używamy wielowarstwowego systemu **tagów**, co pozwala na precyzyjne sterowanie kolejką testową w CI/CD:

#### 🚀 Poziomy Krytyczności (Business Priority)

- `@smoke` – Błyskawiczny "health check" (czy aplikacja żyje?).
- `@critical` – Kluczowe procesy biznesowe (Critical Path), których awaria oznacza "stop" dla biznesu.
- `@regression` – Pełny zakres weryfikacji stabilności systemu.

#### 🛠️ Typy i Warstwy (Testing Type)

- `@ui` – Testy funkcjonalne przeprowadzane przez interfejs użytkownika.
- `@api` – Testy warstwy integracyjnej i punktów końcowych (szybkie i stabilne).
- `@visual` – Testy regresji wizualnej (porównywanie screenshotów/pixel-match).
- `@performance` – Testy wydajnościowe (czasy odpowiedzi, obciążenie).
- `@security` – Testy pod kątem podatności i uprawnień.

#### 🔍 Perspektywa i Ścieżki (Test Perspective)

- `@functional` – Standardowe funkcje aplikacji (Happy Path) niebędące krytycznymi procesami.
- `@negative` – Scenariusze negatywne (walidacja błędów, nieprawidłowe dane, brak uprawnień).
- `@edge-case` – Testy warunków brzegowych i nietypowych zachowań.

#### 🧪 Status i Stabilność

- `@flaky` – Testy o niestabilnych wynikach, które wymagają naprawy (odizolowane od głównego raportu).
- `@wip` – Testy w trakcie pisania (Work In Progress).

---

## ⚙️ VII. Zarządzanie Konfiguracją (`.env` & `testConfig`)

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

## 🏗️ VIII. Hierarchia i Architektura Frameworka

Poniższe zestawienie opisuje strukturę, odpowiedzialności plików oraz przepływ zależności w naszym boilerplate.

### ⚙️ 1. Warstwa Konfiguracji (Dane & Środowisko)

_Decyduje o tym, GDZIE i JAK uruchamiamy testy._

**| Plik | Odpowiedzialność | Zależności (Importy) | Dostęp do... |**
| `.env` | Przechowywanie haseł, loginów i adresów URL (niecommitowane). | Brak | System operacyjny |
| `testConfig.ts` | Mapowanie zmiennych z `.env` na obiekt TypeScript. | `dotenv`, `path` | `.env` |
| `playwright.config.ts` | Konfiguracja silnika: timeouty, przeglądarki, raporty (Allure). | `testConfig.ts` | Cały framework |

---

### 🛠️ 2. Warstwa Narzędziowa (Utils)

_Specjaliści od zadań technicznych. "Mięśnie" frameworka._

**| Plik | Odpowiedzialność | Zależności | Użycie |**
| `WebActions.ts` | Pancerne akcje UI (click, fill), obsługa PDF i Excel. | `playwright`, `fs`, `exceljs`, `pdfjs` | Wstrzykiwany do `BasePage` |
| `MailUtils.ts` | Integracja z API poczty (odbieranie linków/kodów). | Biblioteka HTTP/API | Wywoływany w testach (Fixtures) |
| `DbUtils.ts` | Komunikacja z bazą danych (SQL/NoSQL). | Sterownik DB | Wywoływany w testach (Fixtures) |

---

## 🧱 3. Warstwa Abstrakcji POM (Fundament)

_Standardy dla wszystkich obiektów stron i komponentów._

**| Plik | Odpowiedzialność | Kluczowe cechy |**
| `BasePage.ts` | Klasa nadrzędna dla Stron. Inicjalizuje `WebActions`. | Posiada chroniony dostęp do `this.page` i `this.actions`. |
| `BasePageComponent.ts` | Klasa nadrzędna dla Komponentów (np. Navbar). | Operuje na `rootLocator` (zakres wewnątrz komponentu). |

---

### 🔌 4. Warstwa Fixtur

_Odwzorowanie aplikacji i automatyzacja wstrzykiwania zależności._

**| Plik | Odpowiedzialność | Działa na... |**
| `pageFixture.ts` | Fabryka instancji Stron (np. `loginPage`). | Klasy dziedziczące po `BasePage`. |
| `componentFixture.ts` | Fabryka instancji Komponentów (np. `navBar`). | Klasy dziedziczące po `BasePageComponent`. |
| `appFixture.ts` | Centrum Dowodzenia. Łączy wszystkie fixtury i dodatkowo zarządza tagami Allure. | `mergeTests` (punkt wejścia dla testów). |

### 🏗️ 5. Warstwa Implementacji (Concrete POM)

_Najniższy poziom hierarchii logiki biznesowej – konkretne odwzorowanie UI._

| Rodzaj | Odpowiedzialność | Przykład użycia |
| **Page Classes** | Definiowanie lokatorów i metod dla całych stron (E2E). | `LoginPage`, `CheckoutPage.ts`, `AccountPage.ts` |
| **Component Classes** | Definiowanie reużywalnych fragmentów UI (widżety, menu). | `NavBar.ts`, `SearchModal.ts`, `ProductCard.ts` |

> **Zasada przepływu:** Klasy implementacyjne dziedziczą po Fundamencie (3), są instancjonowane w Fixturach (4), a ich metody są ostatecznie wywoływane w Testach (`specs`).

---

## 🛡️ IX. Quality Gate & Standardy Kodu

Framework wymusza najwyższą jakość kodu dzięki automatycznym mechanizmom kontroli. To nie tylko testy, to czysty kod.

- **ESLint v9 (Flat Config):** Korzystamy z najnowszego standardu konfiguracji (`eslint.config.mjs`). Narzędzie to nie tylko wykrywa błędy składniowe, ale pilnuje dobrych praktyk specyficznych dla Playwrighta (plugin `eslint-plugin-playwright`), co zapobiega pisaniu niestabilnych testów.
- **Prettier:** Działa jako "strażnik estetyki". Automatycznie ujednolica formatowanie plików (wcięcia, średniki, typ cudzysłowu). Dzięki integracji z ESLintem (`eslint-config-prettier`), oba narzędzia współpracują w pełnej harmonii – Prettier dba o wygląd, a ESLint o logikę kodu.
- **Git Discipline:** Dzięki odpowiedniej konfiguracji `.gitignore`, repozytorium pozostaje lekkie i bezpieczne – dane wrażliwe (`.env`) oraz ciężkie zależności (`node_modules`) nigdy nie trafiają do kontroli wersji.

---

## 📊 X. Raportowanie (Allure Report)

Framework integruje się z **Allure Report**, dostarczając szczegółowe, wizualne raporty z przebiegu testów.

### ⚙️ Funkcje raportu:

- **Artefakty z Silnika**: Dzięki integracji z Playwright, Allure automatycznie załącza screenshoty oraz nagrania wideo generowane przy błędach (`on-failure`).
- **Analiza Trace Viewer**: Raport zawiera odnośniki do śladów (traces), które można pobrać i otworzyć w Trace Viewerze dla szczegółowej analizy osi czasu.
- **Dynamiczna Kategoryzacja**: System automatycznie mapuje tagi `@` z nazwy testu na natywne metadane Allure (Tags, Severity). Dzięki temu raporty są przejrzyste i pozwalają na zaawansowane filtrowanie bez dodatkowego kodu w testach.

### 🚀 Jak przeglądać raporty?

Po zakończeniu testów wykonaj poniższą komendę, aby wygenerować i otworzyć interaktywny raport w przeglądarce:
`npx allure serve allure-results`

### Gotowe skrypty Allure:

- `npm run allure:clear` – Czyści stare wyniki testów.
- `npm run allure:report` – Generuje i otwiera lokalny serwer z raportem Allure.

---

## ♿ XI. Testy Dostępności (A11y)

Magnus wykorzystuje potężny silnik **Axe-core** (poprzez bibliotekę `@axe-core/playwright`), który jest branżowym standardem w automatyzacji audytów dostępności. Testy te weryfikują, czy aplikacja jest użyteczna dla osób z niepełnosprawnościami, zgodnie z wytycznymi **WCAG 2.1**.

### 🔍 Jak to działa?

Silnik analizuje drzewo DOM w czasie rzeczywistym, sprawdzając reguły dostępności bez konieczności manualnego skanowania. W Magnusie weryfikacja obejmuje:

- **Zgodność ze standardami:** Automatycznie sprawdzamy poziomy **A** oraz **AA** (tagi `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`).
- **Analiza kontrastu:** Algorytmy obliczają współczynnik luminancji tekstu względem tła.
- **Struktura semantyczna:** Weryfikacja poprawności tagów HTML5 (np. czy przyciski są tagami `<button>`, a nie pustymi `<div>`).
- **Interaktywność:** Sprawdzanie, czy elementy sterujące mają odpowiednie etykiety (`aria-label`, `label`) dla czytników ekranu (Screen Readers).

### 🛠️ Wykorzystanie w projekcie

Dzięki integracji w `BasePage`, audyt dostępności jest dostępny dla każdego Page Objectu. Można go wywołać zarówno w testach funkcyjnych (Specs), jak i w scenariuszach biznesowych (BDD).

**Przykład w kodzie (.spec.ts):**
`await dropdownPage.verifyAccessibility('Dropdown Page Audit');`

---

/ Magnus: The Test Automation
