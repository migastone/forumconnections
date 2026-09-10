/* ─────────── Meta Pixel: eventi e passaggio dei parametri al checkout ───────────
   Il checkout vive su un altro dominio (auto.migamatch.com), e _fbp/_fbc sono
   cookie di prima parte: da li' non si possono leggere. L'unico modo perche'
   l'attribuzione sopravviva al salto di dominio e' riattaccarli alla query
   string del link. Senza questo file la vendita risulta "diretta" e la
   campagna che l'ha generata non prende il merito.

   Il file e' condiviso da home, aziende/ e upsell/ apposta: la logica sotto
   dipende da una corsa fra il caricamento del pixel e il clic dell'utente, e
   tre copie separate sarebbero divergute alla prima modifica.

   Niente qui parte da solo: il codice base del pixel non e' scritto nelle
   pagine ma iniettato da qui, e solo dopo che FCConsenso ha detto di si'. */
(() => {
  'use strict';

  const PIXEL_ID = '838485425972882';
  const SKU_BIGLIETTO = 'MM_FORUM_MI_20261017';

  /* Prezzi degli SKU secondari: sono fissi in pagina (aziende/, upsell/).
     Il biglietto base NON sta qui: lo decide LISTINO, vedi valoreDi(). */
  const PREZZI = {
    'MM_FORUM_MI_20261017_AZIENDA': 599,
    'MM_FORUM_MI_20261017_CENA': 49
  };

  /* Parametri richiesti dall'attribuzione Meta/Google, nell'ordine in cui
     vanno riattaccati al link. */
  const CHIAVI_ADS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term',
    'fbclid', 'gclid'
  ];

  /* Gli altri identificativi che la landing raccoglieva gia' prima del pixel:
     restano perche' coprono campagne non-Meta gia' attive (TikTok, LinkedIn,
     Bing) e toglierli spegnerebbe un'attribuzione che oggi funziona. */
  const CHIAVI_EXTRA = [
    'utm_id', 'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
    'gbraid', 'wbraid', 'msclkid', 'ttclid', 'li_fat_id', 'twclid', 'epik', 'sccid',
    'ref', 'referrer'
  ];

  const TUTTE = CHIAVI_ADS.concat(CHIAVI_EXTRA);
  const STORE = 'fc_tracciamento';
  const MAX = 200;

  const taglia = v => String(v).slice(0, MAX);
  const cookie = n =>
    (document.cookie.match('(^|;)\\s*' + n + '\\s*=\\s*([^;]+)') || [])[2];

  const consenso = () => !!(window.FCConsenso && window.FCConsenso.ha('marketing'));

  const inArrivo = new URLSearchParams(location.search);

  /* ── 1 · memoria di sessione ────────────────────────────────────────────
     Chi atterra da un annuncio puo' girare per il sito e arrivare al CTA da
     una pagina interna, il cui URL non ha piu' nessun parametro. Quello che
     arriva la prima volta va quindi ricordato — e il PRIMO valore vince: se
     poi l'utente ripassa da un altro link, la campagna che ha davvero aperto
     la sessione non deve essere sovrascritta.

     E' archiviazione sul dispositivo per finalita' di marketing, quindi vive
     solo con il consenso: senza, la memoria non si scrive e quella eventuale
     di prima si cancella. */
  let salvati = {};

  const ricorda = () => {
    if (!consenso()) {
      salvati = {};
      try { sessionStorage.removeItem(STORE); } catch (e) {}
      return;
    }
    try { salvati = JSON.parse(sessionStorage.getItem(STORE) || '{}'); } catch (e) { salvati = {}; }
    let cambiato = false;
    TUTTE.forEach(k => {
      const v = (inArrivo.get(k) || '').trim();
      if (v && !salvati[k]) { salvati[k] = taglia(v); cambiato = true; }
    });
    if (cambiato) {
      try { sessionStorage.setItem(STORE, JSON.stringify(salvati)); } catch (e) {}
    }
  };

  /* URL corrente se c'e'. La memoria di sessione solo se possiamo tenerla:
     senza consenso passa al checkout soltanto cio' che l'utente si porta
     gia' dietro nel link su cui ha cliccato. */
  const valore = k => (inArrivo.get(k) || '').trim() || (consenso() ? (salvati[k] || '') : '');

  /* ── 2 · _fbc, il pezzo che mancava ─────────────────────────────────────
     _fbc e' il cookie che lega la vendita al singolo clic sull'annuncio, ed
     e' il pixel a scriverlo partendo da fbclid. Ma lo fa dopo aver caricato
     fbevents.js dalla rete: chi atterra e clicca subito il CTA parte prima
     che il cookie esista, e l'attribuzione si perde proprio sul traffico
     piu' caldo. Quando il cookie non c'e' ancora ma fbclid si', lo
     ricostruiamo nel formato documentato da Meta
     (fb.<sottodominio>.<timestamp>.<fbclid>).
     Se invece il cookie vero esiste, vince lui: sovrascriverlo con un valore
     inventato spaccherebbe la corrispondenza con gli eventi del pixel.

     _fbp invece non si ricostruisce: non deriva da nulla che sia gia'
     nell'URL, e inventarlo manderebbe al checkout un id diverso da quello
     che il pixel usa negli eventi del browser. Se il cookie non c'e', il
     parametro semplicemente non parte. */
  const fbc = () => {
    if (!consenso()) return '';
    const vero = cookie('_fbc');
    if (vero) return vero;
    const fbclid = valore('fbclid');
    return fbclid ? 'fb.1.' + Date.now() + '.' + fbclid : '';
  };

  const uuid = () => {
    try {
      if (crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch (e) {}
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  };

  /* ── 3 · valore dell'evento ────────────────────────────────────────────
     Il biglietto base cambia prezzo con la data: la fonte e' LISTINO in
     index.html, mai un numero scritto qui. Se LISTINO non c'e' (pagine
     interne) l'evento parte senza value invece che con un prezzo sbagliato. */
  const prezzoBiglietto = () => {
    let listino;
    try { listino = LISTINO; } catch (e) { return null; }   // TDZ o pagina senza listino
    if (!Array.isArray(listino) || !listino.length) return null;
    const oggi = new Date().toLocaleDateString('sv-SE');
    const riga = listino.find(r => oggi <= r.fino) || listino[listino.length - 1];
    const n = parseFloat(String(riga.prezzo).replace(/[^\d.,]/g, '').replace(',', '.'));
    return isFinite(n) ? n : null;
  };

  const valoreDi = sku =>
    sku === SKU_BIGLIETTO ? prezzoBiglietto()
                          : (PREZZI[sku] != null ? PREZZI[sku] : null);

  const datiEvento = sku => {
    const d = { content_ids: [sku], content_type: 'product', currency: 'EUR' };
    const v = valoreDi(sku);
    if (v != null) d.value = v;
    return d;
  };

  /* ── 4 · costruzione del link ──────────────────────────────────────────
     Il link NON viene mai spedito statico: si ricostruisce ogni volta dal
     suo href originale, perche' i cookie del pixel possono essere comparsi
     dopo il caricamento della pagina. Cio' che e' gia' scritto sul link
     (a partire da sku) ha comunque la precedenza. */
  const base = a => {
    if (!a.dataset.hrefBase) a.dataset.hrefBase = a.getAttribute('href');
    return a.dataset.hrefBase;
  };

  const costruisci = (a, eid) => {
    let u;
    try { u = new URL(base(a), location.href); } catch (e) { return a.href; }

    const originali = new URLSearchParams(u.search);
    const out = new URLSearchParams();
    const metti = (k, v) => {
      const scelto = originali.has(k) ? originali.get(k) : v;
      if (scelto && !out.has(k)) out.set(k, taglia(scelto));   // URLSearchParams codifica da se'
    };

    metti('_fbp', consenso() ? cookie('_fbp') : '');
    metti('_fbc', fbc());
    metti('fbclid', valore('fbclid'));
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
      .forEach(k => metti(k, valore(k)));
    metti('gclid', valore('gclid'));
    metti('src', 'landing-milano-2026');
    metti('sku', SKU_BIGLIETTO);
    if (eid) metti('mm_eid', eid);
    CHIAVI_EXTRA.forEach(k => metti(k, valore(k)));
    originali.forEach((v, k) => metti(k, v));   // nulla di cio' che c'era va perso

    u.search = out.toString();
    return u.toString();
  };

  const CHECKOUT = 'a[href*="auto.migamatch.com"]';

  /* Senza mm_eid: nessun evento e' stato mandato, quindi non c'e' un id da
     deduplicare. Serve a tenere il link valido anche per il tasto centrale,
     "copia indirizzo" e i bot che leggono l'href. */
  const aggiorna = el => {
    (el ? [el] : Array.prototype.slice.call(document.querySelectorAll(CHECKOUT)))
      .forEach(a => { a.href = costruisci(a, null); });
  };

  const linkDa = e => e.target && e.target.closest && e.target.closest(CHECKOUT);

  /* ── 5 · il pixel, acceso solo col consenso ────────────────────────────
     Il codice base sta qui e non nelle pagine: se fosse in pagina partirebbe
     al caricamento, cioe' prima che l'utente abbia risposto al banner. */
  let acceso = false;

  const accendiPixel = () => {
    if (acceso) return;
    acceso = true;
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', PIXEL_ID);
    window.fbq('track', 'PageView');
  };

  /* ViewContent solo dove il tag script lo chiede (la pagina del biglietto):
     le pagine interne vendono altro e non devono sporcare l'evento.
     currentScript va letto subito: dentro un evento asincrono e' gia' null. */
  const skuVC = document.currentScript && document.currentScript.dataset.viewcontentSku;

  /* ── 6 · clic ──────────────────────────────────────────────────────────
     Id nuovo a ogni clic, mandato al pixel come eventID e al checkout come
     mm_eid: a valle lo stesso acquisto visto dal browser e dal server conta
     per uno solo. Senza consenso non parte nessun evento, quindi non c'e'
     niente da deduplicare e mm_eid non serve. */
  document.addEventListener('click', e => {
    const a = linkDa(e);
    if (!a) return;
    if (!consenso()) { a.href = costruisci(a, null); return; }

    const eid = uuid();
    a.href = costruisci(a, eid);
    const sku = new URL(a.href, location.href).searchParams.get('sku') || SKU_BIGLIETTO;
    try {
      if (window.fbq) window.fbq('track', 'InitiateCheckout', datiEvento(sku), { eventID: eid });
    } catch (err) {}
  }, true);

  /* Il clic centrale e il menu contestuale non passano da 'click': qui il
     link viene rinfrescato appena il puntatore lo tocca, cosi' i cookie
     comparsi dopo il caricamento finiscono comunque nell'URL copiato. */
  ['pointerdown', 'auxclick', 'contextmenu', 'focusin'].forEach(ev =>
    document.addEventListener(ev, e => {
      const a = linkDa(e);
      if (a) aggiorna(a);
    }, true));

  /* ── 7 · avvio ────────────────────────────────────────────────────────
     quando() richiama subito con lo stato attuale e di nuovo a ogni cambio:
     se il si' arriva mezz'ora dopo, il pixel si accende allora e i link gia'
     in pagina vengono riscritti con i cookie appena nati. */
  const avvia = () => {
    const parti = ok => {
      ricorda();
      if (ok) {
        accendiPixel();
        if (skuVC) {
          try { window.fbq('track', 'ViewContent', datiEvento(skuVC)); } catch (e) {}
        }
      }
      aggiorna();
    };
    if (window.FCConsenso) window.FCConsenso.quando(parti);
    else parti(false);   // consenso.js non caricato: nel dubbio non si traccia
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', avvia);
  } else {
    avvia();
  }
})();
