// 갤러리 필터링 기능
document.addEventListener('DOMContentLoaded', () => {
    // 로컬 스토리지에서 관리자 데이터 가져오기
    const adminData = JSON.parse(localStorage.getItem('adminData')) || { gallery: [] };
    
    // 관리자가 추가한 갤러리 항목이 있다면 페이지에 추가
    if (adminData.gallery && adminData.gallery.length > 0) {
        loadGalleryItems(adminData.gallery);
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // 필터 버튼 클릭 이벤트
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 모든 버튼에서 active 클래스 제거
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 클릭한 버튼에 active 클래스 추가
            button.classList.add('active');
            
            // 선택한 필터 가져오기
            const filterValue = button.getAttribute('data-filter');
            
            // 갤러리 아이템 필터링
            document.querySelectorAll('.gallery-item').forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // 갤러리 아이템 클릭 이벤트 (모달 기능)
    setupGalleryItemEvents();
});

// 관리자가 추가한 갤러리 항목을 페이지에 로드하는 함수
function loadGalleryItems(galleryItems) {
    const galleryGrid = document.querySelector('.gallery-grid');
    
    // 날짜순으로 정렬 (최신순)
    const sortedItems = [...galleryItems].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedItems.forEach(item => {
        // 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
        const dateParts = item.date.split('-');
        const formattedDate = `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
        
        // 새로운 갤러리 아이템 생성
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-category', item.category);
        
        galleryItem.innerHTML = `
            <img src="${item.imageData}" alt="${item.title}" class="gallery-img">
            <div class="gallery-caption">
                <h3>${item.title}</h3>
                <p>${formattedDate} | ${item.location}</p>
            </div>
        `;
        
        // 갤러리 그리드에 아이템 추가
        galleryGrid.appendChild(galleryItem);
    });
    
    // 모달 이벤트 설정
    setupGalleryItemEvents();
}

// 갤러리 아이템 클릭 이벤트 설정 함수
function setupGalleryItemEvents() {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('.gallery-img').getAttribute('src');
            const caption = item.querySelector('.gallery-caption h3').textContent;
            const desc = item.querySelector('.gallery-caption p').textContent;
            
            showImageModal(imgSrc, caption, desc);
        });
    });
}

// 이미지 모달 표시 함수
function showImageModal(imgSrc, caption, desc) {
    // 모달 요소 생성
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    
    // 모달 내용 생성
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${imgSrc}" alt="${caption}">
            <div class="modal-caption">
                <h3>${caption}</h3>
                <p>${desc}</p>
            </div>
        </div>
    `;
    
    // 페이지에 모달 추가
    document.body.appendChild(modal);
    
    // 모달 표시 애니메이션
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 닫기 버튼 클릭 이벤트
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300); // 애니메이션 완료 후 요소 제거
    });
    
    // 모달 영역 외 클릭 시 닫기
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
    
    // ESC 키 누르면 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.querySelector('.image-modal')) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    });
} 