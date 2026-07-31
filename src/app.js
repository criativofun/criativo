const flow = document.querySelector('#creation-flow');
const steps = [...document.querySelectorAll('.flow-step')];
const progress = [...document.querySelectorAll('.progress span')];
let currentStep = 0;
let selectedTheme = '';

function showStep(index) {
  currentStep = index;
  steps.forEach((step, position) => step.classList.toggle('active', position === index));
  progress.forEach((item, position) => item.classList.toggle('done', position <= index));
  document.querySelector('.flow-panel').scrollTop = 0;
}

function openFlow() {
  flow.classList.add('open');
  flow.setAttribute('aria-hidden', 'false');
  document.body.classList.add('no-scroll');
  showStep(0);
}

function closeFlow() {
  flow.classList.remove('open');
  flow.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('no-scroll');
}

document.querySelectorAll('.js-start').forEach((button) => button.addEventListener('click', openFlow));
document.querySelector('.close-flow').addEventListener('click', closeFlow);
document.querySelector('.close-result').addEventListener('click', closeFlow);
flow.addEventListener('click', (event) => { if (event.target === flow) closeFlow(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeFlow(); });

document.querySelectorAll('.next-step').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.disabled) return;
    if (currentStep === 2) fillResult();
    showStep(Math.min(currentStep + 1, steps.length - 1));
  });
});
document.querySelectorAll('.back-step').forEach((button) => button.addEventListener('click', () => showStep(currentStep - 1)));

const input = document.querySelector('#drawing-input');
const preview = document.querySelector('#drawing-preview');
input.addEventListener('change', () => {
  const file = input.files[0];
  if (!file) return;
  preview.src = URL.createObjectURL(file);
  preview.style.display = 'block';
  input.closest('.dropzone').classList.add('has-image');
  steps[0].querySelector('.next-step').disabled = false;
});

document.querySelectorAll('.theme-grid button').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.theme-grid button').forEach((item) => item.classList.remove('selected'));
    button.classList.add('selected');
    selectedTheme = button.dataset.theme;
    steps[2].querySelector('.next-step').disabled = false;
  });
});

function fillResult() {
  const name = document.querySelector('#character-name').value.trim() || 'Seu personagem';
  const theme = selectedTheme || 'mundo mágico';
  document.querySelector('#result-name').textContent = name;
  document.querySelector('#cover-name').textContent = name;
  document.querySelector('#story-name').textContent = name;
  document.querySelector('#result-theme').textContent = theme.toLowerCase();
  document.querySelector('#story-theme').textContent = theme.toLowerCase();
}

document.querySelector('.restart-flow').addEventListener('click', () => {
  input.value = '';
  preview.removeAttribute('src');
  preview.style.display = 'none';
  document.querySelector('.dropzone').classList.remove('has-image');
  steps[0].querySelector('.next-step').disabled = true;
  document.querySelectorAll('.theme-grid button').forEach((item) => item.classList.remove('selected'));
  selectedTheme = '';
  showStep(0);
});

