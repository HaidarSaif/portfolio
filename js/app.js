document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);

    // --- AOS Initialization ---
    AOS.init({ duration: 1000, once: true, offset: 100 });

    // --- Typed.js Initialization ---
    const isIndo = document.documentElement.lang === 'id';
    const strings = isIndo
        ? ['Electrical Engineer', 'Embedded Systems Engineer', 'Penggiat Energi Terbarukan', 'Project Engineer']
        : ['Electrical Engineer', 'Embedded Systems Engineer', 'Renewable Energy Enthusiast', 'Project Engineer'];

    const typed = new Typed('.typed-text', {
        strings: strings,
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        cursorChar: '_'
    });

    // --- Custom Cursor ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    });

    // Hover effect
    document.querySelectorAll('a, button, .hover-target').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.backgroundColor = 'transparent';
        });
    });

    // --- Navbar Sticky ---
    const navbar = document.getElementById('navbar');
    const progressBar = document.querySelector('.scroll-progress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 20px';
            navbar.style.background = 'rgba(2, 4, 10, 0.9)';
        } else {
            navbar.style.padding = '20px';
            navbar.style.background = 'rgba(5, 8, 20, 0.7)';
        }

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        progressBar.style.width = (winScroll / height) * 100 + '%';

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= (sectionTop - 200)) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const isFloat = counter.getAttribute('data-target').includes('.');
            const updateCount = () => {
                const count = +counter.innerText;
                const inc = target / 200;
                if (count < target) {
                    counter.innerText = isFloat ? (count + inc).toFixed(2) : Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    if (document.querySelector('.stats-container')) observer.observe(document.querySelector('.stats-container'));

    // --- Project Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Hapus kelas active dari semua tombol
            filterBtns.forEach(b => b.classList.remove('active'));
            // Tambahkan kelas active ke tombol yang diklik
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category').split(' ').includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });

            // BANTUAN UNTUK AOS:
            // Paksa AOS untuk menghitung ulang tata letak halaman 
            // 350ms setelah kartu disembunyikan agar elemen di bawahnya kembali muncul
            setTimeout(() => {
                AOS.refresh();
            }, 350);
        });
    });
});