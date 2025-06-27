// Main JavaScript for Healthy Leaders Summit

$(document).ready(function() {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        const target = $(this.getAttribute('href'));
        
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Sticky header effect
    let scrollPosition = 0;
    
    $(window).scroll(function() {
        const scroll = $(window).scrollTop();
        
        // Add shadow and background opacity based on scroll position
        if (scroll > 50) {
            $('.mainHeader').css({
                'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.1)',
                'background-color': 'rgba(255, 255, 255, 0.98)'
            });
        } else {
            $('.mainHeader').css({
                'box-shadow': '0 4px 12px rgba(0, 0, 0, 0.08)',
                'background-color': 'rgba(255, 255, 255, 0.95)'
            });
        }
        
        // Store scroll position for future reference
        scrollPosition = scroll;
    });
    
    // Add active class to current section in navigation
    const sections = $('section');
    const navLinks = $('.mainNav a');
    
    $(window).scroll(function() {
        const currentPos = $(window).scrollTop();
        
        sections.each(function() {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();
            
            if (currentPos >= top && currentPos <= bottom) {
                const currentId = $(this).attr('id');
                
                navLinks.removeClass('active');
                $('.mainNav a[href="#' + currentId + '"]').addClass('active');
            }
        });
    });
    
    // Add CSS class for active navigation
    $('<style>.mainNav a.active { color: var(--primary-color); font-weight: 700; } .mainNav a.active::after { width: 100%; }</style>').appendTo('head');
    
    // Ticket selection
    $('.ticketCard').on('click', function() {
        // Don't activate if the ticket is sold out
        if ($(this).find('.ticketStatus').length > 0) {
            return;
        }
        
        $('.ticketCard').removeClass('selected');
        $(this).addClass('selected');
          // Add CSS for selected ticket
        if ($('#selectedTicketStyle').length === 0) {
            $('<style id="selectedTicketStyle">.ticketCard.selected { border: 2px solid var(--secondary-color); transform: translateY(-5px); }</style>').appendTo('head');
        }
    });
    
    // Payment method selection
    $('.paymentOption').on('click', function() {
        $('.paymentOption').removeClass('selected');
        $(this).addClass('selected');
          // Add CSS for selected payment
        if ($('#selectedPaymentStyle').length === 0) {
            $('<style id="selectedPaymentStyle">.paymentOption.selected { transform: translateY(-3px); } .paymentOption.selected .paymentIcon::before { border: 2px solid var(--secondary-color); }</style>').appendTo('head');
        }
    });
    
    // Animate elements when they come into view
    const fadeInElements = $('.heroContent, .aboutContent, .scheduleGrid, .ticketOptions, .venueDetails, .contactInfo');
    
    function checkFade() {
        fadeInElements.each(function() {
            const elementTop = $(this).offset().top;
            const windowHeight = $(window).height();
            const scrollY = $(window).scrollTop();
            
            // If element is in viewport
            if (elementTop < (scrollY + windowHeight * 0.9)) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Add CSS for fade-in animation
    $('<style>.heroContent, .aboutContent, .scheduleGrid, .ticketOptions, .venueDetails, .contactInfo { opacity: 0; transform: translateY(20px); transition: opacity 0.8s, transform 0.8s; } .visible { opacity: 1; transform: translateY(0); }</style>').appendTo('head');
    
    // Check elements on load and scroll
    $(window).on('load scroll', checkFade);
    
    // Initialize visible elements on page load
    setTimeout(checkFade, 100);
});
