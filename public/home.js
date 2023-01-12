document.getElementById('signUp').addEventListener('click', () => {
    location.href = '/';
});
let slide_content = document.querySelector('#slide-content');

let slide_index = 0;

slide = () => {
    let slide_items = slide_content.querySelectorAll('img')
    slide_items.forEach(e => e.classList.remove('active'))
    slide_index = slide_index + 1 === slide_items.length ? 0 : slide_index + 1
    slide_items[slide_index].classList.add('active')
};

setInterval(slide, 4000);