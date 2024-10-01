document.addEventListener('DOMContentLoaded', function() {
    const bannerContainer = document.querySelector('.banner-container');
    const banners = document.querySelectorAll('.banner-img');
    const totalBanners = banners.length; 
    const bannerWidth = bannerContainer.clientWidth; 
    let index = 0;

    function changeBanner() {
        index++;
        if (index >= totalBanners) {
            index = 0;
            bannerContainer.style.transition = 'none';
            bannerContainer.style.transform = `translateX(0)`;
        } else {
            const translateValue = -index * bannerWidth;
            bannerContainer.style.transition = 'transform 1s ease-in-out';
            bannerContainer.style.transform = `translateX(${translateValue}px)`;
        }
    }

    setInterval(changeBanner, 6000); 
});

function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const marqueeContainer = document.querySelector('.marquee p');
    let messages = []; 

    function loadMessages() {
        fetch('messages.json')
            .then(response => response.json())
            .then(data => {
                messages = data.messages;
                
                displayMessage(0);
              
                animateMarquee();
            })
            .catch(error => console.error('Error al cargar mensajes:', error));
    }


    function displayMessage(index) {
        marqueeContainer.textContent = messages[index].text;
    }


    function animateMarquee() {
        let currentIndex = 0;

        setInterval(() => {
            currentIndex++;
            if (currentIndex >= messages.length) {
                currentIndex = 0;
            }
            displayMessage(currentIndex);
        }, 4000); 
    }


    loadMessages();
});