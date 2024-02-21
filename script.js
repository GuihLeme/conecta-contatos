function abrirModal() {
  document.getElementById('modal').classList.add('active')
}

function fecharModal() {
  document.getElementById('modal').classList.remove('active')
  document.getElementById('form').removeAttribute('class')

  limparCampos()
}

function abrirModalCriar() {
  document.getElementById('form').classList.add('create')
  document.getElementById('action').innerText = 'Criar contato'
  document.getElementById('title-modal').innerText = `Criar contato`

  abrirModal()

}

function abrirModalEditar(index) {
  const contatos = pegarDadosLocalStorage()
  const contato = contatos[index]

  document.getElementById('form').classList.add(`edit-${index}`)
  document.getElementById('action').innerText = 'Editar contato'
  document.getElementById('title-modal').innerText = `Editar ${contato.name}`

  abrirModal()
  preencherCampos(contato)
}

function pegarDadosLocalStorage() {
  return JSON.parse(localStorage.getItem('contatos')) || []
}

function gravarDadosLocalStorage(contatos) {
  return localStorage.setItem('contatos', JSON.stringify(contatos))
}

function limparCampos() {
  document.getElementById('name').value = ''
  document.getElementById('mail').value = ''
  document.getElementById('phone').value = ''
  document.getElementById('badge').value = ''
}

function preencherCampos(contato) {
  document.getElementById('name').value = contato.name
  document.getElementById('mail').value = contato.mail
  document.getElementById('phone').value = contato.phone
  document.getElementById('badge').value = contato.badge
}

function limparContatos() {
  document.getElementById('contacts-wrapper').innerHTML = ''
}

function abrirModalDeletar(index) {
  const contatos = pegarDadosLocalStorage()
  const contato = contatos[index]

  document.getElementById('form').classList.add('delete')
  document.getElementById('form').classList.add('delete')

  abrirModal()
}

// READ
function listarContatos(arrayContatos = []) {
  let contatos = arrayContatos

  if(contatos.length < 1) {
    contatos = pegarDadosLocalStorage()
  }
  
  const contact = document.getElementById('contact')

  if(contatos.length < 1) {
    contact.innerText = 'Nenhum contato'
    return
  }

  contact.innerText = `${contatos.length} contatos` 
  
  contatos.forEach((contato, index) => {
    const contactCard = document.createElement('div')
    contactCard.classList.add('contact-card')
    contactCard.innerHTML = `
      <div class="infos">
        <div class="info-header">
          <h3>${contato.name}</h3>
          <span class="badge">${contato.badge}</span>
        </div>
        <div class="info-content">
          <a href="mailto:${contato.mail}">${contato.mail}</a>
          <a href="tel:+550${contato.phone}">${contato.phone}</a>
        </div>
        </div>
        <div class="actions">
          <button 
            class="${index}" 
            id="edit" 
            onclick="abrirModalEditar(${index})"
          >
            <img src="./assets/edit.svg" alt="editar" />
          </button>
          <button 
            class="${index}" 
            id="delete" 
            onclick="deletarContato(${index})"
          >
            <img class="delete" src="./assets/delete.svg" alt="deletar" />
          </button>
        </div>
      </div>
    `
  
    document.getElementById('contacts-wrapper').appendChild(contactCard)
  })
}

// CREATE
function criarContato() {
  const name = document.getElementById('name').value
  const mail = document.getElementById('mail').value
  const phone = document.getElementById('phone').value
  const badge = document.getElementById('badge').value

  const contatos = pegarDadosLocalStorage()

  const contato = { name, mail, phone, badge }

  contatos.push(contato)

  gravarDadosLocalStorage(contatos)

  limparContatos()
  limparCampos()
  listarContatos()
  fecharModal()
}


// UPDATE
function atualizarContato(index) {
  const contatos = pegarDadosLocalStorage()

  const name = document.getElementById('name').value
  const mail = document.getElementById('mail').value
  const phone = document.getElementById('phone').value
  const badge = document.getElementById('badge').value

  const contatoAtualizado = { name, mail, phone, badge }

  contatos[index] = contatoAtualizado
  console.log(contatos)
  gravarDadosLocalStorage(contatos)
  document.getElementById('form').classList.remove(`${index}`)
  limparCampos()
  limparContatos()
  listarContatos()
  fecharModal()
}

// DELETE
function deletarContato(index) {
  const contatos = pegarDadosLocalStorage()

  if(confirm('Deseja realmente deletar este contato?') === true) {
    contatos.splice(index, 1)
    gravarDadosLocalStorage(contatos)
    limparContatos()
    listarContatos()
  }
}

// ORDENAR
var ordenar = false
function organizarContatos() {
  const contatos = pegarDadosLocalStorage()

  ordenar = !ordenar
  document.getElementById('order').style.transform = ordenar ? 'rotate(90deg)' : 'rotate(-90deg)'

  contatos.sort((a, b) => {
    return ordenar ?
      a.name > b.name ? 1 : -1 :
      b.name > a.name ? 1 : -1
  })

  gravarDadosLocalStorage(contatos)
  limparContatos()
  listarContatos()
}

// EVENTOS
document.getElementById('form').addEventListener('submit', (event) => {
  const action = document.getElementById('form').getAttribute('class').split('-')[0]
  const index = document.getElementById('form').getAttribute('class').split('-')[1]

  switch (action) {
    case 'edit':
      event.preventDefault()

      console.log(index)

      atualizarContato(index)

      document.getElementById('form').removeAttribute('class')

      break;

    case 'create':
      event.preventDefault()

      criarContato()

      document.getElementById('form').removeAttribute('class')

      break;
  }
})

document.getElementById('search').addEventListener('keyup', (event) => {
  const contatos = pegarDadosLocalStorage()
  const search = event.target.value.toLowerCase()

  const filteredContacts = contatos.filter(contato => {
    return contato.name.toLowerCase().includes(search)
  })

  console.log(filteredContacts)

  limparContatos()
  listarContatos(filteredContacts)
})

// Inicialização

listarContatos()