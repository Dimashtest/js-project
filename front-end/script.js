const selectOne = document.getElementById('guestsSelectOne')
selectOne.addEventListener('change', function () {
    this.classList.remove('text-gray-400')
    this.classList.add('text-black')
})

const selectTwo = document.getElementById('guestsSelectTwo')
selectTwo.addEventListener('change', function () {
    this.classList.remove('text-gray-400')
    this.classList.add('text-black')
})