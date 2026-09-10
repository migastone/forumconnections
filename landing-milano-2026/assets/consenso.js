/* ─────────── Consenso ai cookie ───────────
   Il pixel di Meta non parte da solo: sta dietro a questo file e viene
   acceso solo se l'utente accetta. E' il motivo per cui il codice base del
   pixel non e' piu' scritto nelle pagine — se fosse in pagina partirebbe al
   caricamento, cioe' prima del consenso, che e' esattamente cio' che per i
   cookie di profilazione non si puo' fare.

   Chi vuole tracciare qualcosa non lo fa da se': chiede a FCConsenso.quando()
   e si accende quando (e se) arriva il si'. */
(() => {
  'use strict';

  const COOKIE = 'fc_consenso';
  const VERSIONE = 1;
  /* Sei mesi: prima di allora il banner non si ripropone a chi ha gia'
     risposto, com'e' richiesto a chi mostra un banner in Italia. */
  const GIORNI = 180;
  const PRIVACY = 'https://www.migastone.com/privacy';

  const iscritti = [];
  let stato = null;
  let barra = null;
  let velo = null;
  let tornaA = null;

  /* ── memoria della scelta ─────────────────────────────────────────────── */
  const dominio = () => {
    const h = location.hostname;
    if (h.indexOf('.') === -1 || /^[\d.]+$/.test(h)) return '';   // localhost o IP
    return '; domain=.' + h.split('.').slice(-2).join('.');
  };

  const leggi = () => {
    const grezzo = (document.cookie.match('(^|;)\\s*' + COOKIE + '\\s*=\\s*([^;]+)') || [])[2];
    if (!grezzo) return null;
    try {
      const v = JSON.parse(decodeURIComponent(grezzo));
      /* Se un domani cambiano le finalita', la versione fa riapparire il
         banner: un consenso dato per altro non vale per quello nuovo. */
      return (v && v.v === VERSIONE) ? v : null;
    } catch (e) { return null; }
  };

  const salva = marketing => {
    stato = { v: VERSIONE, marketing: !!marketing, data: new Date().toISOString() };
    document.cookie = COOKIE + '=' + encodeURIComponent(JSON.stringify(stato)) +
      '; path=/; max-age=' + (GIORNI * 24 * 60 * 60) + '; SameSite=Lax' + dominio() +
      (location.protocol === 'https:' ? '; Secure' : '');
    notifica();
  };

  const ha = categoria => categoria === 'necessari' ? true : !!(stato && stato.marketing);

  const notifica = () => iscritti.forEach(fn => { try { fn(ha('marketing')); } catch (e) {} });

  /* ── barra ────────────────────────────────────────────────────────────── */
  const chiudiBarra = () => { if (barra) { barra.remove(); barra = null; } };

  const mostraBarra = () => {
    if (barra) return;
    barra = document.createElement('div');
    barra.className = 'fc-cs';
    barra.setAttribute('role', 'region');
    barra.setAttribute('aria-label', 'Consenso ai cookie');
    barra.innerHTML =
      '<div class="fc-cs-in">' +
        '<p class="fc-cs-testo"><strong>Cookie e misurazione delle campagne.</strong> ' +
        'I cookie tecnici servono a far funzionare il sito e ci sono sempre. ' +
        'Solo con il tuo consenso attiviamo il pixel di Meta, che ci dice quali annunci ' +
        'portano davvero all\'acquisto del biglietto: comporta la lettura di identificativi ' +
        'dal tuo browser e il loro invio a Meta Platforms Ireland. ' +
        'Puoi cambiare idea quando vuoi. <a href="' + PRIVACY + '" target="_blank" rel="noopener">Privacy</a></p>' +
        '<div class="fc-cs-azioni">' +
          '<button type="button" class="fc-cs-b fc-cs-si" data-fc="si">Accetta</button>' +
          '<button type="button" class="fc-cs-b fc-cs-no" data-fc="no">Rifiuta</button>' +
          '<button type="button" class="fc-cs-piu" data-fc="pan">Personalizza</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(barra);
  };

  /* ── pannello ─────────────────────────────────────────────────────────── */
  const chiudiPannello = () => {
    if (!velo) return;
    velo.remove(); velo = null;
    document.removeEventListener('keydown', esc, true);
    if (tornaA && document.contains(tornaA)) tornaA.focus();
    tornaA = null;
  };

  const esc = e => { if (e.key === 'Escape') chiudiPannello(); };

  const apri = () => {
    if (velo) return;
    tornaA = document.activeElement;
    velo = document.createElement('div');
    velo.className = 'fc-cs-velo';
    velo.innerHTML =
      '<div class="fc-cs-pan" role="dialog" aria-modal="true" aria-labelledby="fc-cs-tit">' +
        '<h2 id="fc-cs-tit">Le tue preferenze</h2>' +
        '<p>Qui decidi tu cosa possiamo attivare. La scelta vale per tutto il sito ' +
        'e resta valida sei mesi.</p>' +

        '<div class="fc-cs-voce">' +
          '<div class="fc-cs-voce-top">' +
            '<h3>Necessari</h3><span class="fc-cs-fisso">Sempre attivi</span>' +
          '</div>' +
          '<p>Tengono in piedi la pagina e ricordano questa scelta, così non ti ' +
          'richiediamo il consenso a ogni visita. Non ti profilano e non finiscono a nessuno.</p>' +
        '</div>' +

        '<div class="fc-cs-voce">' +
          '<div class="fc-cs-voce-top">' +
            '<h3><label for="fc-cs-mk">Misurazione delle campagne</label></h3>' +
            '<span class="fc-cs-sw">' +
              '<input type="checkbox" id="fc-cs-mk"' + (ha('marketing') ? ' checked' : '') + '>' +
              '<span></span>' +
            '</span>' +
          '</div>' +
          '<p>Attiva il pixel di Meta (Facebook e Instagram). Ci dice quale annuncio ha ' +
          'portato all\'acquisto di un biglietto, e permette di non mostrarti annunci per ' +
          'un evento che hai già comprato. Legge identificativi dal tuo browser e li invia ' +
          'a Meta Platforms Ireland. Se lo lasci spento, non partono né il pixel né i suoi cookie.</p>' +
        '</div>' +

        '<p style="font-size:.88rem">Il dettaglio di quali dati trattiamo e per quanto tempo ' +
        'sta nella <a href="' + PRIVACY + '" target="_blank" rel="noopener">privacy policy</a>.</p>' +

        '<div class="fc-cs-pan-azioni">' +
          '<button type="button" class="fc-cs-b fc-cs-si" data-fc="salva">Salva le scelte</button>' +
          '<button type="button" class="fc-cs-b fc-cs-no" data-fc="si">Accetta tutto</button>' +
          '<button type="button" class="fc-cs-b fc-cs-no" data-fc="no">Rifiuta tutto</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(velo);
    document.addEventListener('keydown', esc, true);
    const primo = velo.querySelector('#fc-cs-mk');
    if (primo) primo.focus();
  };

  /* ── comandi ──────────────────────────────────────────────────────────── */
  document.addEventListener('click', e => {
    const b = e.target.closest && e.target.closest('[data-fc], [data-consenso-preferenze]');
    if (!b) return;

    if (b.hasAttribute('data-consenso-preferenze')) { e.preventDefault(); apri(); return; }

    const azione = b.getAttribute('data-fc');
    if (azione === 'pan') { apri(); return; }
    if (azione === 'salva') {
      const sw = velo && velo.querySelector('#fc-cs-mk');
      salva(sw ? sw.checked : false);
    } else if (azione === 'si') {
      salva(true);
    } else if (azione === 'no') {
      salva(false);
    } else { return; }

    chiudiPannello();
    chiudiBarra();
  });

  /* Clic fuori dal pannello: si chiude senza decidere nulla. */
  document.addEventListener('click', e => {
    if (velo && e.target === velo) chiudiPannello();
  });

  /* ── avvio ────────────────────────────────────────────────────────────── */
  stato = leggi();

  const avvia = () => { if (!stato) mostraBarra(); };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', avvia);
  } else {
    avvia();
  }

  window.FCConsenso = {
    ha: ha,
    apri: apri,
    /* Richiama subito con lo stato attuale, e di nuovo a ogni cambio: chi
       ascolta puo' accendersi anche molto dopo il caricamento della pagina. */
    quando: fn => {
      if (typeof fn !== 'function') return;
      iscritti.push(fn);
      try { fn(ha('marketing')); } catch (e) {}
    }
  };
})();
