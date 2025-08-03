const tg = window.Telegram.WebApp;
tg.expand();

const user = tg.initDataUnsafe?.user || null;
if (!user) {
  alert('Ошибка: не удалось получить данные пользователя Telegram.');
  throw new Error('Telegram user data not found');
}

document.getElementById('profile-name').textContent = user.first_name || 'Без имени';
document.getElementById('profile-uid').textContent = user.id || 'неизвестен';

async function loadCases() {
  const res = await fetch('http://localhost:3000/api/cases');
  const cases = await res.json();

  const starContainer = document.getElementById('cases-star-list');
  const tonContainer = document.getElementById('cases-ton-list');

  starContainer.innerHTML = '';
  tonContainer.innerHTML = '';

  cases.forEach(c => {
    const card = document.createElement('div');
    card.className = 'bg-gray-800 p-3 rounded-xl';

    const img = document.createElement('img');
    img.className = 'mx-auto mb-2 h-16 w-16 object-cover';

    if (c.priceStars && c.priceStars > 0 && (!c.priceTON || c.priceTON === 0)) {
      img.src = './frontend/images/case-star1.png';
    } else {
      img.src = './frontend/images/case-ton1.png';
    }

    card.appendChild(img);

    const title = document.createElement('h3');
    title.textContent = c.name;
    card.appendChild(title);

    const btn = document.createElement('button');
    btn.className = 'mt-2 bg-teal-500 px-3 py-1 rounded-md text-xs';
    btn.textContent = 'Открыть';

    btn.addEventListener('click', async () => {
      btn.disabled = true;
      btn.textContent = 'Открываем...';

      try {
        const resp = await fetch('http://localhost:3000/api/open-case', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, caseType: c.id })
        });
        const data = await resp.json();

        alert(`Поздравляем! Вы получили: ${data.prize.name} (${data.prize.type})`);
      } catch (e) {
        alert('Ошибка при открытии кейса');
        console.error(e);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Открыть';
      }
    });

    card.appendChild(btn);

    if (c.priceStars && c.priceStars > 0 && (!c.priceTON || c.priceTON === 0)) {
      starContainer.appendChild(card);
    } else {
      tonContainer.appendChild(card);
    }
  });
}

loadCases();
