// função para extrair parâmetros da URL
function getURLParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    name: urlParams.get('name'),
    price: urlParams.get('price'),
    image: urlParams.get('image'),
    type: urlParams.get('type')
  };
}

// função para atualizar a página com os dados do presente
function updateGiftPage() {
  const giftData = getURLParams();
  
  // se não há dados do presente, não faz nada (página genérica)
  if (!giftData.name) return;
  
  // cria o card do presente selecionado
  const giftCard = document.createElement('div');
  giftCard.className = 'selected-gift-card';
  giftCard.innerHTML = `
    <div class="gift-info">
      <img src="${giftData.image}" alt="${giftData.name}" class="gift-image">
      <div class="gift-details">
        <h3>${giftData.name}</h3>
        <p class="gift-price">${giftData.price}</p>
        <span class="gift-type">${giftData.type === 'experiencia' ? 'Experiência' : 'Item'}</span>
      </div>
    </div>
  `;
  
  // insere o card antes do texto de agradecimento
  const container = document.querySelector('.gift-thankyou .container');
  const thankYouTitle = container.querySelector('h2');
  container.insertBefore(giftCard, thankYouTitle);
  
  // atualiza o título da página
  document.title = `${giftData.name} | Pablo & Aline`;
  
  // atualiza o texto de agradecimento
  thankYouTitle.textContent = `Obrigado por escolher: ${giftData.name}!`;
}

// executa quando a página carregar
document.addEventListener('DOMContentLoaded', updateGiftPage);
