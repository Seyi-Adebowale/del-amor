document.addEventListener("DOMContentLoaded", function () {
    var filterButtons = document.querySelectorAll(".filter-buttons .gallery-btn");
    var categorySelect = document.getElementById("category-select");
    var shuffleInstance = new Shuffle(document.querySelector(".gallery"), {
      itemSelector: ".gallery-item",
    });
  
    function filterItems(group) {
      shuffleInstance.filter(function (element) {
        var groups = element.getAttribute("data-groups");
        return groups.indexOf(group) !== -1;
      });
      updateActiveClass(group);
    }
  
    categorySelect.addEventListener("change", function (event) {
      var selectedValue = event.target.value;
      filterItems(selectedValue);
    });
  
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        var selectedGroup = this.getAttribute("data-group");
        filterItems(selectedGroup);
      });
    });
  
    // Apply default category on page load
    var defaultCategory = "Birthday";
    filterItems(defaultCategory);
  });
  
  window.addEventListener("DOMContentLoaded", function () {
    var images = document.querySelectorAll(".lazy-load-image");
  
    function setLazyLoading() {
      var windowWidth = window.innerWidth;
  
      images.forEach(function (image) {
        if (windowWidth <= 768) {
          image.setAttribute("loading", "lazy");
        } else {
          image.removeAttribute("loading");
        }
      });
    }
  
    // Call the function on page load and window resize
    setLazyLoading();
  
    window.addEventListener("resize", setLazyLoading);
  });
  