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

// sw.js

self.addEventListener('push', function(event) {
    // Caso use push simulado ou mensagens via canal
});

// Ouve mensagens enviadas pelo app principal para disparar a notificação
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'MOSTRAR_AVISO') {
        const { titulo, texto } = event.data;
        
        const options = {
            body: texto,
            icon: '/brasao.png',
            badge: '/brasao.png'
        };

        event.waitUntil(
            self.registration.showNotification(`⚠️ ${titulo}`, options)
        );
    }
});

// Ao clicar na notificação, abre ou foca no app
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let i = 0; i < windowClients.length; i++) {
                let client = windowClients[i];
                if (client.url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});