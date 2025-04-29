// Optional JavaScript for click-based dropdowns (good for mobile)
document.querySelectorAll('.dropdown > a').forEach((dropdownToggle) => {
    dropdownToggle.addEventListener('click', (e) => {
      e.preventDefault();
      const dropdown = dropdownToggle.nextElementSibling;
      document.querySelectorAll('.dropdown-content').forEach(d => {
        if (d !== dropdown) d.style.display = 'none';
      });
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
  });
  