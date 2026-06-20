$(document).ready(function() {
    'use strict';

    // ==================== CONFIGURATION ====================
    const slidesData = [
        { 
            img: "https://placehold.co/400", 
            teks: "✨ Di antara semua yang terjadi dalam hidupku, kamu adalah bagian yang ingin selalu aku jaga. Terima kasih sudah ada, dengan caramu yang sederhana tapi sangat berarti. Senyummu adalah alasan aku percaya bahwa cinta sejati itu nyata. 💖"
        },
        { 
            img: "https://placehold.co/400", 
            teks: "🌹 Aku tidak tahu kapan jatuh cinta kepadamu. Mungkin saat pertama melihat matamu yang teduh, atau saat pertama tawamu yang tulus. Sejak itu, aku tak bisa membayangkan hariku tanpamu. Kamu membuat dunia yang biasa menjadi luar biasa. Kamu adalah rumah yang aku cari. 🏠"
        },
        { 
            img: "https://placehold.co/400", 
            teks: "✨ Jika ditanya hal terbaik dalam hidupku, jawabannya selalu kamu. Bukan tentang tempat atau momen spesial, tapi tentang bagaimana kamu hadir dan membuat segalanya terasa lebih ringan. Bersamamu, aku merasa lebih kuat, lebih utuh, dan lebih berani bermimpi. 💫"
        },
        { 
            img: "https://placehold.co/400", 
            teks: "💕 Terima kasih sudah ada, pacarku yang cantik, untuk semua cinta dan perhatian yang kamu berikan setiap hari. Kamu membuat hidupku lebih cerah hanya dengan ada di dalamnya, dan aku sangat bersyukur atas kehadiranmu. Terima kasih atas kesabaranmu, dukunganmu, dan caramu mengerti aku bahkan saat kata-kata tidak cukup. Aku sangat beruntung bisa memanggilmu bahwa kamu milikku, hari ini dan selamanya. 💝"
        }
    ];

    // ==================== METEORS GENERATOR ====================
    function createMeteors() {
        const container = $('.meteors-container');
        const meteorCount = 15;
        
        for (let i = 0; i < meteorCount; i++) {
            const meteor = $('<div class="meteor"></div>');
            const delay = Math.random() * 12;
            const duration = 2 + Math.random() * 4;
            const left = Math.random() * 100;
            
            meteor.css({
                left: left + '%',
                animationDelay: delay + 's',
                animationDuration: duration + 's'
            });
            
            container.append(meteor);
        }
    }
    
    createMeteors();

    // ==================== LOADING WITH COMET ====================
    let progress = 0;
    let loadingInterval = setInterval(() => {
        progress += 1.5;
        if (progress >= 100) {
            clearInterval(loadingInterval);
            $('.loading-screen').fadeOut(800, function() {
                $('#page1').removeClass('hidden').hide().fadeIn(800);
                startPageTransitions();
            });
        }
        
        $('#loading-bar').css('width', progress + '%');
        $('.comet').css('left', (progress / 100) * 288 + 'px');
    }, 20);

    // ==================== PAGE TRANSITIONS ====================
    function startPageTransitions() {
        $('#page1').on('click', function() {
            $(this).fadeOut(500, function() {
                $('#page2').removeClass('hidden').hide().fadeIn(500);
                startTimer();
            });
        });
    }
    
    // ==================== TIMER FIXED ====================
    let timerInterval;
    
    function startTimer() {
        let count = 1;
        const radius = 82;
        const circumference = 2 * Math.PI * radius;
        const circle = $('.progress-ring__circle');
        const quoteElement = $('#timer-quote');
        const timerDisplay = $('#timer-display');
        
        // Reset visual
        circle.css('stroke-dashoffset', circumference);
        timerDisplay.text('1').show();
        quoteElement.removeClass('hide-quote').css('opacity', '1');
        
        function updateCircle(value) {
            const offset = circumference - (value / 3) * circumference;
            circle.css('stroke-dashoffset', offset);
        }
        
        updateCircle(1);
        
        timerInterval = setInterval(function() {
            if (count < 3) {
                count++;
                timerDisplay.text(count);
                updateCircle(count);
            } 
            else if (count === 3) {
                timerDisplay.text(3);
                updateCircle(3);
                count++;
                
                setTimeout(function() {
                    clearInterval(timerInterval);
                    quoteElement.addClass('hide-quote');
                    timerDisplay.fadeOut(400, function() {
                        $('#page2').fadeOut(100, function() {
                            $('#page3').removeClass('hidden').hide().fadeIn(400);
                            setupPage3();
                        });
                    });
                }, 500);
            }
        }, 1000);
    }
    
    // ==================== PAGE 3 SETUP ====================
    function setupPage3() {
        $('#show-photos-btn').on('click', function() {
            launchRocket();
        });
    }
    
    // ==================== ROCKET ANIMATION ====================
    function launchRocket() {
        const rocket = $('#rocket-animation');
        rocket.removeClass('hidden');
        rocket.addClass('rocket-fly');
        
        setTimeout(function() {
            rocket.addClass('hidden');
            rocket.removeClass('rocket-fly');
            
            $('#page3').fadeOut(500, function() {
                $('#page4').removeClass('hidden').hide().fadeIn(500);
                initSlider();
                
                const audio = document.getElementById('bg-photo-sound');
                if (audio) {
                    audio.play().catch(function(e) {
                        console.log('Audio needs user interaction first');
                    });
                }
            });
        }, 1000);
    }
    
    // ==================== SLIDER ====================
    let currentSlide = 0;
    let totalSlides = slidesData.length;
    
    function updateSlide() {
        $('#slide-img').attr('src', slidesData[currentSlide].img);
        
        const textElement = $('#slide-text');
        textElement.fadeOut(200, function() {
            textElement.text(slidesData[currentSlide].teks);
            textElement.fadeIn(200).addClass('blink-text');
            setTimeout(function() {
                textElement.removeClass('blink-text');
            }, 500);
        });
        
        $('#slide-counter').text((currentSlide + 1) + ' / ' + totalSlides);
        
        // Handle prev/next button visibility
        if (currentSlide === 0) {
            $('#prev-slide').css('opacity', '0.3').css('cursor', 'not-allowed');
        } else {
            $('#prev-slide').css('opacity', '1').css('cursor', 'pointer');
        }
        
        if (currentSlide === totalSlides - 1) {
            $('#next-slide').css('opacity', '0.3').css('cursor', 'not-allowed');
        } else {
            $('#next-slide').css('opacity', '1').css('cursor', 'pointer');
        }
        
        // ========== FIX BUG: Tombol Continue hanya muncul di slide terakhir (index 3) ==========
        if (currentSlide === totalSlides - 1) {
            // Jika sedang di slide terakhir, tampilkan tombol CONTINUE
            $('#continue-slide').removeClass('hidden').hide().fadeIn(300);
        } else {
            // Jika bukan di slide terakhir, sembunyikan tombol CONTINUE
            $('#continue-slide').fadeOut(300, function() {
                $(this).addClass('hidden');
            });
        }
    }
    
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlide();
        }
    }
    
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlide();
        }
    }
    
    function initSlider() {
        currentSlide = 0;
        updateSlide();
        
        $('#prev-slide').off('click').on('click', prevSlide);
        $('#next-slide').off('click').on('click', nextSlide);
        
        $('#continue-slide').off('click').on('click', function() {
            window.open('https://fiqtor.github.io/flowers-for-someone/flower.html', '_blank');
        });
        
        const sliderElement = document.getElementById('slider-container');
        if (sliderElement) {
            const hammer = new Hammer(sliderElement);
            hammer.on('swipeleft', function() {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                    updateSlide();
                }
            });
            hammer.on('swiperight', function() {
                if (currentSlide > 0) {
                    currentSlide--;
                    updateSlide();
                }
            });
        }
    }
    
    // ==================== PRELOAD IMAGES ====================
    for (let i = 0; i < slidesData.length; i++) {
        let img = new Image();
        img.onerror = (function(index) {
            return function() {
                slidesData[index].img = 'https://via.placeholder.com/600x400?text=Memory+Photo';
                if (index === currentSlide) updateSlide();
            };
        })(i);
        img.src = slidesData[i].img;
    }
});