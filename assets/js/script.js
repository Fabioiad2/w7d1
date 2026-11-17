
// === CLASSI ===

class Libro {
    letto = false;

    constructor(titolo, autore, anno) {
        this.id = crypto.randomUUID();
        this.titolo = titolo;
        this.autore = autore;
        this.anno = anno;
    }

    segnaComeLetto() {
        this.letto = true;
    }

    formato() {
        return 'cartaceo';
    }

    static daStringa(s) {
        const [titolo, autore, anno] = s.split('|');
        return new Libro(titolo, autore, Number(anno));
    }

    // Ricostruisce un'istanza dai dati JSON
    static fromJSON(d) {
        return Object.assign(
            new this(d.titolo, d.autore, d.anno, d.dimensioneMb),
            d,
        );
    }
}

class LibroDigitale extends Libro {
    constructor(titolo, autore, anno, dimensioneMb) {
        super(titolo, autore, anno);
        this.dimensioneMb = dimensioneMb;
    }

    formato() {
        return `digitale (${this.dimensioneMb} MB)`;
    }
}

// === STATO E LOCALSTORAGE ===

const STORAGE_KEY = 'libri';

let libri = caricaLibri();

function salvaLibri() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(libri));
}

function caricaLibri() {
    const datiSalvati = localStorage.getItem(STORAGE_KEY);

    if (!datiSalvati) {
        return [];
    }

    return JSON.parse(datiSalvati, (chiave, valore) => {
        if (valore && typeof valore === 'object' && 'id' in valore) {
            return 'dimensioneMb' in valore
                ? LibroDigitale.fromJSON(valore)
                : Libro.fromJSON(valore);
        }

        return valore;
    });
}

// === RENDER ===

function crea(tag, classe, testo) {
    const el = document.createElement(tag);

    if (classe) {
        el.className = classe;
    }

    if (testo !== undefined) {
        el.textContent = testo;
    }

    return el;
}

function creaBottone(azione, testo) {
    const b = crea('button', '', testo);
    b.type = 'button';
    b.dataset.azione = azione;
    return b;
}

function renderLibri() {
    const righe = libri.map((l) => {
        const li = crea('li', l.letto ? 'letto' : '');
        li.dataset.id = l.id;

        const info = crea('div', 'info');

        info.append(
            crea('span', 'titolo', l.titolo),
            crea('span', 'badge-formato', l.formato()),
            crea('div', 'meta', `${l.autore} — ${l.anno}`),
        );

        const azioni = crea('div', 'azioni');

        azioni.append(
            l.letto
                ? crea('span', '', '✓ letto')
                : creaBottone('leggi', 'Segna come letto'),

            creaBottone('rimuovi', 'Rimuovi'),
        );

        li.append(info, azioni);
        return li;
    });

    const lista = document.getElementById('lista-libri');

    if (righe.length === 0) {
        lista.replaceChildren(
            crea('li', 'vuota', 'Nessun libro in catalogo.'),
        );
    } else {
        lista.replaceChildren(...righe);
    }

    document.getElementById('contatore').textContent = libri.length;
}

// === EVENTI ===

// Mostra o nasconde il campo dimensione
document.getElementById('formato').addEventListener('change', (e) => {
    document.getElementById('campo-dimensione').hidden =
        e.target.value !== 'digitale';
});

// Aggiunge un libro
document.getElementById('aggiungi-libro').addEventListener('submit', (e) => {
    e.preventDefault();

    const { titolo, autore, anno, formato, dimensione } =
        Object.fromEntries(new FormData(e.target));

    const nuovo = formato === 'digitale'
        ? new LibroDigitale(
            titolo,
            autore,
            Number(anno),
            Number(dimensione) || 0,
        )
        : new Libro(titolo, autore, Number(anno));

    libri.push(nuovo);

    salvaLibri();
    renderLibri();

    e.target.reset();
    document.getElementById('campo-dimensione').hidden = true;
});

// Segna come letto oppure rimuove un libro
document.getElementById('lista-libri').addEventListener('click', (e) => {
    const bottone = e.target.closest('[data-azione]');

    if (!bottone) {
        return;
    }

    const id = bottone.closest('li').dataset.id;

    if (bottone.dataset.azione === 'leggi') {
        libri.find((l) => l.id === id)?.segnaComeLetto();

    } else if (bottone.dataset.azione === 'rimuovi') {
        libri = libri.filter((l) => l.id !== id);
    }

    salvaLibri();
    renderLibri();
});

// Svuota tutta la libreria
document.getElementById('svuota-tutto').addEventListener('click', () => {
    libri = [];

    localStorage.removeItem(STORAGE_KEY);

    renderLibri();
});

// === AVVIO ===

renderLibri();
