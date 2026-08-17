/* =============================================================================
   DATI RETE MIGAMATCH — estrazione PROD del 17 agosto 2026
   Fonte: connectors WHERE is_qualified AND unsubscribed_at IS NULL
          AND account_disabled = false  →  2.142 connettori profilati
   I conteggi sono persone DISTINTE che dichiarano influenza in quel settore.
   Le varianti duplicate sono state consolidate e i conteggi RICALCOLATI
   (non sommati) per non gonfiare i numeri.
   Nessun dato personale: solo professione, settore e aggregati.
   ========================================================================== */

const RETE_TOT = 2142;

const AREE = [
  { id:'consulting',    nome:'Consulenza & Direzione d’impresa',   ico:'\u{1F4BC}', tot:1163 },
  { id:'marketing',     nome:'Marketing & Comunicazione',              ico:'\u{1F4E3}', tot:968  },
  { id:'finance',       nome:'Finanza & Assicurazioni',                ico:'\u{1F4B0}', tot:890  },
  { id:'training',      nome:'Formazione & Coaching',                  ico:'\u{1F393}', tot:834  },
  { id:'real_estate',   nome:'Immobiliare, Edilizia & Design',         ico:'\u{1F3D7}', tot:802  },
  { id:'services',      nome:'Servizi alle imprese',                   ico:'\u{1F5C2}', tot:781  },
  { id:'retail',        nome:'Commercio locale & Retail',              ico:'\u{1F6CD}', tot:685  },
  { id:'tech',          nome:'Tecnologia, Software & AI',              ico:'\u{1F4BB}', tot:658  },
  { id:'food',          nome:'Agroalimentare & Ristorazione',          ico:'\u{1F37D}', tot:647  },
  { id:'energy',        nome:'Energia & Sostenibilità',           ico:'⚡',    tot:647  },
  { id:'safety',        nome:'Sicurezza, Privacy & Compliance',        ico:'\u{1F6E1}', tot:630  },
  { id:'creative',      nome:'Creatività, Design & Editoria',     ico:'\u{1F3A8}', tot:610  },
  { id:'tourism',       nome:'Turismo & Ospitalità',              ico:'✈',    tot:610  },
  { id:'hr',            nome:'Risorse Umane & Lavoro',                 ico:'\u{1F465}', tot:594  },
  { id:'manufacturing', nome:'Industria & Manifattura',                ico:'\u{1F3ED}', tot:561  },
  { id:'health',        nome:'Sanità & Benessere',                ico:'\u{1FA7A}', tot:535  },
  { id:'events',        nome:'Eventi & Wedding',                       ico:'\u{1F389}', tot:528  },
  { id:'logistics',     nome:'Logistica & Trasporti',                  ico:'\u{1F69A}', tot:435  },
  { id:'education',     nome:'Scuola, Università & Cultura',      ico:'\u{1F4DA}', tot:418  }
];

/* Dimensione delle aziende con cui i connettori hanno relazione.
   Campo di profilazione `company_size_relations`.
   ATTENZIONE alla copertura: solo 987 dei 2.142 connettori qualificati hanno
   compilato questo campo. Il filtro dimensione quindi restringe SOLO dentro
   quei 987, e la pagina lo dichiara esplicitamente. */
const DIM_COMPILATO = 987;

const DIMENSIONI = [
  { id:'micro',   nome:'Microimprese',   det:'3–9 addetti',       tot:723 },
  { id:'piccole', nome:'Piccole imprese', det:'10–49 addetti',    tot:734 },
  { id:'medie',   nome:'Medie imprese',   det:'50–249 addetti',   tot:423 },
  { id:'grandi',  nome:'Grandi imprese',  det:'250+ addetti',     tot:204 },
  { id:'enti',    nome:'Enti statali',    det:'PA e partecipate', tot:116 }
];

