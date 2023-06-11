import './styles/index.css';
import EmblaCarousel from 'embla-carousel';


// Grab wrapper nodes
const rootNode = document.querySelector('.embla');
const viewportNode = rootNode.querySelector('.embla__viewport');
const OPTIONS = { slidesToScroll: 1, loop: true, watchDrag: false, inViewThreshold: 0.1, align: 0 };
const emblaApi = EmblaCarousel(viewportNode, OPTIONS);

// Grab button nodes
const prevButtonNode = rootNode.querySelector('.embla__prev');
const nextButtonNode = rootNode.querySelector('.embla__next');


const rootNodeMoto = document.querySelector('.embla_moto');
const viewportNodeMoto = rootNodeMoto.querySelector('.embla__viewport_moto');
const emblaApiMoto = EmblaCarousel(viewportNodeMoto, OPTIONS);

// Grab button nodes
const prevButtonNodeMoto = rootNodeMoto.querySelector('.embla__prev_moto');
const nextButtonNodeMoto = rootNodeMoto.querySelector('.embla__next_moto');

prevButtonNodeMoto.addEventListener('click', emblaApiMoto.scrollPrev, false);
nextButtonNodeMoto.addEventListener('click', emblaApiMoto.scrollNext, false);


const popupAuto = document.querySelector('.popup__auto');
const openPopupAutoButton = document.querySelector('.button__popup-auto');
const popupMoto = document.querySelector('.popup__moto');
const openPopupMotoButton = document.querySelector('.button__popup-moto');
const closePopupButtons = document.querySelectorAll('.popup__close');

openPopupAutoButton.addEventListener('click', () => {
    popupAuto.classList.add('popup_opened');
})

openPopupMotoButton.addEventListener('click', () => {
    popupMoto.classList.add('popup_opened');
})

closePopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.closest('.popup').classList.remove('popup_opened');
    })
})


// Add click listeners
prevButtonNode.addEventListener('click', emblaApi.scrollPrev, false);
nextButtonNode.addEventListener('click', emblaApi.scrollNext, false);

const anchors = document.querySelectorAll('a[href*="#"]');

for (let anchor of anchors) {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const blockID = anchor.getAttribute('href');
        document.querySelector(`${blockID}`).scrollIntoView({
            behavior: "smooth",
            block: "center"
        })
    })
}

