// 메인 페이지 자바스크립트

// DOM 콘텐츠 로드 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // 현재 페이지에 해당하는 네비게이션 항목에 active 클래스 추가
    highlightCurrentPage();
});

// 현재 페이지 URL에 따라 네비게이션 메뉴 강조 표시
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // 네비게이션 링크와 현재 페이지가 일치하는 경우
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// 이미지 로딩 지연 처리 (성능 최적화)
const images = document.querySelectorAll('img');
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                image.src = image.dataset.src;
                imageObserver.unobserve(image);
            }
        });
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });
} 