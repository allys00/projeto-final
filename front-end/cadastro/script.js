const createUser = async (userData) => {
  try {
    const createdUser = await fetch('http://localhost:3000/user', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(res => res.json())

    return createdUser;
  } catch (error) {
    console.error(error)
  }
}

// Pegar Elementos

const nameInput = document.getElementById('signup-name')
const emailInput = document.getElementById('signup-email')
const passwordInput = document.getElementById('signup-password')
const signupButton = document.getElementById('signup-button')
const signupSuccessAlert = document.getElementById('signup-success')



signupButton.addEventListener('click', async () => {
  // Pegar os dados do input;
  const name = nameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;

  if (!name || !email || !password) {
    return alert('Preencha todos os campos')
  }

  // Enviar os dados para a api;
  const userData = { name, email, password };
  const user = await createUser(userData);

  if (user) {
    signupSuccessAlert.className += 'flex';
    setTimeout(() => {
      window.location.href = 'http://127.0.0.1:5500/front-end/entrar/index.html'
    }, 2000);
  }
})