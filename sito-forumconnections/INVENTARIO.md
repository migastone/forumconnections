# Inventario completo — www.forumconnections.com

Scaricato il **17 agosto 2026**. Il sito è una installazione **WordPress** le cui pagine sono
costruite con **Kartra** (page builder esterno): tutto il markup e il CSS di pagina sono *inline*
nell'HTML, mentre immagini e librerie risiedono su CDN Kartra/CloudFront.

| | |
|---|---|
| Pagine HTML salvate | 17 |
| Video (YouTube + Vimeo) | 22 |
| Immagini scaricate | 79 |
| File CSS / JS / font | 17 |

## Struttura cartelle

```
sito-forumconnections/
├── pagine-html/     HTML originale di ogni pagina (così com'è servito)
├── testi/           testo di ogni pagina estratto in Markdown
├── asset/
│   ├── immagini/    tutte le foto, loghi, sfondi, favicon
│   ├── css/         fogli di stile Kartra + WordPress
│   ├── js/          script Kartra + WordPress
│   ├── font/        webfont del tema
│   ├── _inventario.json   mappa URL → file locale → pagine che lo usano
│   └── _video.json        metadati video (titolo, autore, thumbnail)
└── INVENTARIO.md    questo file
```

## 1. Pagine del sito

| Pagina | URL | Testo estratto |
|---|---|---|
| Home | `https://www.forumconnections.com/` | [`testi/index.md`](testi/index.md) |
| Aziende | `https://www.forumconnections.com/aziende/` | [`testi/aziende.md`](testi/aziende.md) |
| Formazione | `https://www.forumconnections.com/formazione/` | [`testi/formazione.md`](testi/formazione.md) |
| Free Ticket (2 euro) | `https://www.forumconnections.com/free-ticket/` | [`testi/free-ticket.md`](testi/free-ticket.md) |
| Upsell | `https://www.forumconnections.com/upsell/` | [`testi/upsell.md`](testi/upsell.md) |
| Forum Promo | `https://www.forumconnections.com/forum-promo/` | [`testi/forum-promo.md`](testi/forum-promo.md) |
| Thank You | `https://www.forumconnections.com/forum-connections-thank-you/` | [`testi/forum-connections-thank-you.md`](testi/forum-connections-thank-you.md) |
| Intervista Claudio Messina | `https://www.forumconnections.com/intervista-claudio-messina/` | [`testi/intervista-claudio-messina.md`](testi/intervista-claudio-messina.md) |
| Diagnosi Aziende (pagina vuota) | `https://www.forumconnections.com/diagnosi-aziende/` | [`testi/diagnosi-aziende.md`](testi/diagnosi-aziende.md) |
| Hello world! (post demo WP) | `https://www.forumconnections.com/hello-world/` | [`testi/hello-world.md`](testi/hello-world.md) |
| Categoria Uncategorized | `https://www.forumconnections.com/category/uncategorized/` | [`testi/category_uncategorized.md`](testi/category_uncategorized.md) |
| Archivio autore | `https://www.forumconnections.com/author/forumconnections/` | [`testi/author_forumconnections.md`](testi/author_forumconnections.md) |

> `diagnosi-aziende` risponde 200 ma è di fatto **vuota** (solo il titolo). `hello-world`, `category/uncategorized` e `author/forumconnections` sono residui di default di WordPress.

## 2. Video

In totale **22 video** embeddati. Kartra li serve tramite un proxy (`app.kartra.com/external_video/...`); qui sotto trovi l'**URL nativo** di YouTube/Vimeo, che è quello riutilizzabile nel nuovo sito.

### Vimeo — 7 video

| # | Titolo | URL | ID | Pagina |
|---|---|---|---|---|
| 1 | Andrea Pietrini YourGroup speaker Forum Connections Intervista - Oscar Dalvit Segnalazione Vincente | https://vimeo.com/1124648070 | `1124648070` | index |
| 2 | Emanuele Properzi Bookness - Testimonianza Segnalazione Vincente | https://vimeo.com/929142492 | `929142492` | index |
| 3 | FORUM CONNECTIONS SAN MARINO 19 Nov. 2025 - by Segnalazione Vincente | https://vimeo.com/1152553282 | `1152553282` | index |
| 4 | FORUM CONNECTIONS: Un nuovo modo di acquisire clienti con le strette di mano e il gruppo di DISPARI | https://vimeo.com/1069487225 | `1069487225` | index |
| 5 | Intervista Esclusiva con Giacomo Bruno - Segnalazione Vincente: Ingengerizzare il Passaparola! | https://vimeo.com/989952292 | `989952292` | index |
| 6 | Katia Burdet e Giuseppe Tringali intervista prima del Forum Connections - Segnalazione Vincente | https://vimeo.com/1132170294 | `1132170294` | index |
| 7 | Segnalazione Vincente - Vision - Torino 2024 | https://vimeo.com/929030558 | `929030558` | index |

