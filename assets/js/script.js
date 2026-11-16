// Mini-libreria — Settimana VII Giorno I
const lista = document.querySelector('#lista-libri')

const formato = document.querySelector('#formato')
const form = document.querySelector('#form')
const boxDigitale  = document.querySelector('#boxDigitale')
const dimensione = document.querySelector('#dimensione')
 const titolo = document.querySelector('#titolo')
const autore = document.querySelector('#autore')
const anno = document.querySelector('#anno')
//
let libri = []
// Devi fare 4 cose:
// 1. Definire una classe Libro (titolo, autore, anno, letto)
class Libro {
    constructor(_titolo, _autore, _anno, _letto) {
        this.titolo = _titolo;
        this.autore = _autore;
        this.anno = _anno;
        this.letto = _letto
    }
}
class LibroDigitale extends Libro{
    constructor(_titolo, _autore, _anno, _letto,_formato,_dimensioneMb){
        super(_titolo, _autore, _anno, _letto)
        this.formato = _formato
        this.dimensioneMb = _dimensioneMb
    }
}
// 2. Definire una classe LibroDigitale che estende Libro (aggiunge formato, dimensioneMb)
// 3. Aggiungere un listener al form che crea una nuova istanza e la aggiunge all'array
// 4. Renderizzare la lista nel <ul id="lista-libri"> via innerHTML
//
// Bonus: bottone "Segna come letto" su ogni elemento, gestito con event delegation.


// === Classi ===



// === Stato (array di libri) ===



// === Render ===
function render(list){
    lista.textContent = ''
    list.forEach(l=>{
        const div1 = document.createElement('div')
        div1.classList.add('col-12','d-flex','card','flex-row')
        const pirmo = document.createElement('div')
        pirmo.classList.add('col-md-6','col-12')
        const secondo = document.createElement('div')
        secondo.classList.add('col-md-6','col-12')
        const titoloLibro = document.createElement('h4')
        const autore = document.createElement('h4')
        const anno = document.createElement('h4')
        const letto = document.createElement('h4')
        const btn = document.createElement('button')
        btn.textContent = 'segna come letto'
        btn.classList.add('btn','btn-dark')
        titoloLibro.textContent = l.titolo
        autore.textContent = l.autore
        anno.textContent = l.anno
        letto.textContent = l.letto
        lista.appendChild(div1)
        div1.appendChild(pirmo)
        pirmo.appendChild(titoloLibro)
        pirmo.appendChild(anno)
        pirmo.appendChild(autore)
        div1.appendChild(secondo)
        secondo.appendChild(btn)
    })
}

let newLibro;

// === Eventi ===
formato.addEventListener('change', () => {
  boxDigitale.classList.toggle('d-none', formato.value !== 'digitale')
})

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if (formato.value === 'digitale') {
    newLibro = new LibroDigitale(titolo.value, autore.value, anno.value, false, formato.value, dimensione.value)
  } else {
    newLibro = new Libro(titolo.value, autore.value, anno.value, false)
  }

  libri = [...libri, newLibro]
  render(libri)
})



const newdigial = new LibroDigitale('uno','due','tre')
console.log(newdigial)