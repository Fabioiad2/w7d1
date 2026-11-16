// Mini-libreria — Settimana VII Giorno I
const lista = document.querySelector('#lista-libri')

const formato = document.querySelector('#formato').value
const form = document.querySelector('#form')
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
// 2. Definire una classe LibroDigitale che estende Libro (aggiunge formato, dimensioneMb)
// 3. Aggiungere un listener al form che crea una nuova istanza e la aggiunge all'array
// 4. Renderizzare la lista nel <ul id="lista-libri"> via innerHTML
//
// Bonus: bottone "Segna come letto" su ogni elemento, gestito con event delegation.


// === Classi ===



// === Stato (array di libri) ===



// === Render ===
function render(list){
    list.forEach(l=>{
        const div1 = document.createElement('div')
        div1.classList.add('col-12')
        const pirmo = document.createElement('div')
        pirmo.classList.add('col-md-6','col-12')
        const secondo = document.createElement('div')
        secondo.classList.add('col-md-6','col-12')
        const titolo = document.createElement('h4')
        const autore = document.createElement('h4')
        const anno = document.createElement('h4')
        const letto = document.createElement('h4')
        const btn = document.createElement('button')
        btn.textContent = 'segna come letto'
        btn.classList.add('btn','btn-dark')
        titolo.textContent = l.titolo
        autore.textContent = l.autore
        anno.textContent = l.anno
        letto.textContent = l.letto
        lista.appendChild(div1)
        div1.appendChild(pirmo)
        pirmo.appendChild(titolo)
        pirmo.appendChild(anno)
        div1.appendChild(secondo)
        secondo.appendChild(btn)
    })
}



// === Eventi ===

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const titolo = document.querySelector('#titolo').value
    const autore = document.querySelector('#autore').value
    const anno = document.querySelector('#anno').value
    const newLibro = new Libro(titolo, autore, anno)
    console.log(newLibro)
    libri = [...libri, newLibro]
    console.log(libri,'list')
    render([...libri, newLibro])

})