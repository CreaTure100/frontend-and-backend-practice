// Поведение формы контактов (отдельный файл)
(function () {
  const contactModal = document.getElementById('contactModal');
  const feedbackForm = document.getElementById('feedbackForm');

  if (!contactModal || !feedbackForm) return;

  function submitForm() {
    if (!feedbackForm.checkValidity()) {
      feedbackForm.reportValidity();
      return;
    }

    const formData = new FormData(feedbackForm);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      email: formData.get('email'),
      category: formData.get('category'),
      message: formData.get('message'),
    };

    console.log('Данные формы:', data);
    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
    contactModal.close();
    feedbackForm.reset();
  }

  contactModal.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      contactModal.close();
    }
  });

  feedbackForm.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && event.target.tagName.toLowerCase() !== 'textarea') {
      event.preventDefault();
    }
  });

  // Кнопки действий в диалоге
  contactModal.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    if (btn.dataset.action === 'close') contactModal.close();
    if (btn.dataset.action === 'submit') submitForm();
  });
})();