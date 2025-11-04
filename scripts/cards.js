
(function () {
  const containers = document.querySelectorAll('[data-selectable="cards"]');
  if (!containers.length) return;

  containers.forEach((box) => {
    const single = (box.dataset.selection || 'multiple') === 'single';
    box.setAttribute('role', 'listbox');
    box.setAttribute('aria-multiselectable', String(!single));

    const cards = box.querySelectorAll('.card');

    const setSelected = (card, on) => {
      card.classList.toggle('card--selected', on);
      card.setAttribute('aria-selected', on ? 'true' : 'false');
    };

    const clearAll = () => cards.forEach((c) => setSelected(c, false));

    const fireChange = () => {
      const selectedIndices = [];
      const selectedCards = [];
      cards.forEach((c, i) => {
        if (c.getAttribute('aria-selected') === 'true') {
          selectedIndices.push(i);
          selectedCards.push(c);
        }
      });
      box.dispatchEvent(new CustomEvent('cards:change', {
        detail: { selectedIndices, selectedCards },
        bubbles: true
      }));
    };

    cards.forEach((card) => {
      card.setAttribute('role', 'option');
      if (!card.hasAttribute('tabindex')) card.tabIndex = 0;

      const initiallySelected = card.classList.contains('card--selected');
      card.setAttribute('aria-selected', initiallySelected ? 'true' : 'false');

      const toggle = () => {
        if (single) {
          clearAll();
          setSelected(card, true);
        } else {
          const now = card.getAttribute('aria-selected') === 'true';
          setSelected(card, !now);
        }
        fireChange();
      };

      card.addEventListener('click', (e) => {
        if (e.target.closest('a, button, input, select, textarea')) return;
        toggle();
      });

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  });
})();