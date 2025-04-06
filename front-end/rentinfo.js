document.addEventListener("DOMContentLoaded", () => {
    const thumbnails = document.querySelectorAll(".thumbnail");
    const mainImage = document.getElementById("mainImage");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            mainImage.src = thumbnail.src;

            thumbnails.forEach(img => img.classList.remove("border-blue-500"));

            thumbnail.classList.add("border-blue-500");
        });
    });
});

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); // Получаем id из URL

    if (!id) {
        console.error("ID не указан");
        return;
    }

    try {
        // Запрашиваем данные о недвижимости по id
        const response = await fetch(`http://localhost:4000/api/properties/${id}`);
        const data = await response.json();

        if (!data) {
            console.error("Недвижимость с таким ID не найдена");
            return;
        }

        // Обновляем данные на странице
        const mainImage = document.getElementById("mainImage");
        const title = document.getElementById("property-title");
        const breadcrumbCity = document.getElementById("breadcrumb-city");
        const priceTag = document.getElementById("price-tag");
        const imageGallery = document.getElementById("image-gallery");
        const propertyId = document.getElementById("property-id");

        // Обновляем хлебные крошки и заголовок
        breadcrumbCity.textContent = data.Location?.city || "Неизвестный город";
        propertyId.textContent = `№${data.id}`;

        // Название и описание объекта
        title.textContent = `${data.NumberOfRoom?.description} — ${data.Location?.city}, ${data.Location?.street}`;

        // Цена
        priceTag.innerHTML = `От ${data.Price?.value || 0} ₽`;

        // Основное изображение
        mainImage.src = data.images?.[0] || "./img/example.jpg";

        // Галерея изображений
        imageGallery.innerHTML = "";
        if (data.images && data.images.length > 0) {
            data.images.forEach(imgSrc => {
                const imgElement = document.createElement("img");
                imgElement.src = imgSrc;
                imgElement.alt = "Фото";
                imgElement.classList.add("thumbnail", "w-full", "aspect-square", "object-cover", "border-4", "border-transparent", "cursor-pointer");
                imageGallery.appendChild(imgElement);
            });
        } else {
            const placeholder = document.createElement("p");
            placeholder.textContent = "Изображений нет";
            imageGallery.appendChild(placeholder);
        }
    } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
    }
});