/* Incrocio area di influenza × dimensione azienda: persone distinte */
const AREA_X_DIM = {
consulting:{enti:96,grandi:171,medie:347,micro:574,piccole:603},
creative:{enti:69,grandi:107,medie:232,micro:390,piccole:398},
education:{enti:67,grandi:86,medie:167,micro:275,piccole:285},
energy:{enti:71,grandi:111,medie:228,micro:380,piccole:391},
events:{enti:60,grandi:91,medie:186,micro:344,piccole:340},
finance:{enti:74,grandi:121,medie:264,micro:461,piccole:470},
food:{enti:69,grandi:102,medie:220,micro:379,piccole:399},
health:{enti:66,grandi:95,medie:189,micro:345,piccole:352},
hr:{enti:66,grandi:125,medie:229,micro:350,piccole:382},
logistics:{enti:45,grandi:76,medie:157,micro:242,piccole:266},
manufacturing:{enti:56,grandi:99,medie:208,micro:275,piccole:313},
marketing:{enti:79,grandi:133,medie:281,micro:519,piccole:520},
real_estate:{enti:83,grandi:118,medie:259,micro:472,piccole:471},
retail:{enti:72,grandi:110,medie:229,micro:450,piccole:435},
safety:{enti:55,grandi:98,medie:194,micro:298,piccole:322},
services:{enti:71,grandi:104,medie:238,micro:402,piccole:420},
tech:{enti:71,grandi:131,medie:260,micro:410,piccole:432},
tourism:{enti:81,grandi:103,medie:219,micro:414,piccole:405},
training:{enti:87,grandi:153,medie:314,micro:498,piccole:531}
};

