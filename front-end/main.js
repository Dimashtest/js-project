document.addEventListener('DOMContentLoaded', async () => {
    let allProperties = [];
let filteredProperties = [];
let currentPage = 1;
const itemsPerPage = 8;
const maxPrice = 10000; // Максимальная цена для ползунка

// Список изображений (вы можете добавлять или менять пути к изображениям)
const defaultImages = [
    "./img/property1.svg",
    "./img/property2.svg",
    "./img/property3.svg",
    "./img/property4.svg"
];

// Функция для получения данных с сервера
async function fetchData() {
    const url = 'http://localhost:4000/api/properties/';
    console.log("Отправляем запрос:", url);

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

        const data = await response.json();
        console.log("Получены данные:", data);

        if (Array.isArray(data)) {
            allProperties = data; // Сохраняем все данные
            filteredProperties = [...allProperties]; // Изначально все свойства показываем
            renderProperties(); // Рендерим первую страницу
            renderPagination(); // Рендерим пагинацию
        } else {
            console.error("Ошибка: полученные данные не являются массивом");
        }
    } catch (error) {
        console.error("Ошибка загрузки данных:", error);
    }
}

// Функция для рендеринга карточек
function renderProperties() {
    const container = document.getElementById("property-list");
    container.innerHTML = ""; // Очистим контейнер перед рендером

    const selectedPrice = document.getElementById('price').value;  // Текущий диапазон цен
    const startIndex = (currentPage - 1) * itemsPerPage;

    // Фильтруем объекты по цене
    filteredProperties = allProperties.filter(property => property.Price?.price <= selectedPrice);

    // Получаем только те объекты, которые должны быть на текущей странице
    const selectedProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

    selectedProperties.forEach((property, index) => {
        // Генерируем путь к изображению
        const imageSrc = defaultImages[index % defaultImages.length];  // Модуляция индекса для цикличности изображений

        container.innerHTML += `
            <div class="flex bg-white rounded-lg shadow-lg gap-6">
                <img src="${imageSrc}" alt="Фото жилья" class="w-48 h-48 object-cover">
                <div class="flex flex-col justify-between p-7 w-[350px]">
                    <h3 class="text-lg font-semibold">${property.name}</h3>
                    <p class="text-gray-500">До моря ${property.DistanceToTheSea?.distance}</p>
                    <p class="text-gray-600">${property.Location?.city || 'Город неизвестен'}, ${property.Location?.street || 'Улица неизвестна'}</p>
                    <p class="text-blue-500 text-sm mt-2">
                        ${property.area || '—'} м² | ${property.NumberOfRoom?.numberofsplitedbeds || '—'} гостя | ${property.NumberOfRoom?.numberofbeds || '—'} спальня | ${property.beds || '—'} кровать
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

// Функция для рендеринга пагинации
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

// Обработчик для ползунка
document.getElementById('price').addEventListener('input', function () {
    const priceValue = this.value;
    document.getElementById('price-range-text').textContent = `От 0 до ${priceValue} ₽`;

    // Сбрасываем страницу на первую при изменении диапазона
    currentPage = 1;

    // Обновляем отображение карточек с новым фильтром
    renderProperties();
    renderPagination();
});

// Устанавливаем ползунок на максимальную цену (10000) и показываем соответствующий текст
document.getElementById('price').value = maxPrice;
document.getElementById('price-range-text').textContent = `От 0 до ${maxPrice} ₽`;

// Инициализация данных и отображения
fetchData();



    async function fetchPropertyCounts() {
        try {
            // Запрос к серверу для получения данных
            const response = await fetch('http://localhost:4000/api/properties');

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const properties = await response.json();

            // Подсчет объектов по типу
            const counts = {
                hotels: 0,
                apartments: 0,
                houses: 0,
                guestHouses: 0,
                privateSector: 0,
            };

            // Пройдемся по всем объектам и подсчитаем их по типам
            properties.forEach(property => {
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

            // Обновляем элементы на странице с подсчитанными данными
            document.getElementById('hotels-count').textContent = counts.hotels;
            document.getElementById('apartments-count').textContent = counts.apartments;
            document.getElementById('houses-count').textContent = counts.houses;
            document.getElementById('guestHouses-count').textContent = counts.guestHouses;
            document.getElementById('privateSector-count').textContent = counts.privateSector;

        } catch (error) {
            console.error('Ошибка при получении данных:', error.message);
        }
    }

    // Вызовем функцию для загрузки данных
    fetchPropertyCounts();
});
