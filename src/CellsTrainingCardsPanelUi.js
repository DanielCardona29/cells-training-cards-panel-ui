import { LitElement, html, } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './CellsTrainingCardsPanelUi-styles.js';


import '@bbva-web-components/bbva-list-card/bbva-list-card';


export class CellsTrainingCardsPanelUi extends LitElement {
  static get is() {
    return 'cells-training-cards-panel-ui';
  }

  // Declare properties
  static get properties() {
    return {
      cardsList: { type: Array, },
      currenciesBalanceAvalible: {
        type: String,
        attribute: 'currencies-balances-avalible'
      },

      currenciesBalancePedding: {
        type: String,
        attribute: 'currencies-balances-pedding'
      },

      isLoading: { type: Boolean }
    };
  }

  // Initialize properties
  constructor() {
    super();
    this.cardsList = [];
    this.currenciesBalanceAvalible = 'Saldo disponible';
    this.currenciesBalancePedding = 'Saldo Pendiente';
    this.isLoading = true;
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('cells-training-cards-panel-ui-shared-styles')
    ];
  }


  loadingMap() {
    const elements = [];
    for (let i = 0; i < 3; i++) {
      elements.push(html`<bbva-list-card loading></bbva-list-card>`)
    }
    return elements
  }


  cardListMap() {
    const data = this.cardsList;

    const imagesList = [{ id: 'VISA', link: '/images/visa.png' }]

    return data.map((card) => {
      const formatter = new Intl.NumberFormat(window.IntlMsg.lang, {
        style: 'currency',
        currency: card.currentBalance.currency,
        minimumFractionDigits: 2
      })

      let status = '';
      let name = '';
      switch (card.status) {
        case 'BLOCKED':
          status = 'blocked';
          name = 'bloqueada'
          break;

        case 'INOPERATIVE':
          status = 'off'
          name = 'inoperativa'
          break;

        case 'OPERATIVE':
          status = 'success'
          name = 'operativa'
          break;

        case 'CANCELED':
          status = 'off'
          name = 'cancelada'
          break;

        case 'PENDING_EMBOSSING':
          status = 'off'
          name = 'grabado'
          break;

        case 'PENDING_DELIVERY':
          status = 'off'
          name = 'en envio'
          break;

        case 'PRE_ACTIVATED':
          status = 'off'
          name = 'por activar'
          break;

        case 'PENDING_CANCELLATION':
          status = 'off'
          name = 'Cancelacion pendiente'
          break;

        default:
          status = 'off'
          name = 'Indefinido'
          break;
      }


      return html`
        <bbva-list-card class="card" variant="card" show-card id=${card.cardId} card-status=${status !=="success" ? status : ''
          } card-title=${card.name} num-product=${card.cardNumber} amount=${card.padingBalance.amount}
          currency-code=${card.padingBalance.currency} content-text=${this.currenciesBalancePedding}
          credit-balance=${formatter.format(card.currentBalance.amount)} secondary-currency-code=${card.currentBalance.currency}
          content-text-extra=${this.currenciesBalanceAvalible} card-image=${imagesList.find(item=> item.id === card.brand).link}
          badge-text=${name}
          badge-type=${status}
          @click=${this.cardClick}
        
          >
        </bbva-list-card>
        `
    });
  }


  cardClick(event) {

    const { target: { id } } = event;

    this.dispatchEvent(new CustomEvent('card-click', { detail: id, bubbles: true }));

  }


  // Define a template
  render() {
    return html`
              <div>
                ${this.isLoading ? this.loadingMap() : this.cardListMap()}
              </div>
    `;
  }
}
