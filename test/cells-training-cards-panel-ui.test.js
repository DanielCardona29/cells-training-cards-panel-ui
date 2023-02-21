/* eslint-disable import/no-extraneous-dependencies */
import { html, fixture, assert, fixtureCleanup } from '@open-wc/testing';
import '../cells-training-cards-panel-ui.js';

suite('CellsTrainingCardsPanelUi', () => {
  let el;

  teardown(() => fixtureCleanup());

  setup(async () => {
    el = await fixture(html`<cells-training-cards-panel-ui></cells-training-cards-panel-ui>`);
    await el.updateComplete;
  });

  test('instantiating the element with default properties works', () => {
    const element = el.shadowRoot.querySelector('p');
    assert.equal(element.innerText, 'Welcome to Cells');
  });

});
