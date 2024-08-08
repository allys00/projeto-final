// API
// Event = title, done, userId
const createEvent = async (event) => {
  try {
    const eventCreated = await fetch('http://localhost:3000/events', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }).then(res => res.json())

    return eventCreated;
  } catch (error) {
    alert(error)
  }
}

const deleteEvent = async (eventId) => {
  try {
    await fetch('http://localhost:3000/events' + '/' + eventId, {
      method: 'DELETE',
    })
  } catch (error) {
    alert(error)
  }
}

const updateEvent = async (eventId, eventUpdate) => {
  try {
    await fetch('http://localhost:3000/events' + '/' + eventId, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(eventUpdate)
    })
  } catch (error) {
    alert(error)
  }
}

const getEvents = async (userId) => {
  try {
    const events = await fetch('http://localhost:3000/events' + '/' + userId).then(res => res.json())
    return events;
  } catch (error) {
    alert(error)
  }
}

// Verificar se o usuario ta logado

const userJson = localStorage.getItem("user")

const irParaLogin = () => {
  window.location.href = 'http://127.0.0.1:5500/front-end/entrar/index.html'
}

if (!userJson) {
  irParaLogin()
}

const user = JSON.parse(userJson)

const userNameElement = document.getElementById('user-name')
const userEmailElement = document.getElementById('user-email')
const logoutButtonElement = document.getElementById('logout-btn')
const createEventButtonElement = document.getElementById('create-event-btn')
const createEventInputElement = document.getElementById('create-event-input')
const eventsListElement = document.getElementById('events-list')

userNameElement.textContent = user.name;
userEmailElement.textContent = user.email;

logoutButtonElement.addEventListener('click', () => {
  localStorage.removeItem('user');
  irParaLogin()
})

createEventButtonElement.addEventListener('click', async () => {
  const title = createEventInputElement.value
  await createEvent({ title: title, done: false, userId: user.id });
  window.location.reload()
})

getEvents(user.id).then(events => {
  for (const event of events) {
    const liElement = document.createElement('li');
    liElement.className = 'flex justify-between items-center mb-4';

    const checkAndTitleEl = document.createElement('div');
    checkAndTitleEl.className = 'flex gap-4';

    const checkEl = document.createElement('input');
    checkEl.type = 'checkbox';
    checkEl.checked = event.done ? "checked" : ""
    checkEl.className = 'checkbox'

    checkEl.addEventListener('click', async () => {
      await updateEvent(event.id, { done: !event.done })
      window.location.reload()
    })

    const titleEl = document.createElement('p');
    titleEl.textContent = event.title;

    const deleteEl = document.createElement('button');
    deleteEl.className = 'btn btn-error btn-outline btn-sm'
    deleteEl.textContent = 'Deletar'

    deleteEl.addEventListener('click', async () => {
      await deleteEvent(event.id)
      window.location.reload()
    })

    checkAndTitleEl.appendChild(checkEl)
    checkAndTitleEl.appendChild(titleEl)

    liElement.appendChild(checkAndTitleEl)
    liElement.appendChild(deleteEl)

    eventsListElement.appendChild(liElement)
  }
})
