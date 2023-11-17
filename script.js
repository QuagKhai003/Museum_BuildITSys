function toggleCheckboxes(mainCategory) {
    var subCategory = mainCategory.querySelector('.subcategory');
    var checkboxes = subCategory.querySelectorAll('input[type="checkbox"][name="sub-category"]');
    var mainCheckbox = mainCategory.querySelector('input[type="checkbox"][name="main-category"]');

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', function () {
            
        });
    });

    mainCheckbox.addEventListener('change', function () {
        checkboxes.forEach(function (checkbox) {
            checkbox.checked = mainCheckbox.checked;
        });
    });

    function updateMainCheckboxState() {
        var allChecked = Array.from(checkboxes).every(function(checkbox) {
            return checkbox.checked;
        });
        mainCheckbox.checked = allChecked;
    }


    mainCategory.addEventListener('click', function (event) {
        if (event.target.type === 'checkbox' && event.target.name === 'main-category') {
            mainCheckbox.checked = !mainCheckbox.checked;
            checkboxes.forEach(function (checkbox) {
                checkbox.checked = mainCheckbox.checked;
            });
        }
    });
    updateMainCheckboxState();
}