/* Sottosettori: chi, dentro quell'area, i connettori conoscono davvero */
const SOTTOSETTORI = {
consulting:[{s:"Analisi e ottimizzazione dei processi aziendali",n:614},{s:"Business coaching e consulenza organizzativa",n:580},{s:"Consulenza direzionale e strategica",n:559},{s:"Consulenza fiscale e legale",n:497},{s:"Pianificazione e controllo di gestione",n:226},{s:"Temporary management e fractional executive",n:143}],
creative:[{s:"Agenzie pubblicitarie e creative",n:347},{s:"Studi di design e architettura",n:338},{s:"Produzione audiovisiva",n:249},{s:"Artigianato e design di prodotti unici",n:199},{s:"Case editrici e autori indipendenti",n:160},{s:"Eventi, mostre e produzioni artistiche",n:82}],
education:[{s:"Organizzazione di eventi culturali",n:228},{s:"Scuole private e paritarie",n:185},{s:"Organizzazioni culturali",n:183},{s:"Centri linguistici e scuole di lingue",n:115},{s:"Università, ITS e formazione professionale",n:83},{s:"Scuole statali",n:73}],
energy:[{s:"Energie rinnovabili",n:397},{s:"Efficienza energetica",n:376},{s:"Forniture di energia e gas",n:340},{s:"Certificazioni ESG e sostenibilità ambientale",n:157},{s:"Gestione rifiuti ed economia circolare",n:63},{s:"Consulenza ambientale e autorizzazioni",n:60}],
events:[{s:"Foto e video per eventi",n:278},{s:"Location per matrimoni ed eventi",n:247},{s:"Servizi di catering e banqueting",n:241},{s:"Wedding planner",n:162},{s:"Allestimenti, decorazioni e bomboniere",n:82},{s:"Noleggio attrezzature e decorazioni",n:63},{s:"Abiti da sposa e cerimonia",n:58}],
finance:[{s:"Consulenza finanziaria e gestionale",n:569},{s:"Pianificazione finanziaria e investimenti",n:421},{s:"Servizi di brokeraggio assicurativo",n:383},{s:"Finanza agevolata e bandi",n:372},{s:"Gestione del credito e recupero crediti",n:236},{s:"Leasing e noleggio operativo",n:119}],
food:[{s:"Ristorazione e catering",n:471},{s:"Produzione alimentare",n:428},{s:"Distribuzione alimentare",n:336},{s:"Consulenza qualità, certificazioni e HACCP",n:149},{s:"Attrezzature e forniture per ristorazione",n:94},{s:"Food delivery e takeaway",n:94}],
health:[{s:"Strutture sanitarie private",n:265},{s:"Centri benessere, SPA e fitness",n:264},{s:"Prodotti naturali e integratori alimentari",n:259},{s:"Assistenza domiciliare",n:101},{s:"Servizi sanitari per aziende",n:76},{s:"Medicina del lavoro",n:60}],
hr:[{s:"Recruiting e selezione del personale",n:378},{s:"Consulenza sul welfare aziendale",n:224},{s:"Gestione e amministrazione HR",n:209},{s:"Talent management ed employer branding",n:114},{s:"Valutazione performance e assessment",n:112},{s:"Relazioni sindacali e contrattualistica",n:82}],
logistics:[{s:"Servizi di trasporto e spedizioni",n:320},{s:"Gestione magazzini e logistica integrata",n:215},{s:"Consulenza sulla supply chain",n:111},{s:"Packaging e imballaggi",n:92},{s:"Logistica e-commerce e last mile",n:51}],
manufacturing:[{s:"Produzione di beni di consumo",n:242},{s:"Industria pesante",n:227},{s:"Manutenzione e riparazione industriale",n:193},{s:"Produzione ecosostenibile e tecnologie verdi",n:177},{s:"Fornitori e subfornitura industriale",n:167},{s:"Automazione industriale e robotica",n:147}],
marketing:[{s:"Agenzie di marketing digitale",n:621},{s:"Social media management",n:613},{s:"Pubblicità tradizionale e online",n:382},{s:"Copywriting e storytelling aziendale",n:337},{s:"Marketing automation, CRM e funnel",n:233}],
real_estate:[{s:"Agenzie immobiliari e consulenti",n:604},{s:"Costruzioni e ristrutturazioni",n:508},{s:"Arredamento e interior design",n:391},{s:"Soluzioni energetiche per edifici",n:238},{s:"Amministrazione condominiale",n:128},{s:"Property e facility management",n:117}],
retail:[{s:"Bar, ristoranti e pizzerie",n:439},{s:"Servizi alla persona: parrucchieri, estetica",n:376},{s:"Officine, gommisti e servizi auto",n:292},{s:"Alimentari, supermercati e panifici",n:244},{s:"Farmacie e parafarmacie",n:217},{s:"Gelaterie e pasticcerie",n:138},{s:"Tabaccherie e ricevitorie",n:135},{s:"Studi fotografici",n:130},{s:"Concessionarie auto",n:113},{s:"Negozi di abbigliamento e calzature",n:110}],
safety:[{s:"Sicurezza e salute sul lavoro",n:403},{s:"Audit e compliance normativa",n:296},{s:"Gestione documentale e certificazioni",n:190},{s:"Privacy, GDPR e compliance digitale",n:160},{s:"Formazione sicurezza e RSPP esterno",n:132},{s:"Modelli organizzativi 231",n:81}],
services:[{s:"Contabilità, bilancio e segreteria",n:479},{s:"Stampa, grafica e supporto digitale",n:288},{s:"Traduzioni e servizi linguistici",n:206},{s:"Back-office e servizi amministrativi",n:113},{s:"Customer care e call center",n:78},{s:"Procurement e acquisti",n:55}],
tech:[{s:"Sviluppo software e app personalizzate",n:430},{s:"Soluzioni di automazione e AI",n:408},{s:"Consulenza IT e cybersecurity",n:368},{s:"Cloud computing e gestione dati",n:178},{s:"Infrastrutture IT, reti e sistemi",n:140},{s:"IoT, hardware e soluzioni industriali smart",n:101}],
tourism:[{s:"Strutture ricettive",n:412},{s:"Agenzie di viaggio e tour operator",n:299},{s:"Organizzazione di eventi turistici",n:276},{s:"Servizi di trasporto turistico",n:156},{s:"Guide turistiche e servizi culturali",n:147},{s:"Property management e affitti brevi",n:92},{s:"Enti turistici",n:82},{s:"Attrazioni turistiche e parchi tematici",n:61}],
training:[{s:"Corsi di formazione e coaching per manager",n:603},{s:"Workshop e programmi di mentoring",n:297},{s:"Formazione commerciale e vendita",n:269},{s:"Formazione su leadership e soft skill",n:257},{s:"E-learning e piattaforme di formazione",n:232},{s:"Formazione tecnica certificata",n:141}]
};

