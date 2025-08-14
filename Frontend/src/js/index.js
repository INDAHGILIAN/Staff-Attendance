 document.addEventListener('DOMContentLoaded', function() {
      showSection('home-section');
      listDepartments();
    });

    function showSection(sectionId) {
      // Hide all content sections
      document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
      });
      
      // Show the requested section
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.display = 'block';
      }
      
      return false; // Prevent default link behavior
    }