const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// Disparo de Notificação Global (Manual, Avisos e Atividades)
exports.enviarPushGlobal = functions.firestore
  .document("notificacoes_push_manual/{docId}")
  .onCreate(async (snap) => {
    const dados = snap.data();
    const titulo = dados.titulo || "Aviso da LAPE";
    const texto = dados.texto || "";

    const membrosSnapshot = await admin.firestore().collection("membros").get();
    const tokens = [];
    
    membrosSnapshot.forEach(doc => {
      const token = doc.data().fcmToken;
      if (token) tokens.push(token);
    });

    if (tokens.length === 0) return null;

    const payload = {
      notification: {
        title: titulo,
        body: texto,
        icon: "brasao.png"
      }
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });

// Disparo de Notificação Individual (Perfil, Frequência, etc.)
exports.enviarPushIndividual = functions.firestore
  .document("notificacoes_individuais/{docId}")
  .onCreate(async (snap) => {
    const dados = snap.data();
    const membroId = dados.membroId;
    const titulo = dados.titulo || "Atualização LAPE";
    const texto = dados.texto || "";

    if (!membroId) return null;

    const membroDoc = await admin.firestore().collection("membros").doc(membroId).get();
    if (!membroDoc.exists) return null;

    const token = membroDoc.data().fcmToken;
    if (!token) return null;

    const payload = {
      notification: {
        title: titulo,
        body: texto,
        icon: "brasao.png"
      }
    };

    return admin.messaging().sendToDevice(token, payload);
  });