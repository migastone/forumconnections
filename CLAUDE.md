# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Cos'è questo repository

La landing dell'evento **Forum Connections — Milano, 17 ottobre 2026**, più il materiale di
lavoro che le sta intorno. Sito statico scritto a mano: nessun framework, nessun build step,
nessun test, nessuna dipendenza da installare. Si modifica l'HTML e si pubblica.

Tutto è in italiano: interfaccia, commenti nel codice, messaggi di commit.

## Comandi

Anteprima locale (con `file://` le `fetch` non partono, quindi la console `staff/` e il controllo
di versione non funzionano):

```bash
python3 -m http.server 4173 --directory landing-milano-2026
```

Esiste come configurazione `landing` in `.claude/launch.json`, quindi si può avviare con gli
strumenti di preview invece che a mano.

Pubblicazione: **ogni push su `main` che tocca `landing-milano-2026/**` fa il deploy FTP in
produzione** (`.github/workflows/deploy.yml`). Non c'è staging automatico. Per una prova su
cartella diversa o una simulazione:

```bash
gh workflow run "Deploy FTP" -f target=sottocartella-di-prova -f dry_run=true
```

## Cosa finisce online

Solo `landing-milano-2026/` viene caricata via FTP su www.forumconnections.com. Tutto il resto
del repo è archivio o materiale di lavoro.

| | |
|---|---|
| `index.html` | la home, ~1600 righe con CSS e JS **inline**: listino, countdown, testimonianze, tool dei settori |
| `aziende/`, `upsell/` | `noindex`, raggiungibili solo da link diretto; condividono `assets/pagine-interne.css` e `assets/widget-whatsapp.css` (la home ha il suo CSS inline, il widget WhatsApp no) |
| `staff/` | console interna per gli operatori, `noindex`. **Niente pixel qui**: tracciare gli operatori non aggiunge attribuzione |
| `assets/consenso.js`, `assets/consenso.css` | banner del consenso, condiviso dalle tre pagine pubbliche. Espone `FCConsenso` |
| `assets/tracciamento-meta.js` | pixel Meta e parametri riattaccati al checkout, condiviso dalle tre pagine pubbliche |
| `llms.txt` | riepilogo dell'evento servito su `/llms.txt` per assistenti e agenti AI |

## Regole che dal codice non si vedono

1. **`llms.txt` va aggiornato insieme a `index.html`.** Speaker, programma, prezzi, partner,
   cosa comprende il biglietto: se cambia in pagina, cambia lì. È l'unica copia dei contenuti
   che vive fuori dall'HTML.

2. **Il prezzo non si scrive a mano.** Lo decide la data: `LISTINO` in `index.html` e gli
   elementi `[data-prezzo]` / `.price[data-fino]`. Per cambiare uno scaglione si tocca solo
   `LISTINO`. Il checkout sono link diretti a `auto.migamatch.com/shop?sku=…`
   (`MM_FORUM_MI_20261017`, `…_AZIENDA`, `…_CENA`) marcati `data-cta="checkout"`.

3. **`__COMMIT__` in `staff/index.html` è un segnaposto, non un bug.** Il workflow lo sostituisce
   con lo SHA e genera `VERSIONE.txt`: la pagina confronta i due e avvisa l'operatore quando sta
   girando una copia vecchia rimasta in cache. In locale il confronto si disattiva da solo.

4. **Foto e loghi.** Gli originali stanno in root e **non** si versionano; nel repo entra solo il
   ritaglio pronto: ritratti quadrati 400×400 in `assets/img/sp-<cognome>.jpg` (la griglia li
   mostra in cerchio da 130px), loghi delle aziende partner in `assets/img/partner-*.jpg`.

5. **Video.** Sono facciate cliccabili, non iframe: venti embed aperti insieme affosserebbero la
   pagina. Le anteprime YouTube arrivano da `i.ytimg.com`, quelle Vimeo vanno salvate a mano in
   `assets/img/video/vimeo-<id>.jpg`.

6. **`robots.txt` non contiene `Disallow` per le pagine `noindex`**, ed è voluto: un Disallow
   impedirebbe al crawler di leggere il meta e l'indirizzo finirebbe negli indici senza contenuto.

7. **Il repository è pubblico.** `.gitignore` tiene fuori `docs-migamatch/`, `CLAUDE-MIGAMATCH.md`,
   `economy/`, `Ricontatto DB FC/` e ogni `*.xlsx`/`*.csv`: sono materiale interno e liste di
   contatti. Prima di aggiungere file in root, verificare che non ricadano lì.

8. **Il codice base del pixel Meta non sta nelle pagine, ed è voluto.** Se lo si incolla in
   `<head>` come dice la documentazione di Meta, parte al caricamento — cioè prima che l'utente
   abbia risposto al banner, che è esattamente ciò che per i cookie di profilazione non si può
   fare. Vive dentro `assets/tracciamento-meta.js` e viene iniettato solo quando `FCConsenso` dà
   il via. Chi vuole tracciare qualcosa chiede `FCConsenso.quando(fn)` e si accende se e quando
   arriva il consenso, anche molto dopo il caricamento.
   Il `<meta name="facebook-domain-verification">` sulla home invece **deve** restare HTML statico
   in `<head>`: Meta rilegge il sorgente, e un tag iniettato via JavaScript fa fallire la verifica.

