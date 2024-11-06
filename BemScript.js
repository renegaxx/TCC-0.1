import { getAuth } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-firestore.js";
import { app, db } from './script.js';  // Importando a configuração do Firebase

const auth = getAuth(app);
const user = auth.currentUser;

if (user) {
    // Se o usuário estiver logado, tenta pegar o nome do Firestore
    const userRef = doc(db, "users", user.uid);
    getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const username = userData.username; // Pegando o nome de usuário armazenado
            document.getElementById("username").innerText = username; // Atualizando o nome do usuário na página
        } else {
            console.log("Usuário não encontrado no Firestore");
        }
    }).catch((error) => {
        console.log("Erro ao recuperar dados do Firestore:", error);
    });
} else {
    console.log("Usuário não está logado.");
}
