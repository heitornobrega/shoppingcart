const getSavedCartItems = (chave) => {
  return localStorage.getItem(chave);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
