document.addEventListener('DOMContentLoaded', function() {
    initFilters();
});
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
                this.classList.toggle('active-filter');
            });
        });
    }
}
