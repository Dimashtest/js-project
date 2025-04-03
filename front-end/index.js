// Блок с городами
document.addEventListener("DOMContentLoaded", function () {
    const cities = [
        "Ялта", "Гурфуз", "Гаспра", "Массандра", "Никита", 
        "Ливадия", "Виноградное"
    ];

    const input = document.getElementById("cityInput");
    const dropdown = document.getElementById("cityDropdown");

    input.addEventListener("input", function () {
        const query = input.value.toLowerCase();
        dropdown.innerHTML = "";

        if (query.length === 0) {
            dropdown.classList.add("hidden");
            return;
        }

        const filteredCities = cities.filter(city => city.toLowerCase().includes(query));

        if (filteredCities.length === 0) {
            dropdown.classList.add("hidden");
            return;
        }

        dropdown.classList.remove("hidden");

        filteredCities.forEach(city => {
            const option = document.createElement("div");
            option.textContent = city;
            option.classList.add(
                "p-2", "cursor-pointer", "hover:bg-blue-100", "hover:text-blue-600",
                "transition", "duration-200", "rounded"
            );

            option.addEventListener("click", function () {
                input.value = city;
                dropdown.classList.add("hidden");
            });

            dropdown.appendChild(option);
        });
    });

    document.addEventListener("click", function (event) {
        if (!input.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
        }
    });
});
// Блок с датами
document.addEventListener("DOMContentLoaded", function () {
    const checkInInput = document.getElementById("check-in");
    const checkOutInput = document.getElementById("check-out");

    let formatDate = (date) => date.toISOString().split("T")[0];

    let today = new Date();
    let maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);

    checkInInput.setAttribute("min", formatDate(today));
    checkInInput.setAttribute("max", formatDate(maxDate));

    checkInInput.addEventListener("change", function () {
        let selectedDate = new Date(this.value);
        let maxCheckOut = new Date(selectedDate);
        maxCheckOut.setDate(selectedDate.getDate() + 7);

        checkOutInput.setAttribute("min", formatDate(selectedDate));
        checkOutInput.setAttribute("max", formatDate(maxCheckOut));

        checkOutInput.value = formatDate(maxCheckOut);
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".category-btn");
    const cityList = document.getElementById("cityList");

    //Города по категориям  
    const citiesByCategory = {
        hotels: ["Ялта", "Гурфуз", "Гаспра", "Массандра"],
        apartments: ["Массандра", "Никита", "Ливадия"],
        houses: ["Виноградное", "Ялта", "Ливадия"],
        guesthouses: ["Гаспра", "Никита"],
        private: ["Гурфуз", "Виноградное"]
    };

    //обновления списка городов
    function updateCityList(type) {
        cityList.innerHTML = "";// Очищаем текущий список 
        if (citiesByCategory[type]) {
            let ul = document.createElement("ul");// Создаём список
            ul.className = "flex flex-col gap-5";
            citiesByCategory[type].forEach((city, index) => {
                let li = document.createElement("li");
                li.className = "flex gap-6";
                li.innerHTML = `<span class="text-gray-500">0${index + 1}</span> ${city}`;
                ul.appendChild(li);
            });
            cityList.appendChild(ul);
        }
    }
    // Функция обновления цветов кнопок 
    function updateButtonColors(selectedButton) {
        buttons.forEach(button => {
            if (button === selectedButton) { // Если кнопка активная 
                button.classList.remove("bg-gray-300", "text-black");
                button.classList.add("bg-blue-500", "text-white");
            } else { // Для остальных кнопок 
                button.classList.remove("bg-blue-500", "text-white");
                button.classList.add("bg-gray-300", "text-black");
            }
        });
    }
    // Назначаем обработчики нажатия на кнопки  
    buttons.forEach(button => {
        button.addEventListener("click", function () {
            updateButtonColors(this); // Обновляем цвет кнопок 
            updateCityList(this.dataset.type); // Обновляем список городов  
        });
    });

    updateCityList("hotels");
});
// блок seacrhForm
document.getElementById('toggleSearch').addEventListener('click', function() {
    const infoBlock = document.getElementById('infoBlock');
    infoBlock.classList.toggle('translate-y-0');
    infoBlock.classList.toggle('opacity-0'); 
    infoBlock.classList.toggle('opacity-100');

    arrowIcon.classList.toggle('rotate-180');
});

// блок sityBlock
const toggleButton = document.getElementById('toggleSearch');
const sityBlock = document.getElementById('sityBlockInner');
const arrowIcon = document.getElementById('arrowIcon');

toggleButton.addEventListener('click', () => {
    // плавный отступ
    sityBlock.classList.toggle('mt-[75px]');
    sityBlock.classList.toggle('mt-[500px]');

    // Поворот стрелки на 180
    arrowIcon.classList.toggle('fa-arrow-down');
    arrowIcon.classList.toggle('fa-arrow-up');
    arrowIcon.classList.toggle('rotate-180');
});



