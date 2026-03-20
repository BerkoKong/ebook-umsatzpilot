# CLAUDE.md - Umsatzpilot Report Webseite

## Projekt
Eine Landing-Page / Report-Webseite für Umsatzpilot (umsatzpilot.com).
Zielgruppe: Geschäftsführer und Inhaber von B2B-Dienstleistern (Agenturen, Berater, IT-Services, Software-Anbieter) mit 5-stelligen bis 250k Euro Monatsumsätzen.

## Tech Stack
- React + Vite
- Inline Styles (kein CSS Framework, kein Tailwind)
- Inter Font von Google Fonts
- Deploy auf Vercel

## Design System (von umsatzpilot.com)
Farben:
- Background: #050505 (fast reines Schwarz)
- Card: #0c0c0c
- Card Border: #1a1a1a (hover: #2a2a2a)
- Text White: #ffffff
- Text Primary: #e5e5e5
- Text Secondary: #888888
- Text Muted: #555555
- Green (positiv): #22c55e
- Red (negativ): #ef4444
- Amber (neutral/Fragen): #f59e0b

Design-Prinzipien:
- Pure Black Background, kein Orange als Hauptfarbe
- Floating Canvas-Partikel im Hintergrund
- Dunkle Cards mit kaum sichtbaren Borders
- Bottom-Glow bei Hover (linear-gradient Linie am unteren Card-Rand)
- Pill-Badges für Section-Labels (border-radius: 100px)
- Sehr großzügiges Spacing
- Scroll-triggered Fade-In Animationen (IntersectionObserver)
- Responsive: clamp() für alle Font-Sizes und Paddings
- Grid: repeat(auto-fit, minmax(min(100%, Xpx), 1fr))

## Textregeln
- Sprache: Deutsch
- KEINE Unicode-Escapes wie \u00FC in JSX-Text. Immer echte UTF-8 Zeichen: ü, ä, ö, ß, Ü, Ö
- KEINE Em-Dashes. Stattdessen Kommas, Punkte oder "bis"
- Euro immer als "Euro" ausschreiben, nicht als Symbol
- Deutsche Anführungszeichen in JSX-Props mit {'...'} Syntax wrappen
- Kein "Coaching-Gelaber", handfest und sachlich

## Sections (Reihenfolge)
1. Cover (Logo, Titel, Architektur-Diagramm der 5 Bausteine)
2. Du bist hier richtig (Zielgruppen-Qualifizierung)
3. Zwei Lager (Beobachter vs. Macher)
4. Report-Inhalt (6 Value-Cards)
5. Ist-Situation / Erkennst du dich wieder (Personas + Schmerzpunkte)
6. Die 6 häufigsten Fehler (aufklappbare Accordion-Cards)
7. Wunschbild / Zielbild (Timeline + Metriken)
8. Über uns / Berk Celikkol (Founder Card + Social Proof + Kernwerte)
9. Von der Theorie zur Praxis (DIY vs. Umsatzpilot + CTA)
- [NOCH ZU BAUEN] Fallstudien / Social Proof Section
- [NOCH ZU BAUEN] Weitere Abschnitte nach Bedarf

## Gründer-Info (für Über uns)
Berk Celikkol: Wirtschaftsinformatiker, KI-Ingenieur, SaaS-Founder.
Gründer der Unternehmensgruppe BetaGamma (Jan 2023).
300+ Kunden, 1.000+ KI-Systeme, eigene Software mit 200 Nutzern.
Position als Experte, NICHT als junger Startup-Founder.

## Shared Components
- Reveal: Scroll-triggered fade-in mit IntersectionObserver
- Badge: Pill-shaped section label
- Divider: Gradient horizontal line
- Particles: Canvas-basierte floating dots
- SG: Section Gap (80px padding)

## Häufige Fehler vermeiden
- KEIN return< ohne Leerzeichen (muss return < sein)
- KEINE Emoji-Surrogate (\uD83E etc.) in JSX
- KEINE localStorage/sessionStorage in Artifacts
- Deutsche Anführungszeichen NICHT als raw „ " in JSX-Strings
- Bei Vite: Datei-Änderungen werden automatisch hot-reloaded