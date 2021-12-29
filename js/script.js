/* Milestone 1
- Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e dall’interlocutore (bianco) assegnando due classi CSS diverse
- Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare nome e immagine di ogni contatto

Milestone 2
- Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i messaggi relativi al contatto attivo all’interno del pannello della conversazione
- Click sul contatto mostra la conversazione del contatto cliccato 

Milestone 3
- Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando “enter” il testo viene aggiunto al thread sopra, come messaggio verde
- Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo. 

Milestone 4
- Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)

Milestone 5
- Cancella messaggio: cliccando sul messaggio appare un menu a tendina che permette di cancellare il messaggio selezionato
- Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti */

const app = new Vue({
    el: '#app',
    data: {
        contacts: [
            {
              name: "Michele",
              avatar: "_1",
              visible: true,
              messages: [
                {
                  date: "10/01/2020 15:30:55",
                  text: "Hai portato a spasso il cane?",
                  status: "sent",
                  hover: false
                },
                {
                  date: "10/01/2020 15:50:00",
                  text: "Ricordati di dargli da mangiare",
                  status: "sent",
                  hover: false
                },
                {
                  date: "10/01/2020 16:15:22",
                  text: "Tutto fatto!",
                  status: "received",
                  hover: false
                },
              ],
            },
            {
              name: "Fabio",
              avatar: "_2",
              visible: true,
              messages: [
                {
                  date: "20/03/2020 16:30:00",
                  text: "Ciao come stai?",
                  status: "sent",
                  hover: false
                },
                {
                  date: "20/03/2020 16:30:55",
                  text: "Bene grazie! Stasera ci vediamo?",
                  status: "received",
                  hover: false
                },
                {
                  date: "20/03/2020 16:35:00",
                  text: "Mi piacerebbe ma devo andare a fare la spesa.",
                  status: "sent",
                  hover: false
                },
              ],
            },
          
            {
              name: "Samuele",
              avatar: "_3",
              visible: true,
              messages: [
                {
                  date: "28/03/2020 10:10:40",
                  text: "La Marianna va in campagna",
                  status: "received",
                  hover: false
                },
                {
                  date: "28/03/2020 10:20:10",
                  text: "Sicuro di non aver sbagliato chat?",
                  status: "sent",
                  hover: false
                },
                {
                  date: "28/03/2020 16:15:22",
                  text: "Ah scusa!",
                  status: "received",
                  hover: false
                },
              ],
            },
            {
              name: "Luisa",
              avatar: "_4",
              visible: true,
              messages: [
                {
                  date: "10/01/2020 15:30:55",
                  text: "Lo sai che ha aperto una nuova pizzeria?",
                  status: "sent",
                  hover: false
                },
                {
                  date: "10/01/2020 15:50:00",
                  text: "Si, ma preferirei andare al cinema",
                  status: "received",
                  hover: false
                },
              ],
            },
          ],
          counter: 0,
          note: '',
          name: '',
    },
    methods: {
      changeChat: function(index) {
            this.counter = index;
      },
      isActive: function(index) {
        if (this.counter == index) {
          return 'active';
        } else {
          return '';
        }
      },
      lastMessageDate: function(index, typeofmessage) {
        if (this.contacts[index].messages.length > 0) {
          const array = this.contacts[index].messages;
          const arrayLength = array.length - 1;
          if (typeofmessage == 'text') {
              const lastText = array[arrayLength].text;
              return lastText;
          } else if (typeofmessage == 'date') {
            const lastDate = array[arrayLength].date;
            return lastDate;
          }
        } else {
          return '';
        }
      },
      firstLetterUpper: function(word) {
        let string = word;
        let stringTwo = string.charAt(0).toUpperCase() + string.slice(1);
        return stringTwo;
    },
      newMessage: function(index) {
          const array = this.contacts[index].messages;
          // DATA TEMPO REALE 
          dayjs.extend(window.dayjs_plugin_customParseFormat)
          let date = dayjs().format("DD/MM/YYYY HH:mm:ss");

          if (this.note.trim() != '') {
            this.message = {
              date: date,
              text: this.firstLetterUpper(this.note.trim()),
              status: 'sent' 
            };
            array.push(this.message);
            this.note = '';
            if (this.message != []) {
              const botMessage = (setTimeout(() => {
                this.message = {
                  date: date,
                  text: 'Ok',
                  status: 'received'
                }
                array.push(this.message);
              }, 1000))
            }
          }
      },
      showContact: function(contact) {
        if (this.name == '') {
            return contact.visible = true;
        } else {
          return (contact.name.toLowerCase().includes(this.name.toLowerCase()));
        }
    },
    deleteMessage: function (index) {
      this.contacts[this.counter].messages.splice(index, 1);
      },
      showBox: function(index) {
        if (this.hover == false) {
          this.hover = true;
          this.contacts[index].messages[index] = this.hover;
        }
      }
    }
  });