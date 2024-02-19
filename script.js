const contatos = JSON.parse(localStorage.getItem('contatos'))

console.log(contatos)
contatos.forEach(contato => {
  const contactCard = document.createElement('div')
  contactCard.classList.add('contact-card')
  contactCard.innerHTML = `
    <div class="infos">
      <div class="info-header">
        <h3>${contato.nome}</h3>
        <span class="badge">${contato.badge}</span>
      </div>
      <div class="info-content">
        <a href="mailto:${contato.email}">${contato.email}</a>
        <a href="tel:+550${contato.phone}">${contato.phone}</a>
      </div>
      </div>
      <div class="actions">
        <button><img class="edit" src="./assets/edit.svg" alt="editar" onclick="listarContatos()" />
        <button><img class="delete" src="./assets/delete.svg" alt="deletar" />
      </div>
    </div>
  `

  document.getElementById('contacts-wrapper').appendChild(contactCard)
})