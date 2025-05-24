// 로컬 스토리지에서 관리자 데이터 가져오기
function getAdminData() {
    return JSON.parse(localStorage.getItem('adminData')) || {
        siteTitle: '푸른빛 보건동아리'
    };
}

// 페이지 로드 시 사이트 제목 업데이트
document.addEventListener('DOMContentLoaded', function() {
    // 사이트 제목 업데이트
    updateSiteTitle();
    
    // 푸터 텍스트 업데이트
    updateFooterText();
});

// 사이트 제목 업데이트 함수
function updateSiteTitle() {
    const adminData = getAdminData();
    const siteTitle = adminData.siteTitle || '푸른빛 보건동아리';
    
    // 헤더의 동아리 이름 업데이트
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.textContent = siteTitle;
    }
    
    // 페이지 제목(title 태그) 업데이트
    const pageTitle = document.title;
    if (pageTitle.includes('-')) {
        const pageName = pageTitle.split('-')[0].trim();
        document.title = `${pageName} - ${siteTitle}`;
    } else {
        document.title = siteTitle;
    }
}

// 푸터 텍스트 업데이트 함수
function updateFooterText() {
    const adminData = getAdminData();
    const siteTitle = adminData.siteTitle || '푸른빛 보건동아리';
    const currentYear = new Date().getFullYear();
    
    // 일반 페이지 푸터 (관리자 페이지 제외)
    const footerText = document.querySelector('footer p:first-child');
    if (footerText && !document.querySelector('#resetDataBtn')) {
        footerText.innerHTML = `&copy; ${currentYear} ${siteTitle} All Rights Reserved.`;
    }
    
    // 관리자 페이지 푸터
    const adminFooter = document.querySelector('footer p');
    if (adminFooter && document.querySelector('#resetDataBtn')) {
        adminFooter.innerHTML = `&copy; ${currentYear} ${siteTitle} All Rights Reserved. <a href="#" id="resetDataBtn" class="admin-footer-btn">데이터 초기화</a>`;
    }
} 