
// Verificar se o usuario ta logado

const userJson = localStorage.getItem("user")

const irParaLogin = () => {
  window.location.href = 'http://127.0.0.1:5500/front-end/entrar/index.html'
}

if (!userJson) {
  irParaLogin()
}

const { user } = JSON.parse(userJson)

const userNameElement = document.getElementById('user-name')
const userEmailElement = document.getElementById('user-email')
const logoutButtonElement = document.getElementById('logout-btn')
userNameElement.textContent = user.name;
userEmailElement.textContent = user.email;

logoutButtonElement.addEventListener('click', () => {
  localStorage.removeItem('user');
  irParaLogin()
})