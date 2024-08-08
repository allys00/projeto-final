const doLogin = async (userData) => {
  try {
    const userLogged = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json())

    return userLogged.user;
  } catch (error) {
    console.error(error)
  }
}

const emailInput = document.getElementById('login-email')
const passwordInput = document.getElementById('login-password')
const loginButton = document.getElementById('login-button')
const loginSuccessAlert = document.getElementById('login-success')


loginButton.addEventListener('click', async () => {
  // Pegar os dados do input;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    return alert('Preencha todos os campos')
  }

  // Enviar os dados para a api;
  const userData = { email, password };
  const user = await doLogin(userData);
  console.log(user)
  if (user) {
    loginSuccessAlert.className += 'flex';
    localStorage.setItem("user", JSON.stringify(user))
    setTimeout(() => {
      window.location.href = 'http://127.0.0.1:5500/front-end/eventos/index.html'
    }, 2000);
  }
})