### YouTube — 15 video

| # | Titolo | URL | ID | Pagina |
|---|---|---|---|---|
| 1 | Dispari: Ingegneria Relazionale per Acquisire Clienti in un Mondo troppo Artificiale di Oscar Dalvit | https://www.youtube.com/watch?v=Sj3ghpEsYJY | `Sj3ghpEsYJY` | index |
| 2 | Giuseppe Palma – Dall’Italia all’Europa per Connettere Persone Straordinarie al Forumconnections | https://www.youtube.com/watch?v=RCeoGP1NfS4 | `RCeoGP1NfS4` | index |
| 3 | Hai Solo 60", la prima parola conta e non è il buongiorno. Giuseppe Tringali | https://www.youtube.com/watch?v=u9D3TD6oc3k | `u9D3TD6oc3k` | formazione |
| 4 | INTERVENTO di Lisa Marie Gelhaus - Forumconnections | https://www.youtube.com/watch?v=63ddvqRf540 | `63ddvqRf540` | formazione |
| 5 | Ingegneria Relazionale: il Potere degli Incontri Dispari \| Oscar Dalvit \| TEDxTursi | https://www.youtube.com/watch?v=_NtUNdpTcvk | `_NtUNdpTcvk` | index |
| 6 | Intervista a Flavia Fiori sul Forum Connections di San Marino | https://www.youtube.com/watch?v=38QwKzKUwmI | `38QwKzKUwmI` | index |
| 7 | Intervista a Gianmaria Montacchini che definisce l'evento Forum Connections Potente | https://www.youtube.com/watch?v=L6k-yX3fV9U | `L6k-yX3fV9U` | index |
| 8 | Intervista a Roberto Venanzoni a Forum Connections di San Marino. Il posizionamento era perfetto. | https://www.youtube.com/watch?v=yCfsInTNRjg | `yCfsInTNRjg` | index |
| 9 | Intervista a Sandro Cottarelli che definisce Forum Connections SMART | https://www.youtube.com/watch?v=dj5hETVPFoo | `dj5hETVPFoo` | index |
| 10 | Le Relazioni Sono un'Arte Magica – Walter Klinkon a Forum Connections | https://www.youtube.com/watch?v=MrVyDNGmv2U | `MrVyDNGmv2U` | index |
| 11 | Michele Chiericozzi: Forum Connections crea connessioni potenti tra professionisti e aziende | https://www.youtube.com/watch?v=TxyZh9w3rDE | `TxyZh9w3rDE` | index |
| 12 | Savino Novelli al Forum Connections: Perché le relazioni sono il vero capitale del business | https://www.youtube.com/watch?v=Mk-s9Ggmbv0 | `Mk-s9Ggmbv0` | index |
| 13 | Simona Baracico: Forum Connections è Esponenziale \| Networking, Algoritmo e Nuove Opportunità | https://www.youtube.com/watch?v=kNXbPRoiu3k | `kNXbPRoiu3k` | index |
| 14 | Vuoi farti ricordare? Gianluca Lo Stimolo svela il segreto della nomea – Forum Connections | https://www.youtube.com/watch?v=IT2DhOf1iY0 | `IT2DhOf1iY0` | index |
| 15 | intervista al Forum Conntecions si San Marino a Chitrakshi Shetty | https://www.youtube.com/watch?v=pla2O2r6TBA | `pla2O2r6TBA` | index |

**URL proxy Kartra originali** (per riferimento, se serve replicare il player Kartra):

