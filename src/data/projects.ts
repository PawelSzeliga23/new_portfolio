export type ProjectCategory = "web" | "ml" | "game" | "systems";

export interface Project {
  id: number;
  title: string;
  descEn: string;
  descPl: string;
  longDescEn: string;
  longDescPl: string;
  category: ProjectCategory;
  tech: string[];
  github?: string;
  githubSecondary?: { label: string; url: string };
  inProgress?: boolean;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio",
    descEn: "This site — a single-page portfolio built to showcase projects, skills and experience with multilingual support and dark/light theming.",
    descPl: "Ta strona — portfolio typu single-page, prezentujące projekty, umiejętności i doświadczenie, z obsługą wielu języków i motywem jasny/ciemny.",
    longDescEn:
      "Built from scratch as a single-page application instead of a traditional multi-route site, so the whole experience — hero, about, skills, projects, contact — lives on one continuously scrolling page with animated section reveals.\n\nEvery skill tag opens a plain-English explanation aimed at non-technical readers, and a small interactive 3D cube in the hero can be dragged and spun by hand. Fully bilingual (EN/PL) with a persisted dark/light theme. Built working with Claude as a pair-programmer throughout — planning components, writing code, and iterating on interaction details like the cube's drag physics.",
    longDescPl:
      "Zbudowana od zera jako aplikacja jednostronicowa zamiast tradycyjnej strony z wieloma podstronami — całe doświadczenie (hero, o mnie, umiejętności, projekty, kontakt) mieści się na jednej, ciągle przewijanej stronie z animowanymi sekcjami.\n\nKażdy tag umiejętności otwiera proste wyjaśnienie skierowane do osób nietechnicznych, a mała interaktywna kostka 3D w sekcji hero daje się przeciągać i obracać ręką. W pełni dwujęzyczna (EN/PL), z zapamiętywanym motywem jasny/ciemny. Zbudowana we współpracy z Claude jako pair-programmerem — od planowania komponentów, przez pisanie kodu, po dopracowywanie detali interakcji, jak fizyka przeciągania kostki.",
    category: "web",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude"],
    github: "https://github.com/PawelSzeliga23/new_portfolio",
    featured: true,
  },
  {
    id: 9,
    title: "Polish Summits Library",
    descEn: "Full-stack app for managing information about Polish mountain summits — a React frontend backed by a REST API in ASP.NET Core.",
    descPl: "Aplikacja full-stack do zarządzania informacjami o polskich szczytach górskich — frontend w React wspierany przez REST API w ASP.NET Core.",
    longDescEn:
      "A semester project split cleanly into two halves: a REST API in ASP.NET Core backed by MS SQL Server, and a React frontend that consumes it. The API exposes CRUD endpoints for managing Polish mountain summits — name, elevation, region, difficulty — with validation and structured error handling.\n\nWorking across both layers meant thinking about the contract between frontend and backend from day one: how data is shaped, what the API returns on failure, and how the UI stays usable while requests are in flight.",
    longDescPl:
      "Projekt semestralny podzielony na dwie części: REST API w ASP.NET Core oparte na MS SQL Server oraz frontend w React, który z niego korzysta. API udostępnia endpointy CRUD do zarządzania polskimi szczytami górskimi — nazwa, wysokość, region, trudność — z walidacją i uporządkowaną obsługą błędów.\n\nPraca na obu warstwach wymagała od początku myślenia o kontrakcie między frontendem a backendem: jak kształtować dane, co API zwraca w razie błędu i jak interfejs pozostaje użyteczny w trakcie oczekiwania na odpowiedź.",
    category: "web",
    tech: ["React", "JavaScript", "C#", "ASP.NET Core", "MS SQL Server"],
    github: "https://github.com/PawelSzeliga23/TIN_projekt_frontend",
    githubSecondary: { label: "Backend", url: "https://github.com/PawelSzeliga23/TIN_project_backend" },
    featured: true,
  },
  {
    id: 10,
    title: "Dental Appointment System",
    descEn: "Booking platform for dental clinics — team project with a React/TypeScript frontend and an ASP.NET Core backend backed by SQL Server.",
    descPl: "Platforma do umawiania wizyt dla klinik stomatologicznych — projekt zespołowy z frontendem w React/TypeScript i backendem w ASP.NET Core na SQL Server.",
    longDescEn:
      "A team project simulating a real product brief: a booking platform for a dental clinic, split into a React/TypeScript frontend and an ASP.NET Core backend on SQL Server. Patients can browse available slots and book appointments, while the backend enforces scheduling rules so double-bookings can't happen.\n\nBuilt collaboratively with a teammate handling parts of the backend, which meant agreeing on API contracts early, reviewing each other's code, and integrating two codebases into one working system.",
    longDescPl:
      "Projekt zespołowy symulujący prawdziwe zlecenie: platforma do umawiania wizyt dla kliniki stomatologicznej, podzielona na frontend w React/TypeScript i backend w ASP.NET Core na SQL Server. Pacjenci mogą przeglądać dostępne terminy i umawiać wizyty, a backend pilnuje reguł harmonogramu, żeby nie doszło do podwójnej rezerwacji.\n\nStworzony we współpracy z kolegą odpowiedzialnym za część backendu, co wymagało wczesnego ustalenia kontraktów API, wzajemnego przeglądu kodu i połączenia dwóch baz kodu w jeden działający system.",
    category: "web",
    tech: ["React", "TypeScript", "C#", "ASP.NET Core", "MS SQL Server"],
    github: "https://github.com/IgorKotecki/SystemZapisowDoKlinikiStomatologicznejFrontend",
    githubSecondary: { label: "Backend", url: "https://github.com/IgorKotecki/SystemZapis-wDoKlinikiStomatologicznejBackend" },
    featured: true,
  },
  {
    id: 12,
    title: "Dog Breed Detector",
    descEn: "A convolutional neural network trained to classify dog breeds from photos, wrapped in an app for quick, practical predictions.",
    descPl: "Splotowa sieć neuronowa wytrenowana do klasyfikacji ras psów na podstawie zdjęć, opakowana w aplikację do szybkich, praktycznych predykcji.",
    longDescEn:
      "A convolutional neural network trained to recognize dog breeds from photos, built as a final project for a machine learning course. The model was trained on a labeled image dataset, tuned to reduce overfitting, and wrapped in a simple interface so predictions are just an upload away.\n\nThe interesting part wasn't just training a model that works — it was making the whole pipeline (preprocessing, training, inference) reproducible and easy to run end to end.",
    longDescPl:
      "Splotowa sieć neuronowa rozpoznająca rasy psów na zdjęciach, stworzona jako projekt końcowy z uczenia maszynowego. Model został wytrenowany na oznaczonym zbiorze obrazów, dostrojony w celu ograniczenia przeuczenia i opakowany w prosty interfejs, dzięki czemu predykcja to tylko jedno przesłanie zdjęcia.\n\nCiekawsza część to nie samo wytrenowanie działającego modelu, ale sprawienie, by cały proces (przygotowanie danych, trenowanie, wnioskowanie) był powtarzalny i łatwy do uruchomienia od początku do końca.",
    category: "ml",
    tech: ["Python", "CNN", "Machine Learning"],
    github: "https://github.com/PawelSzeliga23/SUML_projekt_koncowy",
    featured: true,
  },
  {
    id: 5,
    title: "MultiLayerNN",
    descEn: "A multilayer neural network for classifying handwritten digits (MNIST), implemented from scratch with NumPy — no ML frameworks involved.",
    descPl: "Wielowarstwowa sieć neuronowa do klasyfikacji ręcznie pisanych cyfr (MNIST), zaimplementowana od zera przy użyciu NumPy — bez frameworków ML.",
    longDescEn:
      "Instead of using a machine learning framework, this project implements a multilayer neural network entirely from scratch with NumPy — forward propagation, backpropagation, gradient descent, all hand-written — trained to classify handwritten digits from the MNIST dataset.\n\nThe goal was understanding, not convenience: writing the math out by hand made concepts like gradients and weight updates concrete instead of abstract library calls.",
    longDescPl:
      "Zamiast korzystać z gotowego frameworka, ten projekt implementuje wielowarstwową sieć neuronową całkowicie od zera przy użyciu NumPy — propagacja w przód, propagacja wsteczna, spadek gradientu, wszystko napisane ręcznie — wytrenowaną do klasyfikacji ręcznie pisanych cyfr ze zbioru MNIST.\n\nCelem było zrozumienie, nie wygoda: ręczne zapisanie matematyki sprawiło, że pojęcia takie jak gradienty i aktualizacje wag stały się konkretne, a nie tylko abstrakcyjnymi wywołaniami biblioteki.",
    category: "ml",
    tech: ["Python", "NumPy"],
    github: "https://github.com/PawelSzeliga23/MultiLayerNN",
  },
  {
    id: 4,
    title: "Isometric Survival Game",
    descEn: "An isometric exploration, survival and combat game set on a mysterious planet, built in Unreal Engine 5.",
    descPl: "Izometryczna gra łącząca eksplorację, przetrwanie i walkę, osadzona na tajemniczej planecie — stworzona w Unreal Engine 5.",
    longDescEn:
      "A solo project in Unreal Engine 5 exploring isometric camera work, combined with survival mechanics (resource gathering, hunger and health systems) and basic combat against creatures on a fictional planet.\n\nStill in progress — the current focus is on tightening the movement and combat feel before layering in more content like crafting and enemy variety.",
    longDescPl:
      "Samodzielny projekt w Unreal Engine 5, eksplorujący pracę z kamerą izometryczną, połączony z mechaniką przetrwania (zbieranie surowców, systemy głodu i zdrowia) oraz podstawową walką z istotami na fikcyjnej planecie.\n\nWciąż w trakcie realizacji — obecny nacisk kładziony jest na dopracowanie odczucia ruchu i walki, zanim dojdą kolejne elementy, jak crafting i różnorodność przeciwników.",
    category: "game",
    tech: ["Unreal Engine 5", "C++"],
    github: "https://github.com/PawelSzeliga23/Game_project",
    inProgress: true,
  },
  {
    id: 8,
    title: "Pacman",
    descEn: "A classic Pacman implementation in Java/Swing, complete with maze navigation, pellet collection and ghost AI.",
    descPl: "Klasyczna implementacja Pacmana w Java/Swing, z nawigacją po labiryncie, zbieraniem kropek i sztuczną inteligencją duchów.",
    longDescEn:
      "A from-scratch Java/Swing implementation of the Pacman arcade classic: maze rendering, pellet collection, collision detection, and ghost AI with basic chase and scatter behavior.\n\nA good exercise in real-time game loops and state management without a game engine — everything from the rendering to the timing had to be handled manually.",
    longDescPl:
      "Napisana od zera w Javie/Swing implementacja klasycznego Pacmana: renderowanie labiryntu, zbieranie kropek, wykrywanie kolizji oraz sztuczna inteligencja duchów z podstawowym zachowaniem pościgu i rozpraszania.\n\nDobre ćwiczenie z pętli gry czasu rzeczywistego i zarządzania stanem bez silnika gry — wszystko, od renderowania po timing, trzeba było obsłużyć ręcznie.",
    category: "game",
    tech: ["Java", "Swing"],
    github: "https://github.com/PawelSzeliga23/ProjektGUI2_pacman_game",
  },
  {
    id: 2,
    title: "Maze",
    descEn: "An exploration-driven maze game built with Pygame, where the player navigates procedurally tricky layouts to reach the goal.",
    descPl: "Gra labiryntowa oparta na eksploracji, stworzona w Pygame — gracz porusza się po trudnych układach, próbując dotrzeć do celu.",
    longDescEn:
      "A Pygame project where the player navigates procedurally awkward maze layouts to reach a goal, built to practice 2D game logic — collision, movement, level state — outside of a full game engine.\n\nSimple on the surface, but a useful sandbox for experimenting with how maze generation and difficulty pacing affect how a level actually feels to play.",
    longDescPl:
      "Gra w Pygame, w której gracz porusza się po celowo trudnych układach labiryntu, aby dotrzeć do celu — stworzona, by poćwiczyć logikę gry 2D: kolizje, ruch, stan poziomu — poza pełnym silnikiem gry.\n\nProsta na pierwszy rzut oka, ale przydatny poligon doświadczalny do sprawdzania, jak generowanie labiryntu i tempo trudności wpływają na odczucia z rozgrywki.",
    category: "game",
    tech: ["Python", "Pygame"],
    github: "https://github.com/PawelSzeliga23/pygame",
  },
  {
    id: 7,
    title: "Train Simulator",
    descEn: "A console-based Java simulator for managing train routes, schedules and statuses.",
    descPl: "Konsolowy symulator w Javie do zarządzania trasami, rozkładami jazdy i statusami pociągów.",
    longDescEn:
      "A console-based Java application for managing train operations — routes, schedules, and live status updates — built as a systems-design exercise in structuring a non-trivial domain model without a GUI to lean on.\n\nWith no visual interface to hide behind, the command-line output had to be clear enough on its own to make the simulation's state understandable at a glance.",
    longDescPl:
      "Konsolowa aplikacja w Javie do zarządzania operacjami pociągów — trasami, rozkładami jazdy i statusami na żywo — stworzona jako ćwiczenie z projektowania systemów i strukturyzowania nietrywialnego modelu domenowego bez oparcia na GUI.\n\nBez interfejsu graficznego, za którym można się schować, wyjście konsolowe musiało być na tyle czytelne samo w sobie, by stan symulacji był zrozumiały na pierwszy rzut oka.",
    category: "systems",
    tech: ["Java"],
    github: "https://github.com/PawelSzeliga23/ProjektGUI_train_simulator",
  },
  {
    id: 3,
    title: "Fish Enthusiasts Social Platform",
    descEn: "A social platform concept for fishing enthusiasts to connect, share catches, and discover fishing spots.",
    descPl: "Koncepcja platformy społecznościowej dla wędkarzy — dzielenie się połowami i odkrywanie łowisk.",
    longDescEn:
      "An early-stage concept for a social platform where anglers could share catches, log fishing spots, and connect with each other — built with React, JavaScript and HTML5 to validate the core browsing and posting flow.\n\nStill in progress; the next steps are adding real user accounts and a proper backend instead of the current front-end-only prototype.",
    longDescPl:
      "Wczesna koncepcja platformy społecznościowej, na której wędkarze mogliby dzielić się połowami, zapisywać łowiska i łączyć się ze sobą — zbudowana w React, JavaScript i HTML5, aby zweryfikować podstawowy przepływ przeglądania i publikowania.\n\nWciąż w trakcie realizacji; kolejne kroki to dodanie prawdziwych kont użytkowników i właściwego backendu zamiast obecnego prototypu działającego tylko na froncie.",
    category: "web",
    tech: ["React", "JavaScript", "HTML5"],
    github: "https://github.com/PawelSzeliga23/fishSite",
    inProgress: true,
  },
];
