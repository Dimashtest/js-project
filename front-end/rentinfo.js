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
