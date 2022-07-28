const statusPoke = document.querySelectorAll('.stat')
const tiposPoke = document.querySelector('.types')
const menu = document.querySelector('.container')

voltar.addEventListener('click', () => {
  menu.style.display = 'none'
  pokedex.style.display = 'block'
})

// Eventos das Li
function mouseHover(li) {li.forEach(item => item.addEventListener('mouseover', () => item.children[1].src = `src/img/Poke-Ani.gif`))}
function mouseOut(li) {li.forEach(item => item.addEventListener('mouseout', () => item.children[1].src = `src/img/Poke.png`))}
function pegaId(obj) {
  menu.style.display = 'flex'
  pokedex.style.display = 'none'
  getPokeInfo(obj.id)
}

const getUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
const generatePoke = () => Array(151).fill().map((_, i) => fetch(getUrl(i + 1)).then(response => response.json()))

const generateHTML = pokemons => {
  return listaPokemons = pokemons.reduce((acc, pokemon) => {
    const tipos = pokemon.types.map(tipo => tipo.type.name)

    acc += 
    `<li class="select" onclick="pegaId(this)" id="${pokemon.id}">
      <span class="id">${pokemon.id}</span>
      <img src="src/img/Poke.png">
      <h3 class="namelist">${pokemon.name}</h3>
      <span class="type ${tipos[0]}">${tipos[0]}</span>
      <span class="type ${tipos[1]}">${tipos[1]}</span>
    </li>`
    return acc
  }, '')}

const getPokemons = () => {
  const pokeRetorno = generatePoke()

  Promise.all(pokeRetorno)
  .then(generateHTML)
  .then(() => {
   pokeTabela.innerHTML = listaPokemons
   const selecao = document.querySelectorAll('.select')
   mouseHover(selecao)
   mouseOut(selecao)
  })}

const getPokeInfo = (id) => {
    pokeimgs(id)
    fetch(getUrl(id)).then(response => response.json())
      .then(item => {
        pokeId.textContent = `ID: ${item.id}`
        pokeName.textContent = item.name
        const getStatus = item.stats
        for(let i = 0; i < getStatus.length; i++) {
          statusPoke[i].textContent = getStatus[i].base_stat
        }
        const tipos = item.types.map(tipo => tipo.type.name)
          tiposPoke.innerHTML = 
           `<span class="type ${tipos[0]}">
           ${tipos[0]}
           </span>
           <span class="type ${tipos[1]}">
           ${tipos[1]}
           </span>`
      })}

const pokeimgs = (id) => {
  const pokesprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`
  pokeImg.src = pokesprite}

getPokemons()