```
https://app.kartra.com/external_video/vimeo/1069487225
https://app.kartra.com/external_video/vimeo/1124648070
https://app.kartra.com/external_video/vimeo/1132170294
https://app.kartra.com/external_video/vimeo/1152553282
https://app.kartra.com/external_video/vimeo/929030558
https://app.kartra.com/external_video/vimeo/929142492
https://app.kartra.com/external_video/vimeo/989952292
https://app.kartra.com/external_video/youtube/38QwKzKUwmI
https://app.kartra.com/external_video/youtube/63ddvqRf540
https://app.kartra.com/external_video/youtube/IT2DhOf1iY0
https://app.kartra.com/external_video/youtube/L6k-yX3fV9U
https://app.kartra.com/external_video/youtube/Mk-s9Ggmbv0
https://app.kartra.com/external_video/youtube/MrVyDNGmv2U
https://app.kartra.com/external_video/youtube/RCeoGP1NfS4
https://app.kartra.com/external_video/youtube/Sj3ghpEsYJY
https://app.kartra.com/external_video/youtube/TxyZh9w3rDE
https://app.kartra.com/external_video/youtube/_NtUNdpTcvk
https://app.kartra.com/external_video/youtube/dj5hETVPFoo
https://app.kartra.com/external_video/youtube/kNXbPRoiu3k
https://app.kartra.com/external_video/youtube/pla2O2r6TBA
https://app.kartra.com/external_video/youtube/u9D3TD6oc3k
https://app.kartra.com/external_video/youtube/yCfsInTNRjg
```

## 3. Immagini, loghi e grafiche

**79 file** scaricati in `asset/immagini/`. Sono organizzati per host di origine:

### `d11n7da8rpqbjy.cloudfront.net` — 72 file
libreria media Kartra dell'account **migastone** — è qui che stanno tutte le foto reali del sito (relatori, loghi partner, screenshot, copertine)

### `www.forumconnections.com` — 4 file
upload WordPress — solo le favicon

### `d2uolguxr56s4e.cloudfront.net` — 3 file
asset di sistema Kartra (placeholder, icone dei template)

**Loghi e riconoscimenti** (9)

| File | URL originale | Peso |
|---|---|---|
| `1284507629342AIRA_WHITE_con_Testo.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1284507629342AIRA_WHITE_con_Testo.png | 85 KB |
| `167219106361Patrocinato_Albo_Segnalatori_orizzontale.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/167219106361Patrocinato_Albo_Segnalatori_orizzontale.png | 161 KB |
| `31052581_1665857185FUAWINNER-ORIZZONTALE-100.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/31052581_1665857185FUAWINNER-ORIZZONTALE-100.jpg | 784 KB |
| `31052581_1665857185FUAWINNER-ORIZZONTALE-100.webp` | https://d11n7da8rpqbjy.cloudfront.net/migastone/31052581_1665857185FUAWINNER-ORIZZONTALE-100.webp | 11 KB |
| `383001468440logo-trasparente_solo_logo_GIALLO.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/383001468440logo-trasparente_solo_logo_GIALLO.png | 95 KB |
| `8909965_1586076474128forbes.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/8909965_1586076474128forbes.png | 39 KB |
| `8909965_1586076474128forbes.webp` | https://d11n7da8rpqbjy.cloudfront.net/migastone/8909965_1586076474128forbes.webp | 6 KB |
| `8909973_1586076512869millionaire.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/8909973_1586076512869millionaire.png | 41 KB |
| `8909973_1586076512869millionaire.webp` | https://d11n7da8rpqbjy.cloudfront.net/migastone/8909973_1586076512869millionaire.webp | 12 KB |

**Foto, copertine e altre grafiche** (41)

