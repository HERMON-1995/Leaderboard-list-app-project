const form = document.querySelector('.form-cont');
const refreshBtn = document.getElementById('refresh-btn');
const table = document.getElementById('table');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/wtbEtE3phOOhgB0cemjd/scores/';

const getScores = async () => {
  const response = await fetch(`${url}`);
  const data = await response.json();
  return data;
};

const refresh = () => {
  table.innerHTML = '';
  const gamers = [];
  getScores().then((entry) => {
    Object.entries(entry.result).forEach(([, value]) => {
      gamers.push(JSON.stringify(value));
      const listItems = document.createElement('tr');
      listItems.className = 'listItems';
      listItems.innerHTML = `
                    <td><div class="user-value">${value.user}</div></td>
                    <td><div class="score-value">${value.score}</div></td>
           `;
      table.appendChild(listItems);
    });
  });
};

const add = async (newScore) => {
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  refresh();
  return data;
};

const create = () => {
  const newScore = {
    user: document.getElementById('name').value,
    score: document.getElementById('score').value,
  };
  document.getElementById('name').value = '';
  document.getElementById('score').value = '';
  add(newScore);
};

refresh();

refreshBtn.addEventListener('click', () => {
  refresh();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  create();
});
