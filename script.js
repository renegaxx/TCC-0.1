import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAkP-I25nJEg6euMw70y09_7d6SpMQPBL0",
    authDomain: "puthype-server.firebaseapp.com",
    projectId: "puthype-server",
    storageBucket: "puthype-server.firebasestorage.app",
    messagingSenderId: "453444696907",
    appId: "1:453444696907:web:fb9b901e785c56cd97c6ce"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);

// Configurar a persistência da autenticação com AsyncStorage
const auth = getAuth(app);


const db = getFirestore(app);

export { auth, db };

window.handleLogin = function () {
    console.log("Função handleLogin chamada");
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('Login bem-sucedido!');
            handleLoginSuccess();  // Chama a função para animação após login bem-sucedido
        })
        .catch((error) => {
            alert('Erro: ' + error.message);
        });
};


// Função para cadastro
window.handleRegister = function () {
    const fullName = document.getElementById('register-name').value;
    const phone = document.getElementById('register-phone').value;
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    if (fullName === "" || phone === "" || username === "" || email === "" || password === "") {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userRef = doc(db, "users", user.uid);

            setDoc(userRef, {
                fullName: fullName,
                phone: phone,
                username: username,
                email: email,
            })
            .then(() => {
                alert('Cadastro bem-sucedido!');
            })
            .catch((error) => {
                alert('Erro ao salvar dados no Firestore: ' + error.message);
            });
        })
        .catch((error) => {
            alert('Erro no cadastro: ' + error.message);
        });
};

// Função para resetar a senha
window.handleResetPassword = function () {
    const email = prompt('Digite seu e-mail para redefinir a senha:');
    if (email) {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Um e-mail de redefinição foi enviado!');
            })
            .catch((error) => {
                alert('Erro: ' + error.message);
            });
    }
};

// Função para alternar entre login e cadastro
window.toggleForm = function () {
    const loginContainer = document.getElementById("login-container");
    const registerContainer = document.getElementById("register-container");

    if (loginContainer.style.display === "none") {
        loginContainer.style.display = "block";
        registerContainer.style.display = "none";
    } else {
        loginContainer.style.display = "none";
        registerContainer.style.display = "block";
    }
};

// Função para tratar o sucesso do login
// Função para tratar o sucesso do login

function handleLoginSuccess() {
    const loginContainer = document.getElementById('login-container');
    loginContainer.classList.add('fade-out'); // Adiciona a animação de fade-out

    // Cria a logo centralizada
    const logoCenter = document.createElement('img');
    logoCenter.src = 'assets/logo.png'; // Caminho da logo
    logoCenter.id = 'logo-center'; // Aplica a id para estilização
    document.body.appendChild(logoCenter); // Adiciona a logo ao corpo do documento

    // Aguarda 2,5 segundos e redireciona para outra página
    setTimeout(() => {
        window.location.href = 'boasvindas.html'; // Redireciona para a página de boas-vindas
    }, 2500); // Ajuste o tempo se necessário
}