| File | URL originale | Peso |
|---|---|---|
| `10557707623ico-empresa-contributi-regione-partners.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/10557707623ico-empresa-contributi-regione-partners.jpg | 78 KB |
| `1078195800577doubleb124_black_and_white_photograph_of_a_bank_meeting_young_b_5e4077c4-d684-4e7e-a3f5-a21c1328318a.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1078195800577doubleb124_black_and_white_photograph_of_a_bank_meeting_young_b_5e4077c4-d684-4e7e-a3f5-a21c1328318a.png | 1589 KB |
| `1122217711635diamond.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1122217711635diamond.jpg | 22 KB |
| `1150621697797ico-empresa-bookness.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1150621697797ico-empresa-bookness.jpg | 43 KB |
| `125728033136ico-empresa-invictus-aziende.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/125728033136ico-empresa-invictus-aziende.jpg | 17 KB |
| `1290639538140claudio.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1290639538140claudio.jpg | 73 KB |
| `138952668020download.jpeg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/138952668020download.jpeg | 5 KB |
| `1607564535729Low_code_italia.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1607564535729Low_code_italia.jpg | 15 KB |
| `18151423766ico-empresa-digitalificio.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/18151423766ico-empresa-digitalificio.jpg | 28 KB |
| `186358821796ico-empresa-ferrioli-fabbro.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/186358821796ico-empresa-ferrioli-fabbro.jpg | 20 KB |
| `18950281704ico-empresa-il-sole-immobiliare.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/18950281704ico-empresa-il-sole-immobiliare.jpg | 34 KB |
| `19736363225emerald.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/19736363225emerald.jpg | 85 KB |
| `218339036Speed_Meeting.JPG` | https://d11n7da8rpqbjy.cloudfront.net/migastone/218339036Speed_Meeting.JPG | 171 KB |
| `233813596884Forum_Connection_Evento_Milano_Copertina.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/233813596884Forum_Connection_Evento_Milano_Copertina.jpg | 298 KB |
| `23462857_16348083607drbg-07.png` | https://d11n7da8rpqbjy.cloudfront.net/Kartra/23462857_16348083607drbg-07.png | 570 KB |
| `262586692034BP.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/262586692034BP.jpg | 21 KB |
| `271452572531ico-empresa-kosmoprint.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/271452572531ico-empresa-kosmoprint.jpg | 16 KB |
| `277292174492Diamond.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/277292174492Diamond.png | 2 KB |
| `290006481656ico-empresa-liberta-finanziaria.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/290006481656ico-empresa-liberta-finanziaria.jpg | 49 KB |
| `31054137_6466709e04ad2_Oscar_Primo_Piano.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/31054137_6466709e04ad2_Oscar_Primo_Piano.jpg | 22 KB |
| `311981169846Forum_2026_Milano.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/311981169846Forum_2026_Milano.jpg | 406 KB |
| `3271865824684.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/3271865824684.png | 17 KB |
| `368964850712.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/368964850712.png | 11 KB |
| `40731797357katia_burdet.jpeg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/40731797357katia_burdet.jpeg | 5 KB |
| `408595695603ico-empresa-the-bridge-strategy.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/408595695603ico-empresa-the-bridge-strategy.jpg | 24 KB |
| `487838472994Emerald.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/487838472994Emerald.png | 1 KB |
| `4943655394291.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/4943655394291.png | 28 KB |
| `520267423898ico-empresa-yes-we-work.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/520267423898ico-empresa-yes-we-work.jpg | 56 KB |
| `526535255369ico-empresa-hi-skill.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/526535255369ico-empresa-hi-skill.jpg | 16 KB |
| `549832859360_DSC6914.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/549832859360_DSC6914.jpg | 83 KB |
| `5577923301383.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/5577923301383.png | 14 KB |
| `600527494336marco_landi.JPG` | https://d11n7da8rpqbjy.cloudfront.net/migastone/600527494336marco_landi.JPG | 2840 KB |
| `60149774979segment_16_9_10s_correct_ratio_new.gif` | https://d11n7da8rpqbjy.cloudfront.net/migastone/60149774979segment_16_9_10s_correct_ratio_new.gif | 1634 KB |
| `639225721854ico-empresa-festival-cinema-pompei.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/639225721854ico-empresa-festival-cinema-pompei.jpg | 44 KB |
| `67283767318helior.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/67283767318helior.jpg | 11 KB |
| `7407464694665.png` | https://d11n7da8rpqbjy.cloudfront.net/migastone/7407464694665.png | 22 KB |
| `76516788874cyber.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/76516788874cyber.jpg | 17 KB |
| `783061461316ico-empresa-manutenzione-tetto.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/783061461316ico-empresa-manutenzione-tetto.jpg | 21 KB |
| `83316077685Giuseppe_Tringali.jpeg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/83316077685Giuseppe_Tringali.jpeg | 101 KB |
| `960078815124messina_copertina.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/960078815124messina_copertina.jpg | 354 KB |
| `97818723368ico-empresa-italtetti.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/97818723368ico-empresa-italtetti.jpg | 23 KB |

**Screenshot** (22)

