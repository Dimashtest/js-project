document.addEventListener("DOMContentLoaded", async () => {
    let allProperties = [];
    let currentPage = 1;
    const itemsPerPage = 8;

    async function fetchData() {
        const url = 'http://localhost:4000/api/properties/';
        console.log("Отправляем запрос:", url);

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);

            const data = await response.json();
            console.log("Получены данные:", data);

            if (Array.isArray(data)) {
                allProperties = data; // ✅ Сохраняем данные
                renderProperties(); // ✅ Рендерим первую страницу
                renderPagination(); // ✅ Рендерим пагинацию
            } else {
                console.error("Ошибка: полученные данные не являются массивом");
            }
        } catch (error) {
            console.error("Ошибка загрузки данных:", error);
        }
    }

    function renderProperties() {
        const container = document.getElementById("property-list");
        container.innerHTML = "";
    
        const startIndex = (currentPage - 1) * itemsPerPage;
        const selectedProperties = allProperties.slice(startIndex, startIndex + itemsPerPage);
        const defaultImages = [
            "./img/Flat (1).svg",
            "./img/Flat (2).svg",
            "./img/Flat (3).svg",
            "./img/Flat (4).svg"
        ];
    
        selectedProperties.forEach((property) => {
            const randomImage = defaultImages[Math.floor(Math.random() * defaultImages.length)];
            const imageSrc = property.image || randomImage
    
            container.innerHTML += `
                <div class="flex bg-white rounded-lg shadow-lg gap-6">
                    <img src="${imageSrc}" alt="Фото жилья" class="w-48 h-48 object-cover">
                    <div class="flex flex-col justify-between p-7">
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

    function renderPagination() {
        const paginationContainer = document.getElementById("pagination");
        paginationContainer.innerHTML = "";

        const totalPages = Math.ceil(allProperties.length / itemsPerPage);

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

    await fetchData(); // ✅ Ждем загрузки перед рендерингом
});
