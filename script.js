const btnClean = document.querySelector('.empty-cart');
const carrinho = document.querySelector('.cart__items');
const loadDiv = document.querySelector('.loading');
// const saidaLista = [];
// const idsCarrinho = [];
function createProductImageElement(imageSource) { // recebe endereço da imagem
  const img = document.createElement('img'); // cria tag img
  img.className = 'item__image';// insere a classe 'item_image' na tag img criada 
  img.src = imageSource; // insere a fonte da imagem para a tag img
  return img; // retorna a img
}

function createCustomElement(element, className, innerText) { // recebe o nome da tag qualquer, uma classe e um inertxt
  const e = document.createElement(element); // cria o elemento personalizado
  e.className = className; // add uma classe a essse elemento
  e.innerText = innerText; // add um innertxt a esse elemento
  return e; // retorna o elemento
}

const cartItemClickListener = (event) => event.target.remove();

function createCartItemElement({ id: sku, title: name, price: salePrice }) { // recebe três keys de um obj
  const li = document.createElement('li'); // cria um elemento li
  li.className = 'cart__item'; // add a classe 'cart_item' na li
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`; // add um innertxt ao li contendo os valores das keys passadas
  li.addEventListener('click', cartItemClickListener); // add um eventListener na li, que dispara afunção cartItemClickListner 
  return li; // retorna o li
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText; // retorna o innertxt de uma tag span que tenha a classe item_sku
}

// function getPriceFromProductItem(item) {
//   return item.querySelector('span.item__price').innerText; // retorna o innertxt de uma tag span que tenha a classe item_price
// }

function salvaNoLocalStorage() {
  saveCartItems(carrinho.innerHTML);
}

async function addProductToCart(event) {
  const idProduto = getSkuFromProductItem(event.path[1]);
  const objItem = await fetchItem(idProduto);
  carrinho.appendChild(createCartItemElement(objItem));
  salvaNoLocalStorage();
  pegaPreco();
}

function createProductItemElement({ id: sku, title: name, thumbnail: image, price }) { // recebe três keys de um obj
  const section = document.createElement('section'); // cria uma tag section
  section.className = 'item'; // add a section criada uma classe chamada 'item';
  // saidaLista.push({
  //   id: [sku],
  //   price: [price],
  // });
  // loadSpan.classList.add('loading');
  // loadSpan.innerText = 'Carregando...';
  section.appendChild(createCustomElement('span', 'item__sku', sku)); // apenda na section uma tag span com a classe 'item_sku' e o innertxt sendo o valor correspondente a key sku do obj passado;
  section.appendChild(createCustomElement('span', 'item__title', name)); // apenda na section uma tag span com a classe 'item_title', e o innertxt sendo o valor corresponde a chavve name do obj passado;
  // section.appendChild(createCustomElement('span', 'item_price', price));
  section.appendChild(createProductImageElement(image)); // apenda na section uma tag img
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'))
    .addEventListener('click', addProductToCart); // apenda na section um btn contendo a classe 'item_add, e o inner txt 'Adicionar ao carrinho!'
  return section; // retorna a section
}

async function addProducts(produto) {
  loadDiv.innerText = 'Carregando...';
  const { results } = await fetchProducts(produto);
  loadDiv.remove();
  const items = document.querySelector('.items');
  results.forEach((elemento) => {
    items.appendChild(createProductItemElement(elemento));
  });
}

function carregaCarrinho() {
  carrinho.innerHTML = JSON.parse(getSavedCartItems('cartItems'));
  carrinho.addEventListener('click', cartItemClickListener);
}

function limpaCarrinho() {
  carrinho.innerHTML = '';
  localStorage.clear();
}

btnClean.addEventListener('click', limpaCarrinho);

window.onload = () => {
  addProducts('computador');
  carregaCarrinho();

  // carrinho.childNodes.forEach((element, idx) => {
  //   idsCarrinho.push(carrinho.children[idx].innerText.slice(4, 18).trim());
  // });
 };