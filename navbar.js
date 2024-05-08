// Function to toggle the visibility of pop-ups
function togglePopUp(popUpId, isOpen) {

  const popUp = document.querySelector(popUpId);
  const overlay = document.querySelector(".overlay");
  
  if (isOpen) {
      overlay.style.display = "block";
      setTimeout(() => {
          overlay.style.opacity = "1";
          popUp.classList.add("display-pop-up");
      }, 10);
  } else {
      popUp.classList.remove("display-pop-up");
      overlay.style.opacity = "0";
      setTimeout(() => {
          overlay.style.display = "none";
      }, 300);
  }
}

// Function to initialize and manage tabs in the settings pop-up
function initializeSettingsTabs() {
  const tabs = document.querySelectorAll(".settings-tab-button");
  const tabContents = document.querySelectorAll(".settings-tab-content");

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active"));
      tabContents.forEach(c => c.style.display = 'none');

      tab.classList.add("active");
      tabContents[index].style.display = 'block';
    });
  });

  // Default to the first tab on initial load
  if (tabs.length > 0) {
      tabs[0].click();
  }
}

// Event listeners for pop-ups
document.addEventListener("DOMContentLoaded", function () {
  let isEditingUsername = false;

  const buttons = {
    "profile-button": ".profile-pop-up",
    "about-button": ".about-pop-up",
    "settings-button": ".settings-pop-up"
  };

  // Initialize listeners for each button
  Object.keys(buttons).forEach(btnId => {
    const button = document.getElementById(btnId);
    const popUpId = buttons[btnId];

    button.addEventListener("click", () => togglePopUp(popUpId, true));
  });

  const closeButtons = document.querySelectorAll(".close-button");

  closeButtons.forEach(button => {
    button.addEventListener("click", function() {
      // Assuming the close function needs to close the parent pop-up of this button
      const popUp = button.closest('.settings-pop-up, .profile-pop-up, .about-pop-up');
      if (popUp) {
        togglePopUp(`#${popUp.id}`, false);
        // Case for profile pop-up for editing
        if (popUp.id === "profile-pop-up") {
          isEditingUsername = false; // Ensure to reset edit mode if closing via button
        }
      }
      exitEditMode();
    });
  });

  // Tab handling in Settings pop-up
  initializeSettingsTabs();

  // Overlay and Escape key listeners
  const overlay = document.querySelector(".overlay");
  overlay.addEventListener("click", function() {
    if (!isEditingUsername) { // Only close pop-ups if not editing username
      document.querySelectorAll('.display-pop-up').forEach(popUp => {
        togglePopUp(`#${popUp.id}`, false);
      });
    }
  });

  document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
      document.querySelectorAll('.display-pop-up').forEach(popUp => {
        togglePopUp(`#${popUp.id}`, false);
      });
      exitEditMode();
    }
  });

  const usernameContainer = document.querySelector('.username-container');
  const username = document.querySelector('.username');
  const editIcon = document.querySelector('.username-edit-icon');
  const editInput = document.querySelector('.username-edit');

  usernameContainer.addEventListener('click', function() {
    if (!isEditingUsername) {
      enterEditMode();
    }
  });

  editInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      username.textContent = editInput.value;
      exitEditMode();
    } else if (e.key === 'Escape') {
      exitEditMode();
    }
  });

  function enterEditMode() {
    editInput.style.display = 'block';
    username.style.display = 'none';
    editIcon.style.visibility = 'hidden';
    editInput.value = username.textContent;
    editInput.focus();
    isEditingUsername = true; // Set flag to true when entering edit mode
  }

  function exitEditMode() {
    editInput.style.display = 'none';
    username.style.display = 'block';
    editIcon.style.visibility = ''; // Clear inline style for visibility
    isEditingUsername = false;
  }
});