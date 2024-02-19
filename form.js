const contatos = JSON.parse(localStorage.getItem('contatos'))

const form = document.getElementById('form')

form.addEventListener('submit', function(event) {
  event.preventDefault()
  adicionarContato()
})

function adicionarContato() {
  const nome = document.getElementById('name').value
  const email = document.getElementById('mail').value
  const phone = document.getElementById('phone').value
  const badge = document.getElementById('badge').value


  contatos.push({ nome, email, phone, badge })

  localStorage.setItem('contatos', JSON.stringify(contatos))
}


