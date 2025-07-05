// coleta elementos
const priceFilter = document.getElementById('filter-price');
const typeFilter  = document.getElementById('filter-type');
const sortOrder   = document.getElementById('sort-order');
const container   = document.getElementById('gifts-container');

// converte NodeList em array
const cards = Array.from(container.querySelectorAll('.gift-card'));

// função de render (só mostra as cards aprovadas)
function render(filtered) {
  container.innerHTML = '';
  filtered.forEach(card => container.appendChild(card));
  // readiciona os listeners após re-render
  addGiftListeners();
}

// aplica filtros e ordenação
function applyFilters() {
  let result = cards.slice();

  // filtro preço
  const [min, max] = priceFilter.value === 'all'
    ? [0, Infinity]
    : priceFilter.value.split('-').map(Number);
  result = result.filter(card => {
    const p = parseFloat(card.dataset.price);
    return p >= min && p <= max;
  });

  // filtro tipo
  if (typeFilter.value !== 'all') {
    result = result.filter(card => card.dataset.type === typeFilter.value);
  }

  // ordenação
  switch(sortOrder.value) {
    case 'price-asc':
      result.sort((a,b) => a.dataset.price - b.dataset.price);
      break;
    case 'price-desc':
      result.sort((a,b) => b.dataset.price - a.dataset.price);
      break;
    case 'name-asc':
      result.sort((a,b) => a.querySelector('h3').textContent
        .localeCompare(b.querySelector('h3').textContent));
      break;
    case 'name-desc':
      result.sort((a,b) => b.querySelector('h3').textContent
        .localeCompare(a.querySelector('h3').textContent));
      break;
    // 'default' -> nenhuma mudança
  }

  render(result);
}

// função para capturar dados do presente e navegar
function handleGiftSelection(event) {
  event.preventDefault();
  
  const card = event.target.closest('.gift-card');
  const imgElement = card.querySelector('img');
  const giftData = {
    name: card.querySelector('h3').textContent,
    price: card.querySelector('.gift-price').textContent,
    image: imgElement.getAttribute('src'), // usa getAttribute para pegar o caminho relativo
    type: card.dataset.type
  };
  
  // converte para URL parameters
  const params = new URLSearchParams({
    name: giftData.name,
    price: giftData.price,
    image: giftData.image,
    type: giftData.type
  });
  
  // navega para presente.html com os parâmetros
  window.location.href = `presente.html?${params.toString()}`;
}

// adiciona listeners para todos os botões "Presentear"
function addGiftListeners() {
  const giftButtons = container.querySelectorAll('.btn-gift');
  giftButtons.forEach(button => {
    button.addEventListener('click', handleGiftSelection);
  });
}

// listeners
priceFilter.addEventListener('change', applyFilters);
typeFilter.addEventListener('change', applyFilters);
sortOrder.addEventListener('change', applyFilters);

// render inicial
render(cards);
addGiftListeners();
