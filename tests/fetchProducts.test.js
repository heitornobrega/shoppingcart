require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Verifica se fetchProducts é uma função', () => {
    expect(typeof fetchProducts).toBe('function');
  })
  // fail('Teste vazio');
});
