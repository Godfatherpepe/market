/* eslint-disable ui-testing/no-disabled-tests */
/* eslint-disable prettier/prettier */

/// <reference types="Cypress" />

import PrivateKeyProvider from 'truffle-privatekey-provider'

const HDWalletProvider = require('@truffle/hdwallet-provider')
const Web3 = require('web3')
const bip39 = require('bip39')

describe('Publish', () => {
  beforeEach(() => {
    cy.on('window:before:load', (win) => {
      const provider = new HDWalletProvider({
        privateKeys: [
          '0xd631de5b7e9cf451135896c833187c8b4dc230bf47756a9a2ca4ffccc161175e'
        ],
        chainId: 4,
        providerOrUrl: 'http://127.0.0.1:8545'
      })

      win.ethereum = provider
      win.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', 'injected')
    })

    cy.visit('/publish')

    cy.get('main header p', { timeout: 60000 }).should(
      'contain',
      'Highlight the important features'
    )

    cy.contains('Connect Wallet').click()

    cy.get('#WEB3_CONNECT_MODAL_ID > div > div > div > div').first().click()
  })

  it('should publish a data set with all fields', () => {
    // Add title
    cy.get('#name').type('Ocean Market Integration Test')
    // Add description
    cy.get('#description').type('Ocean Market Integration Test')
    // Add url of file
    cy.get('#files').type('https://oceanprotocol.com/tech-whitepaper.pdf')
    cy.get('#files + button').click()
    // Add url of sample
    cy.get('#links').type('https://oceanprotocol.com/tech-whitepaper.pdf')
    cy.get('#links + button').click()
    // Access
    cy.get('#Download').check({ force: true })
    // Author
    cy.get('#author').type('Jelly McJellyfish')
    // Tags
    cy.get('#tags').type('fish, ocean, squid')
    // Terms
    cy.get('#i-agree-to-these-terms-and-conditions').click()

    // Start publish process
    cy.get('footer button').contains('Submit').should('not.be.disabled').click()

    // Wait for finish
    // cy.contains('Your asset is published!', {
    //   timeout: 12000
    // }).should('be.visible')

    // // Store DID for other tests to pick up
    // cy.get('a')
    //   .contains('See published asset')
    //   .invoke('attr', 'href')
    //   .then((href) => {
    //     cy.writeFile('cypress/fixtures/did.txt', href.replace('/asset/', ''))
    //   })
  })
})