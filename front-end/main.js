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
        "./img/property4.svg"
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

    // Функция для обновления счетчиков
    async function fetchPropertyCounts() {
        try {
            const response = await fetch('http://localhost:4000/api/properties');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const properties = await response.json();

            const counts = {
                hotels: 0,
                apartments: 0,
                houses: 0,
                guestHouses: 0,
                privateSector: 0,
            };

            // Получаем выбранные чекбоксы
            const hotelCheckbox = document.getElementById('hotel-checkbox').checked;
            const apartmentCheckbox = document.getElementById('apartment-checkbox').checked;
            const houseCheckbox = document.getElementById('house-checkbox').checked;
            const guestHouseCheckbox = document.getElementById('guest-house-checkbox').checked;
            const privateSectorCheckbox = document.getElementById('private-sector-checkbox').checked;

            // Фильтруем объекты в зависимости от того, какие чекбоксы выбраны
            const filteredProperties = properties.filter(property => {
                return (
                    (hotelCheckbox && property.type === 'hotel') ||
                    (apartmentCheckbox && property.type === 'apartment') ||
                    (houseCheckbox && property.type === 'house') ||
                    (guestHouseCheckbox && property.type === 'guest_houses') ||
                    (privateSectorCheckbox && property.type === 'private_sector')
                );
            });

            // Подсчитываем количество объектов для каждого типа
            filteredProperties.forEach(property => {
                switch (property.type) {
                    case 'hotel':
                        counts.hotels++;
                        break;
                    case 'apartment':
                        counts.apartments++;
                        break;
                    case 'house':
                        counts.houses++;
                        break;
                    case 'guest_houses':
                        counts.guestHouses++;
                        break;
                    case 'private_sector':
                        counts.privateSector++;
                        break;
                }
            });

            // Обновляем отображение счетчиков
            document.getElementById('hotels-count').textContent = counts.hotels;
            document.getElementById('apartments-count').textContent = counts.apartments;
            document.getElementById('houses-count').textContent = counts.houses;
            document.getElementById('guestHouses-count').textContent = counts.guestHouses;
            document.getElementById('privateSector-count').textContent = counts.privateSector;

        } catch (error) {
            console.error('Ошибка при получении данных:', error.message);
        }
    }

    // Вызов функции после изменения состояния чекбоксов
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', fetchPropertyCounts);
    });

    // Вызов функции при загрузке страницы для инициализации данных
    fetchPropertyCounts();
    // ✅ Перемешивание (рандомный порядок)
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // ✅ Обновление стрелки сортировки
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

    // ✅ Функция сортировки
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

    // ✅ Рендер карточек
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

    // ✅ Рендер пагинации
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

    // ✅ Обновление цены в ползунке
    document.getElementById('price').addEventListener('input', function () {
        const priceValue = this.value;
        document.getElementById('price-range-text').textContent = `От 0 до ${priceValue} ₽`;
    });


    // ✅ Обработчик фильтрации
    document.getElementById('apply-filters').addEventListener('click', function () {
        const selectedPrice = document.getElementById('price').value;

        // 1️⃣ Фильтруем по цене
        filteredProperties = allProperties.filter(property => property.Price?.price <= selectedPrice);

        // 2️⃣ Фильтруем по чекбоксам (типы жилья)
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

        // 3️⃣ Фильтруем по количеству двухспальных кроватей
        const selectedDoubleBeds = document.getElementById('double-beds').value;
        if (selectedDoubleBeds) {
            filteredProperties = filteredProperties.filter(property =>
                property.NumberOfRoom?.numberofbeds == selectedDoubleBeds
            );
        }

        // 4️⃣ Фильтруем по количеству раздельных кроватей
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

        // 3️⃣ Фильтруем по удобствам
        // const wifiChecked = document.getElementById('wifi-checkbox').checked;
        // const acChecked = document.getElementById('ac-checkbox').checked;
        // const fridgeChecked = document.getElementById('fridge-checkbox').checked; // аналогично для других
        // Добавьте проверки для других удобств

        // filteredProperties = filteredProperties.filter(property => {
        //     return (!wifiChecked || property.amenities.includes('wifi')) &&
        //         (!acChecked || property.amenities.includes('ac')) &&
        //         (!fridgeChecked || property.amenities.includes('fridge')) &&
        //         // Добавьте условия для других удобств
        //         true; // Для всех остальных удобств (если их нет или они не выбраны)
        // });


        // 6️⃣ Применяем текущую сортировку 
        if (sortOrder === "asc") {
            filteredProperties.sort((a, b) => a.Price?.price - b.Price?.price);
        } else if (sortOrder === "desc") {
            filteredProperties.sort((a, b) => b.Price?.price - a.Price?.price);
        } else {
            filteredProperties = shuffleArray(filteredProperties);
        }

        // 7️⃣ Обновляем страницу и пагинацию
        currentPage = 1;
        renderProperties();
        renderPagination();
    });

    // ✅ Сброс фильтров
    document.getElementById('reset-filters').addEventListener('click', function () {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        document.getElementById('price').value = maxPrice;
        document.getElementById('price-range-text').textContent = `От 0 до ${maxPrice} ₽`;
        filteredProperties = [...allProperties];
        renderProperties();
        renderPagination();
    });

    // ✅ Обработчик сортировки
    document.getElementById('sort-button').addEventListener('click', toggleSort);

    // ✅ Загрузка данных
    fetchData();
});
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