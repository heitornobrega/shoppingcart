const saveCartItems = (argumento) => {
  localStorage.setItem('cartItems', argumento);
};
saveCartItems('<ol><li>Item</li></ol>');
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