| File | URL originale | Peso |
|---|---|---|
| `1066921372973Screenshot_2025-07-25_alle_09.16.11.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1066921372973Screenshot_2025-07-25_alle_09.16.11.jpg | 70 KB |
| `1326503302555Screenshot_2025-03-04_alle_08.38.23.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1326503302555Screenshot_2025-03-04_alle_08.38.23.jpg | 113 KB |
| `1435213889159Screenshot_2025-03-08_alle_13.02.56.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/1435213889159Screenshot_2025-03-08_alle_13.02.56.jpg | 354 KB |
| `16458645546Screenshot_2025-03-08_alle_15.48.47.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/16458645546Screenshot_2025-03-08_alle_15.48.47.jpg | 341 KB |
| `20253299943Screenshot_2025-03-08_alle_15.46.39.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/20253299943Screenshot_2025-03-08_alle_15.46.39.jpg | 530 KB |
| `20544173527Screenshot_2025-03-08_alle_15.50.48.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/20544173527Screenshot_2025-03-08_alle_15.50.48.jpg | 440 KB |
| `212382932524Screenshot_2025-03-08_alle_13.09.52.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/212382932524Screenshot_2025-03-08_alle_13.09.52.jpg | 323 KB |
| `225770310715Screenshot_2025-03-08_alle_13.06.53.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/225770310715Screenshot_2025-03-08_alle_13.06.53.jpg | 404 KB |
| `271328033776Screenshot_2025-03-08_alle_15.50.07.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/271328033776Screenshot_2025-03-08_alle_15.50.07.jpg | 503 KB |
| `276570746057Screenshot_2025-03-08_alle_15.19.55.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/276570746057Screenshot_2025-03-08_alle_15.19.55.jpg | 454 KB |
| `286115274790Screenshot_2025-03-08_alle_13.21.57.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/286115274790Screenshot_2025-03-08_alle_13.21.57.jpg | 378 KB |
| `302489473633Screenshot_2025-03-08_alle_15.18.04.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/302489473633Screenshot_2025-03-08_alle_15.18.04.jpg | 529 KB |
| `364942659033Screenshot_2025-03-08_alle_13.06.47.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/364942659033Screenshot_2025-03-08_alle_13.06.47.jpg | 554 KB |
| `365773711714Screenshot_2025-05-21_alle_17.20.35.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/365773711714Screenshot_2025-05-21_alle_17.20.35.jpg | 9 KB |
| `404617566207Screenshot_2024-07-25_alle_11.08.17.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/404617566207Screenshot_2024-07-25_alle_11.08.17.jpg | 410 KB |
| `421116640539Screenshot_2024-07-20_alle_09.39.05.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/421116640539Screenshot_2024-07-20_alle_09.39.05.jpg | 260 KB |
| `538586751974Screenshot_2024-07-25_alle_11.10.58.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/538586751974Screenshot_2024-07-25_alle_11.10.58.jpg | 332 KB |
| `613882464318Screenshot_2025-03-04_alle_08.36.13.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/613882464318Screenshot_2025-03-04_alle_08.36.13.jpg | 180 KB |
| `694066033013Screenshot_2024-07-22_alle_19.04.27.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/694066033013Screenshot_2024-07-22_alle_19.04.27.jpg | 92 KB |
| `742807927319Screenshot_2024-07-24_alle_18.49.58.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/742807927319Screenshot_2024-07-24_alle_18.49.58.jpg | 124 KB |
| `845756187317Screenshot_2025-03-08_alle_13.08.28.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/845756187317Screenshot_2025-03-08_alle_13.08.28.jpg | 584 KB |
| `867232439882Screenshot_2025-01-28_alle_06.29.55.jpg` | https://d11n7da8rpqbjy.cloudfront.net/migastone/867232439882Screenshot_2025-01-28_alle_06.29.55.jpg | 43 KB |

**d2uolguxr56s4e.cloudfront.net**

| File | URL originale |
|---|---|
| `kp_bg_img_41.jpg` | https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/kp_bg_img_41.jpg |
| `kp_faq_img_3.png` | https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/kp-faq/kp_faq_img_3.png |
| `placeholder.jpg` | https://d2uolguxr56s4e.cloudfront.net/img/kartrapages/placeholder.jpg |

**www.forumconnections.com**

| File | URL originale |
|---|---|
| `cropped-favicon-180x180.png` | https://www.forumconnections.com/wp-content/uploads/2024/07/cropped-favicon-180x180.png |
| `cropped-favicon-192x192.png` | https://www.forumconnections.com/wp-content/uploads/2024/07/cropped-favicon-192x192.png |
| `cropped-favicon-270x270.png` | https://www.forumconnections.com/wp-content/uploads/2024/07/cropped-favicon-270x270.png |
| `cropped-favicon-32x32.png` | https://www.forumconnections.com/wp-content/uploads/2024/07/cropped-favicon-32x32.png |

## 4. CSS, JavaScript e font

**Fogli di stile** (5)

| File | URL originale |
|---|---|
| `font-awesome.css` | https://app.kartra.com/css/new/css/pages/font-awesome.css |
| `kartra_components.css` | https://d2uolguxr56s4e.cloudfront.net/internal/pages/css/kartra_components.css |
| `new_bootstrap.css` | https://d2uolguxr56s4e.cloudfront.net/internal/pages/css/new_bootstrap.css |
| `skeleton.min.css` | https://d2uolguxr56s4e.cloudfront.net/internal/pages/css/skeleton.min.css |
| `style.min.css` | https://www.forumconnections.com/wp-includes/blocks/navigation/style.min.css |

**Script** (10)

| File | URL originale |
|---|---|
| `countdown.js` | https://app.kartra.com/js/build/front/pages/countdown.js |
| `jquery.lwtCountdown-enhanced.js` | https://app.kartra.com/js/build/front/pages/jquery.lwtCountdown-enhanced.js |
| `portfolio.js` | https://app.kartra.com/js/build/front/pages/portfolio.js |
| `redirect.js` | https://app.kartra.com//js/build/front/pages/redirect.js |
| `skeleton-above.js` | https://app.kartra.com/js/build/front/pages/skeleton-above.js |
| `skeleton-below.js` | https://app.kartra.com/js/build/front/pages/skeleton-below.js |
| `skeleton-immediate.js` | https://app.kartra.com/js/build/front/pages/skeleton-immediate.js |
| `akismet-frontend.js` | https://www.forumconnections.com/wp-content/plugins/akismet/_inc/akismet-frontend.js |
| `comment-reply.min.js` | https://www.forumconnections.com/wp-includes/js/comment-reply.min.js |
| `view.min.js` | https://www.forumconnections.com/wp-includes/js/dist/script-modules/block-library/navigation/view.min.js |

**Font** (2)

| File | URL originale |
|---|---|
| `FiraCode-VariableFont_wght.woff2` | https://www.forumconnections.com/wp-content/themes/twentytwentyfive/assets/fonts/fira-code/FiraCode-VariableFont_wght.woff2 |
| `Manrope-VariableFont_wght.woff2` | https://www.forumconnections.com/wp-content/themes/twentytwentyfive/assets/fonts/manrope/Manrope-VariableFont_wght.woff2 |

> Attenzione: **il CSS che dà l'aspetto alle pagine è quasi tutto inline** dentro ogni HTML (Kartra genera stili per-sezione). I 4 CSS Kartra qui sopra sono solo la base (bootstrap, componenti, font-awesome).

## 5. Altri embed e integrazioni di terze parti

| Servizio | Dettaglio | Pagine |
|---|---|---|
| Facebook | post embeddato dalla pagina `facebook.com/forumconnections` | index |
| Google Maps | luogo: **Hilton Metropolee, Via del Cavallaccio, 36, 50142 Firenze FI** | free-ticket |
| Google Maps | luogo: **UNA Hotels Expo Fiera Milano** | forum-promo, index |
| Google Tag Manager | container `GTM-MLMSBVTX` (noscript) | aziende, formazione, forum-connections-thank-you, forum-promo, free-ticket, index, intervista-claudio-messina, upsell |

Rilevati inoltre nel codice delle pagine:

- **Google Tag Manager** — container `GTM-MLMSBVTX`
- **Kartra** — form di opt-in, checkout, countdown e tracking (l'intero sito gira sul loro builder)
- **JotForm** — un agente/chatbot embeddato (lo script `cdn.jotfor.ms/agent/embedjs/...` oggi risponde **404**: l'integrazione è rotta)
- **Akismet** — antispam WordPress

## 6. Note per la ricostruzione

- **I video non sono file**: sono tutti embed YouTube/Vimeo di proprietà di terzi/vostri canali. Nel nuovo sito basta reimpostare gli iframe nativi con gli URL della sezione 2 — non serve passare più dal proxy Kartra.
- **Le immagini stanno su CloudFront Kartra.** Sono state scaricate tutte in locale: se dismettete Kartra quegli URL smettono di funzionare, quindi vanno ricaricate sul nuovo hosting.
- **I testi** sono in `testi/*.md`, uno per pagina, già ripuliti da markup e script.
- **La home è la pagina più corposa** (~33.000 caratteri di testo, 20 video, la maggior parte delle immagini): è di fatto una long-form sales page.
- **Non recuperabile via scraping**: i form Kartra (destinazione dei lead), le automazioni email, le sequenze di checkout. Vanno ricostruiti a mano o esportati dal pannello Kartra.
- Il processo di acquisto ticket è escluso da questa fase (passerà dal server MigaMatch).
