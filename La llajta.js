 document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('current-year').textContent = new Date().getFullYear();
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebar = document.getElementById('sidebar');
    hamburgerBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
        this.classList.toggle('active');
    });
    const menuLinks = document.querySelectorAll('#menu a');
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            if(window.innerWidth <= 992) {
                sidebar.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') === '#menu-section') {
                e.preventDefault();
                const parentLi = this.parentElement;
                parentLi.classList.toggle('active');
                const targetElement = document.querySelector('#menu-section');
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, '#menu-section');
                    } else {
                        window.location.hash = '#menu-section';
                    }
                }
                return;
            }
            
            if(this.getAttribute('href') !== '#' && !this.classList.contains('menu-button')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    } else {
                        window.location.hash = targetId;
                    }
                }
            }
        });
    });
    
    window.addEventListener('scroll', function() {
        const homeSection = document.getElementById('home');
        const scrollPosition = window.pageYOffset;
        
        if(homeSection) {
            const elementPosition = homeSection.offsetTop;
            const elementHeight = homeSection.offsetHeight;
            
            if(scrollPosition > elementPosition - window.innerHeight && 
               scrollPosition < elementPosition + elementHeight) {
                const speed = 0.3;
                const yPos = -(scrollPosition - elementPosition) * speed;
                homeSection.style.backgroundPositionY = yPos + 'px';
            }
        }

        const sections = document.querySelectorAll('.main-section, .parallax-bg');
        const menuItems = document.querySelectorAll('#menu ul > li > a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        menuItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
                
                if(item.classList.contains('menu-button') && window.innerWidth <= 992) {
                    item.parentElement.classList.add('active');
                }
            }
        });
    });
    
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `custom-alert ${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }
    
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
    
    if(window.location.hash === '') {
        document.querySelector('#home').scrollIntoView();
        history.replaceState(null, null, '#home');
    }
    
    if(window.innerWidth <= 992 && window.location.hash.includes('menu-section')) {
        const menuButton = document.querySelector('#menu ul > li > a.menu-button');
        if(menuButton) {
            menuButton.parentElement.classList.add('active');
        }
    }
    initCarousels();
});

function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    carousels.forEach(carousel => {
        const track = carousel.querySelector('.carousel-track');
        const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
        const sectionId = carousel.closest('section').id;
        slides.forEach(slide => {
            const clone = slide.cloneNode(true);
            track.appendChild(clone);
        });
        
       
    });
}

function moveSlide(sectionId, direction) {
    const carousel = document.querySelector(`#${sectionId} .carousel-container`);
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const slideWidth = slides[0].offsetWidth + 30;
    
    if (!track.style.transition) {
        track.style.transition = 'transform 0.5s ease';
    }
    
    const currentTransform = track.style.transform ? 
        parseInt(track.style.transform.replace('translateX(', '').replace('px)', '')) : 0;
    let newTransform = currentTransform - (slideWidth * direction);
    
    track.style.transform = `translateX(${newTransform}px)`;
    
    setTimeout(() => {
        const slideCount = slides.length / 2; 
        
        if (direction === 1 && Math.abs(newTransform) >= slideWidth * slideCount) {
            track.style.transition = 'none';
            track.style.transform = 'translateX(0)';
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
            }, 10);
        } 
        else if (direction === -1 && newTransform >= 0) {
            track.style.transition = 'none';
            track.style.transform = `translateX(-${slideWidth * (slideCount - 1)}px)`;
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease';
            }, 10);
        }
    }, 500);
}

document.getElementById('whatsappForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = encodeURIComponent(document.getElementById('nombre').value);
    const telefono = encodeURIComponent(document.getElementById('telefono').value);
    const pedido = encodeURIComponent(document.getElementById('pedido').value);
    const numeroWhatsApp = '59164242740'; 
    const mensaje = `*Nuevo Pedido*%0A%0A` +
                    `*Nombre:* ${nombre}%0A` +
                    `*Teléfono:* ${telefono}%0A` +
                    `*Pedido:*%0A${pedido}`;
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
    alert("Serás redirigido a WhatsApp para completar el envío");
});

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    initSlider('platos');
    initSlider('aperitivos');
    initSlider('bebidas');
});

function initSlider(sectionName) {
    const sliderWrapper = document.getElementById(`${sectionName}-slider`);
    const slides = sliderWrapper.querySelectorAll('.slide-container');
    const dots = sliderWrapper.querySelectorAll('.slider-dot');
    const prevBtn = sliderWrapper.querySelector('.prev');
    const nextBtn = sliderWrapper.querySelector('.next');
    let currentIndex = 0;
    let intervalId;
    const slideInterval = 5000; // 5 segundos

    function showSlide(index) {
        // Asegurar que el índice esté en rango
        index = (index + slides.length) % slides.length;
        
        // Ocultar todas las diapositivas
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Mostrar la diapositiva actual
        slides[index].classList.add('active');
        if(dots[index]) dots[index].classList.add('active');
        
        currentIndex = index;
    }

    function nextSlide() {
        showSlide(currentIndex + 1);
    }

    function prevSlide() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        intervalId = setInterval(nextSlide, slideInterval);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            showSlide(index);
            startAutoSlide();
        });
    });

    // Pausar al interactuar
    sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
    sliderWrapper.addEventListener('mouseleave', startAutoSlide);

    // Iniciar
    showSlide(0);
    startAutoSlide();
}