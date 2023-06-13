import './styles/index.css';
import EmblaCarousel from 'embla-carousel';


// Grab wrapper nodes
const rootNode = document.querySelector('.embla');
const viewportNode = rootNode.querySelector('.embla__viewport');
const OPTIONS = {
    slidesToScroll: 1, loop: true, watchDrag: false, inViewThreshold: 0.1, align: 0,
    breakpoints: {
        '(max-width: 599px)': { watchDrag: true }
    }
};
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

const closePopupsClickShadow = (evt) => {
    if (evt.target.classList.contains('popup')) {
        allPopupsClose();
    }
}

openPopupAutoButton.addEventListener('click', () => {
    popupAuto.addEventListener('click', closePopupsClickShadow);
    popupAuto.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose)
})

openPopupMotoButton.addEventListener('click', () => {
    popupMoto.addEventListener('click', closePopupsClickShadow);
    popupMoto.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose)
})

closePopupButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        e.target.closest('.popup').classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEscClose)
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

const buttonOpenBurger = document.querySelector('.burger__button');
const buttonCloseBurger = document.querySelector('.burger__button-esc');
const burgerMenu = document.querySelector('.burger');

const allPopupsClose = () => {
    popupAuto.classList.remove('popup_opened');
    popupMoto.classList.remove('popup_opened');
    popupBooking.classList.remove('popup_opened');
}

const handleEscClose = (evt) => {
    if (evt.key === 'Escape') {
        allPopupsClose();
        document.removeEventListener('keydown', handleEscClose);
    }
}

buttonOpenBurger.addEventListener('click', () => {
    burgerMenu.classList.add('burger_active');
})

buttonCloseBurger.addEventListener('click', () => {
    burgerMenu.classList.remove('burger_active');
})

const popupBooking = document.querySelector('.popup__booking');

const popupBookingOpenButtons = document.querySelectorAll('.booking-open');


console.log(popupBookingOpenButtons);

popupBookingOpenButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
        moto = evt.target.closest('.embla__slide').querySelector('.swiper-slide__title').textContent;
        popupBooking.classList.add('popup_opened');
        popupBooking.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup')) {
                popupBooking.classList.remove('popup_opened');
            }
        })
    })
})




const formBooking = popupBooking.querySelector('.booking__form')

formBooking.addEventListener('submit', (evt) => {
    handleFormSubmit(evt);
});
console.log(formBooking)

let moto

const handleFormSubmit = (evt) => {
    evt.preventDefault();
    console.log('окей');

    let name = popupBooking.querySelector('.input-name').value;
    let number = popupBooking.querySelector('.input-number').value;
    let dataStart = popupBooking.querySelector('.input-date-start').value;

    const msg = `Бронирование ${moto}%0AИмя: ${name}%0AНомер телефона: ${number}%0AДата бронирования: ${dataStart}`
    fetch(`https://api.telegram.org/bot6116212100:AAHrlP2hSxuHfFXcjJ-haZ35CZbbypQcGoE/sendMessage?chat_id=-1001927500705&parse_mode=html&text=${msg}`, {
        method: 'GET'
    })
        .then(allPopupsClose())
        .catch(console.error)
}

// handleFormSubmit()






