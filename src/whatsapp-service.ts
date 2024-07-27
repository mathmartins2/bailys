import { Injectable, OnModuleInit } from '@nestjs/common';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  makeInMemoryStore,
} from '@whiskeysockets/baileys';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private client: any;

  async onModuleInit() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    const store = makeInMemoryStore({});
    store.readFromFile('baileys_store.json');
    setInterval(() => {
      store.writeToFile('baileys_store.json');
    }, 10_000);

    this.client = makeWASocket({
      auth: state,
      printQRInTerminal: true,
      // logger: P({ level: 'silent' }),
    });

    this.client.ev.on('creds.update', saveCreds);
    this.client.ev.on('connection.update', (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === 'close') {
        const shouldReconnect =
          lastDisconnect?.error?.output?.statusCode !==
          DisconnectReason.loggedOut;
        console.log(
          'connection closed due to ',
          lastDisconnect?.error,
          ', reconnecting ',
          shouldReconnect,
        );
        if (shouldReconnect) {
          this.onModuleInit();
        }
      } else if (connection === 'open') {
        console.log('opened connection');
      }
    });
  }

  async sendMessage(to: string, message: string) {
    await this.client.sendMessage(to, { text: message });
  }
}