9. **I link al checkout non si scrivono completi.** L'href in pagina porta solo `sku`: il resto
   (`_fbp`, `_fbc`, `fbclid`, le UTM, `src`, `mm_eid`) lo attacca `tracciamento-meta.js` al
   momento del clic, quando i cookie esistono. Un href statico con i parametri dentro sarebbe
   sempre vecchio. I nomi `_fbp` e `_fbc` viaggiano **con l'underscore**: è quello che il server a
   valle si aspetta. Se cambiano le finalità del trattamento, va alzato `VERSIONE` in
   `consenso.js`, altrimenti chi ha già risposto non rivede il banner.

10. **`PREZZI` in `tracciamento-meta.js` duplica due cifre.** Il biglietto base lo legge da
    `LISTINO`, ma 599 € (azienda) e 49 € (cena) sono scritti a mano lì dentro *e* nelle rispettive
    pagine. Cambiarli in un posto solo fa riportare a Meta un valore diverso da quello incassato.
    Finché restano due posti, si toccano insieme. La via d'uscita è un `data-valore="599"` sul
    link del checkout, così la cifra la possiede la pagina come già fa `LISTINO` per il biglietto.

## staff/ — console ricontatti

Pagina che usano gli operatori durante le chiamate. Parla con Supabase (chiave `anon`, pubblica
per costruzione) attraverso la Edge Function `ricontatti-api`, che **non vive in questo repo**.
Dentro il file ci sono gli esiti ammessi, le obiezioni, la logica di coda e i **testi WhatsApp ed
email** (`TESTI`, `OGGETTI`, `SCRIPT_PER_FONTE`).

Modificare quei testi significa cambiare i messaggi che partono davvero verso i contatti: sono
copy operativo, non stringhe di esempio.

## sito-forumconnections/ — archivio, non sorgente

Copia congelata del vecchio sito WordPress + Kartra, scaricata il 17 agosto 2026
(`pagine-html/`, `testi/`, `asset/`, con `INVENTARIO.md` come mappa). Serve da riferimento per i
contenuti delle edizioni passate e **descrive un altro evento** (38 tavoli da 8, relatori diversi
da Milano 2026). Non va aggiornata quando cambia la landing e non viene mai pubblicata.

## campagna-ads-ottobre-2026/ — cartella di lavoro, fuori da git

Strategia, copy delle inserzioni, sequenze email e WhatsApp, spezzoni video e locandine
pronte per la campagna Meta di Milano 2026. E' in `.gitignore` e non va mai committata:
contiene bozze non approvate e 647 MB di video scaricati da YouTube.

Sta **dentro questo repo e non in un progetto separato** per una ragione precisa: i fatti
che la campagna afferma vivono qui e cambiano di continuo. Il prezzo lo decide `LISTINO`,
i numeri della rete `dati-rete.js`, l'attribuzione `tracciamento-meta.js`, tutto il resto
`llms.txt`. L'11 settembre 2026 la garanzia «Matchato o rimborsato» e' sparita dal sito, e
i testi delle ads che la promettevano sono stati corretti lo stesso giorno **perche' il
commit era visibile nella stessa sessione**. Da un progetto separato quella modifica
sarebbe arrivata muta, e le inserzioni sarebbero partite promettendo un rimborso che non
esiste piu'.

Quindi: **ogni volta che cambia un fatto in `index.html` o `llms.txt`, va controllato se
la campagna lo ripete.** I punti dove di solito lo ripete sono `02-copy-ads/copy-ads.md`,
`03-sequenze/email.md` e `03-sequenze/whatsapp.md`.

L'implementazione tecnica del funnel non sta qui: vive nel progetto MigaMATCH, e la
cucitura e' `05-handoff-migamatch/`, scritta per essere autosufficiente.

## assets/dati-rete.js

Estrazione aggregata di produzione (17 agosto 2026) dei 2.142 connettori qualificati: alimenta il
tool «chi puoi incontrare» della home. Il filtro sulla dimensione aziendale copre solo 987 profili
su 2.142 e la pagina lo dichiara apertamente. Quei numeri sono verificabili da chi li legge: non
arrotondarli né estenderli oltre quello che il commento in testa al file autorizza.

## Stile

I commenti nel codice spiegano **perché** una cosa è fatta così, non cosa fa (il blocco `LISTINO`,
il controllo di versione in `staff/`, la scelta di non mettere `Disallow`). Vale la pena
mantenere quel registro invece di aggiungere commenti descrittivi.

I messaggi di commit seguono lo stesso schema: titolo breve in italiano, corpo che racconta il
ragionamento e cosa cambia per chi legge la pagina, apostrofi ASCII (`e'`, `piu'`).
