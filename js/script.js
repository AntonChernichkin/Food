

window.addEventListener('DOMContentLoaded', ()=> {
    //tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains ('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
// let start = new Date();

// for (let i = 0; i < 100000; i++) {
//     let some = i ** 3;
// }

// let end = new Date();

// alert(`Цикл отработал ${end - start} миллисекунд`);

//clockTimer

const deadline = "2021-07-18";

function getTime (endtime) {
    const t = Date.parse(endtime)- Date.parse(new Date()),
          days = Math.floor(t/(1000*60*60*24)),
          hours = Math.floor(t/(1000*60*60)%24),
          minutes = Math.floor(t/(1000*60)%60),
          seconds = Math.floor(t/(1000)%60);

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds':seconds
    };
}

function addTime (selector, endtime) {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(setTime, 1000);
    
    setTime();

    function getZero(a) {
        if (a >= 0 && a <10) {
            return `0${a}`;
        } else {
            return a;
        }
    }

    function setTime () {
        const t = getTime (endtime);

        days.textContent = getZero(t.days);
        hours.textContent = getZero(t.hours);
        minutes.textContent = getZero(t.minutes);
        seconds.textContent = getZero(t.seconds);

        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    }
}

addTime ('.timer', deadline);

//Modal

    const btnModalOpen = document.querySelectorAll('[data-modal]'),
        btnModalClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');
    
    function openModal() {
        modal.classList.remove('show', 'hide');
        modal.classList.add('show');
        clearInterval(modalTimer);
    }

    btnModalOpen.forEach((item) => {
        item.addEventListener('click', openModal);
    });

    function closeModal () {
        modal.classList.remove('show');
        modal.classList.add('hide');      
    }

    btnModalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function openModalAfterScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', openModalAfterScroll);
        }
    }

    const modalTimer = setTimeout (openModal, 6000);
    
    window.addEventListener('scroll', openModalAfterScroll);

    //cardItem
    class MenuItem {
        constructor (img, alt, subtitle, descr, total, parentSelector, ...className) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.q = 72.64;
            this.total = total;
            this.parentSelector = parentSelector;
            this.className = className;
            this.changeToRub();
        } 

        changeToRub() {
            this.total = Math.floor(this.total * this.q);
        }
    
        render () {
            const containerCard = document.querySelector(this.parentSelector);
            const menuItem = document.createElement('div');
            if (this.className.forEach.length === 0) {
                this.className = 'menu__item';
                menuItem.classList.add(this.className);
            } else {
                this.className.forEach(item => menuItem.classList.add(item));
            }
            menuItem.classList.add('menu__item');
            menuItem.innerHTML = `                
            <img src="${this.img}" alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.subtitle}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.total}</span> руб/день</div>
            </div>
            `;
            containerCard.append(menuItem);
        }
    }

    new MenuItem (
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"', 
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
        4,
        '[data-card]',
        'menu__item'
        ).render();

    new MenuItem (
        'img/tabs/elite.jpg',
        'elite',
        'Меню “Премиум”', 
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
        6,
        '[data-card]'
        ).render();

    new MenuItem (
        'img/tabs/post.jpg', 
        'post',
        'Меню "Постное"', 
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
        8,
        '[data-card]',
        'menu__item'
        ).render();


});