/* Chi può presentarti: professione + settore di chi ha influenza in quell'area */
const PRESENTATORI = {
consulting:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:104},{r:"Professionista",s:"Consulenza aziendale e strategica",n:65},{r:"Consulente",s:"Marketing e comunicazione",n:45},{r:"Consulente",s:"Finanza e assicurazioni",n:45},{r:"Imprenditore",s:"Tecnologia e innovazione",n:39},{r:"Imprenditore",s:"Marketing e comunicazione",n:36},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:35},{r:"Consulente",s:"Energia e ambiente",n:28}],
creative:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:47},{r:"Consulente",s:"Marketing e comunicazione",n:41},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:32},{r:"Imprenditore",s:"Marketing e comunicazione",n:29},{r:"Professionista",s:"Marketing e comunicazione",n:24},{r:"Professionista",s:"Consulenza aziendale e strategica",n:23},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:22},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:21}],
education:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:31},{r:"Consulente",s:"Marketing e comunicazione",n:20},{r:"Professionista",s:"Consulenza aziendale e strategica",n:17},{r:"Professionista",s:"Marketing e comunicazione",n:12},{r:"Consulente",s:"Finanza e assicurazioni",n:12},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:12},{r:"Imprenditore",s:"Tecnologia e innovazione",n:11},{r:"Consulente",s:"Formazione e sviluppo professionale",n:11}],
energy:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:54},{r:"Consulente",s:"Energia e ambiente",n:34},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:26},{r:"Consulente",s:"Finanza e assicurazioni",n:24},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:23},{r:"Professionista",s:"Consulenza aziendale e strategica",n:23},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:21},{r:"Agente di Commercio",s:"Energia e ambiente",n:20}],
events:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:36},{r:"Professionista",s:"Marketing e comunicazione",n:23},{r:"Consulente",s:"Marketing e comunicazione",n:23},{r:"Professionista",s:"Consulenza aziendale e strategica",n:22},{r:"Imprenditore",s:"Marketing e comunicazione",n:22},{r:"Consulente",s:"Finanza e assicurazioni",n:17},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:15},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:14}],
finance:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:78},{r:"Consulente",s:"Finanza e assicurazioni",n:52},{r:"Professionista",s:"Consulenza aziendale e strategica",n:45},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:36},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:26},{r:"Consulente",s:"Marketing e comunicazione",n:26},{r:"Professionista",s:"Marketing e comunicazione",n:21},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:21}],
food:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:46},{r:"Professionista",s:"Consulenza aziendale e strategica",n:28},{r:"Consulente",s:"Marketing e comunicazione",n:23},{r:"Consulente",s:"Finanza e assicurazioni",n:21},{r:"Imprenditore",s:"Agroalimentare e ristorazione",n:20},{r:"Imprenditore",s:"Marketing e comunicazione",n:18},{r:"Imprenditore",s:"Consulenza aziendale e strategica",n:15},{r:"Imprenditore",s:"Tecnologia e innovazione",n:14}],
health:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:42},{r:"Consulente",s:"Marketing e comunicazione",n:23},{r:"Professionista",s:"Consulenza aziendale e strategica",n:21},{r:"Professionista",s:"Sanitario e benessere",n:18},{r:"Imprenditore",s:"Sanitario e benessere",n:17},{r:"Professionista",s:"Marketing e comunicazione",n:16},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:15},{r:"Imprenditore",s:"Marketing e comunicazione",n:15}],
hr:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:70},{r:"Professionista",s:"Consulenza aziendale e strategica",n:45},{r:"Imprenditore",s:"Consulenza aziendale e strategica",n:22},{r:"Consulente",s:"Finanza e assicurazioni",n:22},{r:"Consulente",s:"Marketing e comunicazione",n:19},{r:"Imprenditore",s:"Tecnologia e innovazione",n:19},{r:"Consulente",s:"Formazione e sviluppo professionale",n:18},{r:"Imprenditore",s:"Marketing e comunicazione",n:17}],
logistics:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:37},{r:"Consulente",s:"Marketing e comunicazione",n:16},{r:"Professionista",s:"Consulenza aziendale e strategica",n:15},{r:"Imprenditore",s:"Agroalimentare e ristorazione",n:14},{r:"Consulente",s:"Finanza e assicurazioni",n:13},{r:"Imprenditore",s:"Tecnologia e innovazione",n:10},{r:"Imprenditore",s:"Marketing e comunicazione",n:10},{r:"Agente di Commercio",s:"Agroalimentare e ristorazione",n:8}],
manufacturing:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:44},{r:"Consulente",s:"Marketing e comunicazione",n:21},{r:"Consulente",s:"Energia e ambiente",n:19},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:18},{r:"Professionista",s:"Consulenza aziendale e strategica",n:17},{r:"Imprenditore",s:"Consulenza aziendale e strategica",n:16},{r:"Consulente",s:"Finanza e assicurazioni",n:15},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:13}],
marketing:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:62},{r:"Consulente",s:"Marketing e comunicazione",n:49},{r:"Professionista",s:"Consulenza aziendale e strategica",n:36},{r:"Imprenditore",s:"Marketing e comunicazione",n:36},{r:"Imprenditore",s:"Tecnologia e innovazione",n:32},{r:"Professionista",s:"Marketing e comunicazione",n:32},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:27},{r:"Consulente",s:"Finanza e assicurazioni",n:26}],
real_estate:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:54},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:48},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:33},{r:"Professionista",s:"Consulenza aziendale e strategica",n:33},{r:"Consulente",s:"Finanza e assicurazioni",n:32},{r:"Consulente",s:"Marketing e comunicazione",n:31},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:30},{r:"Consulente",s:"Energia e ambiente",n:25}],
retail:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:45},{r:"Consulente",s:"Marketing e comunicazione",n:28},{r:"Professionista",s:"Consulenza aziendale e strategica",n:27},{r:"Consulente",s:"Finanza e assicurazioni",n:21},{r:"Imprenditore",s:"Marketing e comunicazione",n:19},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:17},{r:"Professionista",s:"Marketing e comunicazione",n:17},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:16}],
safety:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:59},{r:"Professionista",s:"Consulenza aziendale e strategica",n:37},{r:"Consulente",s:"Finanza e assicurazioni",n:30},{r:"Imprenditore",s:"Tecnologia e innovazione",n:20},{r:"Consulente",s:"Energia e ambiente",n:17},{r:"Consulente",s:"Marketing e comunicazione",n:17},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:16},{r:"Professionista",s:"Immobiliare, costruzioni e design",n:16}],
services:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:61},{r:"Professionista",s:"Consulenza aziendale e strategica",n:40},{r:"Consulente",s:"Marketing e comunicazione",n:33},{r:"Consulente",s:"Finanza e assicurazioni",n:32},{r:"Imprenditore",s:"Marketing e comunicazione",n:27},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:23},{r:"Consulente",s:"Immobiliare, costruzioni e design",n:21}],
tech:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:58},{r:"Imprenditore",s:"Tecnologia e innovazione",n:42},{r:"Imprenditore",s:"Marketing e comunicazione",n:35},{r:"Consulente",s:"Marketing e comunicazione",n:32},{r:"Professionista",s:"Consulenza aziendale e strategica",n:27},{r:"Imprenditore",s:"Consulenza aziendale e strategica",n:20},{r:"Professionista",s:"Marketing e comunicazione",n:19},{r:"Consulente",s:"Tecnologia e innovazione",n:16}],
tourism:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:40},{r:"Consulente",s:"Marketing e comunicazione",n:30},{r:"Professionista",s:"Consulenza aziendale e strategica",n:25},{r:"Imprenditore",s:"Marketing e comunicazione",n:23},{r:"Imprenditore",s:"Tecnologia e innovazione",n:18},{r:"Imprenditore",s:"Immobiliare, costruzioni e design",n:17},{r:"Professionista",s:"Marketing e comunicazione",n:17},{r:"Consulente",s:"Finanza e assicurazioni",n:17}],
training:[{r:"Consulente",s:"Consulenza aziendale e strategica",n:84},{r:"Professionista",s:"Consulenza aziendale e strategica",n:45},{r:"Consulente",s:"Marketing e comunicazione",n:43},{r:"Imprenditore",s:"Tecnologia e innovazione",n:36},{r:"Imprenditore",s:"Marketing e comunicazione",n:29},{r:"Professionista",s:"Marketing e comunicazione",n:27},{r:"Consulente",s:"Formazione e sviluppo professionale",n:24},{r:"Consulente",s:"Finanza e assicurazioni",n:24}]
};
