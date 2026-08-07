self.addEventListener('push', function(event) {
    let dados = {};
    if (event.data) {
        dados = event.data.json();
    }

    const titulo = dados.title || 'LAPE - Portal do Ligante';
    const opcoes = {
        body: dados.body || 'Você possui uma nova atualização.',
        icon: 'brasao.png',
        badge: 'brasao.png'
    };

    event.waitUntil(
        self.registration.showNotification(titulo, opcoes)
    );
});

self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('index.html')
    );
});