document.addEventListener('DOMContentLoaded', async () => {
    let allProperties = [];
    let filteredProperties = [];
    let currentPage = 1;
    const itemsPerPage = 8;
    const maxPrice = 10000;
    let sortOrder = "random"; // Начальный порядок сортировки

    const defaultImages = [
        "./img/property1.svg",
        "./img/property2.svg",
        "./img/property3.svg",
        "./img/property4.svg",
        "./img/property5.jpg",
        "./img/property6.jpg",
        "./img/property7.jpg",
        "./img/property8.jpg",
        "./img/property9.jpg",
        "./img/property10.jpg",
        "./img/property11.jpg",
        "./img/property12.jpg",
        "./img/property13.jpg",
        "./img/property14.jpg",
        "./img/property15.jpg",
    ];

    // ✅ Функция загрузки данных
    async function fetchData() {
        const url = 'http://localhost:4000/api/properties/';

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();

            if (Array.isArray(data)) {
                allProperties = shuffleArray(data);
                filteredProperties = [...allProperties];

                renderProperties();
                renderPagination();
            }
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    // Перемешивание (рандомный порядок)
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Рендер карточек
    function renderProperties() {
        const container = document.getElementById("property-list");
        container.innerHTML = "";

        const startIndex = (currentPage - 1) * itemsPerPage;
        const selectedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

        selectedProperties.forEach((property) => {
            const imageSrc = property.imageUrl || defaultImages[Math.floor(Math.random() * defaultImages.length)];

            container.innerHTML += `
            <div class="flex bg-white rounded-lg shadow-lg gap-6">
                <img src="${imageSrc}" alt="Фото жилья" class="w-48 h-48 object-cover">
                <div class="flex flex-col justify-between p-7 w-[350px]">
                    <h3 class="text-lg font-semibold">${property.name}</h3>
                    <p class="text-gray-500">До моря ${property.DistanceToTheSea?.distance}</p>
                    <p class="text-gray-600">${property.Location?.city || 'Город неизвестен'}, ${property.Location?.street || 'Улица неизвестна'}</p>
                    <p class="text-blue-500 text-sm mt-2">
                        ${property.area || '—'} м² | ${property.beds || '—'} комнат | ${property.NumberOfRoom?.numberofsplitedbeds || '—'} раздельных кроватей | ${property.NumberOfRoom?.numberofbeds || '—'} кроватей
                    </p>
                </div>
                <div class="flex flex-col items-center justify-center p-5">
                    <p class="text-gray-800 font-bold text-3xl">${property.Price?.price || '—'} ₽</p>
                    <p class="text-gray-500">Сутки</p>
                    <button class="border-2 border-blue-500 text-blue-500 px-4 py-2 mt-3 rounded w-36">
                        <a href="./rentinfo.html?id=${property.id}">Смотреть</a>
                    </button>
                </div>
            </div>
            `;
        });
    }

    // Рендер пагинации
    function renderPagination() {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);

        for (let i = 1; i <= totalPages; i++) {
            const pageElement = document.createElement("p");
            pageElement.textContent = i;
            pageElement.classList.add("text-gray-500", "cursor-pointer");

            if (i === currentPage) {
                pageElement.classList.add("text-blue-500", "underline");
            }

            pageElement.addEventListener("click", () => {
                currentPage = i;
                renderProperties();
                renderPagination();
            });

            paginationContainer.appendChild(pageElement);
        }
    }

    // Обновление стрелки сортировки
    function updateSortArrow() {
        const arrow = document.getElementById("sort-arrow");
        if (sortOrder === "asc") {
            arrow.textContent = "↑"; // По возрастанию
        } else if (sortOrder === "desc") {
            arrow.textContent = "↓"; // По убыванию
        } else {
            arrow.textContent = "↻"; // Рандом
        }
    }

    // Функция сортировки
    function toggleSort() {
        if (sortOrder === "random") {
            sortOrder = "asc";
            filteredProperties.sort((a, b) => a.Price?.price - b.Price?.price);
        } else if (sortOrder === "asc") {
            sortOrder = "desc";
            filteredProperties.sort((a, b) => b.Price?.price - a.Price?.price);
        } else {
            sortOrder = "random";
            filteredProperties = shuffleArray(filteredProperties);
        }

        updateSortArrow();
        renderProperties();
        renderPagination();
    }

    // Обновление цены в ползунке
    document.getElementById('price').addEventListener('input', function () {
        const priceValue = this.value;
        document.getElementById('price-range-text').textContent = `От 0 до ${priceValue} ₽`;
    });

    // Обработчик фильтрации
    document.getElementById('apply-filters').addEventListener('click', function () {
        const selectedPrice = document.getElementById('price').value;

        // Фильтруем по цене
        filteredProperties = allProperties.filter(property => property.Price?.price <= selectedPrice);

        // Фильтруем по чекбоксам (типы жилья)
        const hotelsChecked = document.getElementById('hotel-checkbox').checked;
        const apartmentsChecked = document.getElementById('apartment-checkbox').checked;
        const housesChecked = document.getElementById('house-checkbox').checked;
        const guestHousesChecked = document.getElementById('guest-house-checkbox').checked;
        const privateSectorChecked = document.getElementById('private-sector-checkbox').checked;

        if (hotelsChecked || apartmentsChecked || housesChecked || guestHousesChecked || privateSectorChecked) {
            filteredProperties = filteredProperties.filter(property =>
                (hotelsChecked && property.type === 'hotel') ||
                (apartmentsChecked && property.type === 'apartment') ||
                (housesChecked && property.type === 'house') ||
                (guestHousesChecked && property.type === 'guest_houses') ||
                (privateSectorChecked && property.type === 'private_sector')
            );
        }

        // Фильтруем по количеству двухспальных кроватей
        const selectedDoubleBeds = document.getElementById('double-beds').value;
        if (selectedDoubleBeds) {
            filteredProperties = filteredProperties.filter(property =>
                property.NumberOfRoom?.numberofbeds == selectedDoubleBeds
            );
        }

        // Фильтруем по количеству раздельных кроватей
        const selectedSplitBeds = document.getElementById('split-beds').value;
        if (selectedSplitBeds) {
            filteredProperties = filteredProperties.filter(property =>
                property.NumberOfRoom?.numberofsplitedbeds == selectedSplitBeds
            );
        }

        const selectedDistanceToTheSea = document.getElementById('distance-to-sea').value;

        // Функция для получения правильного значения из строки
        function getDistanceRange(distanceStr) {
            const ranges = {
                "До 100 м": "1",
                "100–300 м": "2",
                "300–500 м": "3",
                "500–700 м": "4",
                "700 м – 1 км": "5",
                "1–2 км": "6",
            };
            return ranges[distanceStr] || ""; // Если значения нет, возвращаем пустую строку
        }

        // Применяем фильтрацию по расстоянию до моря
        if (selectedDistanceToTheSea) {
            filteredProperties = filteredProperties.filter(property => {
                const propertyDistance = property.DistanceToTheSea?.distance;
                const mappedDistance = getDistanceRange(propertyDistance);
                return mappedDistance == selectedDistanceToTheSea;
            });
        }

        // Применяем текущую сортировку 
        if (sortOrder === "asc") {
            filteredProperties.sort((a, b) => a.Price?.price - b.Price?.price);
        } else if (sortOrder === "desc") {
            filteredProperties.sort((a, b) => b.Price?.price - a.Price?.price);
        } else {
            filteredProperties = shuffleArray(filteredProperties);
        }

        // Обновляем страницу и пагинацию
        currentPage = 1;
        renderProperties();
        renderPagination();
    });

    // Сброс фильтров
    document.getElementById('reset-filters').addEventListener('click', function () {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.getElementById('price').value = maxPrice;
        document.getElementById('price-range-text').textContent = `От 0 до ${maxPrice} ₽`;
        filteredProperties = [...allProperties];
        renderProperties();
        renderPagination();
    });

    // Обработчик сортировки
    document.getElementById('sort-button').addEventListener('click', toggleSort);
    
    const guestsSelectOne = document.getElementById("guestsSelectOne");
        const guestsSelectTwo = document.getElementById("guestsSelectTwo");
        const applyFiltersButton = document.getElementById("applyFilters");

        // Проверяем, что элементы существуют
        if (guestsSelectOne && guestsSelectTwo && applyFiltersButton) {
            // Привязываем обработчик событий
            applyFiltersButton.addEventListener('click', applyFilters);
        } else {
            console.error("Не найдены элементы для фильтров");
        }

        // Функция для фильтрации по одному параметру
    function applySingleFilter(filterType, value) {
        if (value) {
            filteredProperties = allProperties.filter(property => {
                if (filterType === 'city') {
                    return property.Location?.city.toLowerCase().includes(value.toLowerCase());
                }
                if (filterType === 'beds') {
                    return property.NumberOfRoom?.numberofbeds == value;
                }
                // Добавьте другие фильтры здесь (например, по цене, расстоянию и т.д.)
                return true;
            });
        } else {
            filteredProperties = [...allProperties];
        }

        renderProperties();
        renderPagination();
    }

    // Обработчик для поиска города
    document.getElementById("cityInput").addEventListener("input", function () {
        const cityValue = this.value;
        applySingleFilter('city', cityValue);
    });

    // Обработчик для выбора количества кроватей
    document.getElementById("guestsSelectOne").addEventListener("change", function () {
        const bedsValue = this.value;
        applySingleFilter('beds', bedsValue);
    });
    // Загрузка данных
    fetchData();
});

// Фильтрация по городу
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

