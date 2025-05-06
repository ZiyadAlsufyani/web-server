document.addEventListener('DOMContentLoaded', () => {
  // DOM elements
  const counterDisplay = document.getElementById('counter');
  const incrementBtn = document.getElementById('increment');
  const decrementBtn = document.getElementById('decrement');
  const resetBtn = document.getElementById('reset');
  
  // Initial counter value
  let count = 0;
  
  // Update the display
  const updateDisplay = () => {
    counterDisplay.textContent = count;
    
    // Add animation class
    counterDisplay.classList.add('pulse');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      counterDisplay.classList.remove('pulse');
    }, 300);
  };
  
  // Event handlers
  incrementBtn.addEventListener('click', () => {
    count++;
    updateDisplay();
  });
  
  decrementBtn.addEventListener('click', () => {
    count--;
    updateDisplay();
  });
  
  resetBtn.addEventListener('click', () => {
    count = 0;
    updateDisplay();
  });
  
  // Add hover effect to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.backgroundColor = 'var(--primary-50)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.backgroundColor = 'var(--neutral-50)';
    });
  });
});