// scripts.js

// 1. Contagem regressiva
(function(){
  const target = new Date('2025-08-30T19:00:00');
  const daysEl    = document.getElementById('days');
  const hoursEl   = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown(){
    const now  = new Date();
    const diff = target - now;
    if (diff <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return clearInterval(interval);
    }
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    daysEl.textContent    = String(d).padStart(2, '0');
    hoursEl.textContent   = String(h).padStart(2, '0');
    minutesEl.textContent = String(m).padStart(2, '0');
    secondsEl.textContent = String(s).padStart(2, '0');
  }

  const interval = setInterval(updateCountdown, 1000);
  updateCountdown();
})();

// 3. Enviar RSVP para o seu WhatsApp
(function(){
  const form     = document.getElementById('rsvp-form');
  // Substitua pelo seu número completo em formato internacional, ex: "5511999998888"
  const myNumber = '5585999201199';
  form.addEventListener('submit', function(e){
    e.preventDefault();

    // Coleta campos
    const nome    = form.nome.value.trim();
    const email   = form.email.value.trim();
    const whatsapp= form.whatsapp.value.trim();
    const adultos = form.adultos.value;
    const acompanhante = form.acompanhante.value.trim();
    const criancas= form.criancas.value;
    const obs     = form.observacoes.value.trim();

    // Monta texto
    const mensagem = 
      `*Confirmação de Presença*%0A` +
      `Nome: ${nome}%0A` +
      `E-mail: ${email}%0A` +
      `WhatsApp: ${whatsapp}%0A` +
      `Adultos: ${adultos}%0A` +
      `Acompanhante: ${acompanhante}%0A` +
      `Crianças: ${criancas}%0A` +
      `Observações: ${obs}`;

    // Abre WhatsApp Web/App
    const url = `https://api.whatsapp.com/send?phone=${myNumber}&text=${mensagem}`;
    window.open(url, '_blank');
  });
})();

// 2. Carrossel horizontal + botão “Ver Mais”
(function(){
  const carousel = document.querySelector('.carousel');
  const btnMore  = document.getElementById('btn-more');
  if (!carousel || !btnMore) return;

  btnMore.addEventListener('click', () => {
    carousel.scrollBy({
      left: carousel.offsetWidth,
      behavior: 'smooth'
    });
  });
})();

// 4. Funcionalidade para presentes na index.html
(function(){
  // função para capturar dados do presente e navegar
  function handleGiftSelection(event) {
    event.preventDefault();
    
    const carouselItem = event.target.closest('.carousel-item');
    const giftData = {
      name: carouselItem.querySelector('h4').textContent,
      price: carouselItem.querySelector('p').textContent,
      image: carouselItem.querySelector('img').getAttribute('src'),
      type: carouselItem.getAttribute('data-type') || 'experiencia'
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

  // adiciona listeners para todos os botões "Presentear" na index
  const giftButtons = document.querySelectorAll('.carousel-item .btn-gift');
  giftButtons.forEach(button => {
    button.addEventListener('click', handleGiftSelection);
  });
})();
