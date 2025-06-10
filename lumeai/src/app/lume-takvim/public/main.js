document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const modalDate = document.getElementById('modal-date');
  const reminderForm = document.getElementById('reminder-form');
  const reminderTitle = document.getElementById('reminder-title');
  const reminderDesc = document.getElementById('reminder-desc');
  const reminderList = document.getElementById('reminder-list');
  let currentDate = null;

  // Günlere tıklama
  document.querySelectorAll('.day').forEach(btn => {
    btn.addEventListener('click', function() {
      currentDate = this.getAttribute('data-date');
      modalDate.textContent = currentDate + ' için Notlar';
      reminderTitle.value = '';
      reminderDesc.value = '';
      loadReminders();
      modal.style.display = 'flex';
    });
  });

  // Modal kapatma
  closeModal.onclick = function() {
    modal.style.display = 'none';
  };
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // Hatırlatıcı ekleme
  reminderForm.onsubmit = function(e) {
    e.preventDefault();
    if (!currentDate) return;
    const title = reminderTitle.value.trim();
    const desc = reminderDesc.value.trim();
    if (!title) return;
    let reminders = JSON.parse(localStorage.getItem('reminders') || '{}');
    if (!reminders[currentDate]) reminders[currentDate] = [];
    reminders[currentDate].push({ title, desc });
    localStorage.setItem('reminders', JSON.stringify(reminders));
    reminderTitle.value = '';
    reminderDesc.value = '';
    loadReminders();
  };

  function loadReminders() {
    reminderList.innerHTML = '';
    if (!currentDate) return;
    let reminders = JSON.parse(localStorage.getItem('reminders') || '{}');
    const items = reminders[currentDate] || [];
    if (items.length === 0) {
      reminderList.textContent = 'Not yok.';
      return;
    }
    items.forEach(rem => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${rem.title}</strong><br><span>${rem.desc}</span>`;
      reminderList.appendChild(div);
    });
  }
}); 