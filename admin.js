// 관리자 페이지 데이터 구조
let adminData = JSON.parse(localStorage.getItem('adminData')) || {
    // 기본 관리자 계정
    adminAccount: {
        id: 'admin',
        password: '1234' // 실제 사용할 때는 암호화된 비밀번호를 사용해야 함
    },
    // 동아리 소개
    about: {
        intro: '푸른빛 보건동아리는 2015년에 설립되어 건강과 의료에 관심 있는 고등학생들이 모여 활동하는 동아리입니다. 우리는 건강한 학교 공동체와 지역사회 조성을 목표로 다양한 보건 관련 활동을 진행하고 있습니다.',
        goals: [
            '건강과 의학에 관한 지식 함양 및 공유',
            '응급처치 및 안전 관련 능력 배양',
            '학교와 지역사회의 건강 증진 활동 참여',
            '보건 의료계 진로 탐색 및 경험 제공'
        ],
        activities: [
            '응급처치 교육 및 실습',
            '건강 캠페인 기획 및 운영',
            '지역사회 보건 봉사활동',
            '의학 및 건강 관련 주제 탐구',
            '건강 관련 정보지 발간'
        ]
    },
    // 연락처 정보
    contact: {
        email: 'health.club@school.edu',
        phone: '02-123-4567',
        social: '@blue_health_club',
        location: '3층 보건교육실 (304호)'
    },
    // 동아리 일정
    schedules: [
        {
            id: 1,
            date: '2023-11-20',
            title: '응급처치 실습 (심폐소생술)',
            location: '보건실'
        },
        {
            id: 2,
            date: '2023-12-05',
            title: '겨울철 건강관리 특강',
            location: '세미나실'
        },
        {
            id: 3,
            date: '2023-12-15',
            title: '연말 건강 부스 운영',
            location: '학생회관'
        },
        {
            id: 4,
            date: '2024-01-10',
            title: '겨울방학 응급처치 심화과정',
            location: '보건교육실'
        }
    ],
    // 공지사항
    news: [
        {
            id: 1,
            date: '2023-11-15',
            title: '겨울방학 응급처치 심화과정 참가자 모집',
            content: '겨울방학 기간 동안 진행되는 응급처치 심화과정 참가자를 모집합니다. 관심 있는 학생들은 11월 30일까지 신청하세요.'
        },
        {
            id: 2,
            date: '2023-10-25',
            title: '지역 노인복지관 건강검진 봉사활동 완료',
            content: '지난 주말 지역 노인복지관에서 진행한 건강검진 봉사활동을 성공적으로 마쳤습니다. 총 35명의 어르신들께 기초 건강검진을 제공했습니다.'
        },
        {
            id: 3,
            date: '2023-10-10',
            title: '교내 손 씻기 캠페인 시작',
            content: '감기 및 독감 예방을 위한 교내 손 씻기 캠페인이 시작됐습니다. 10월 한 달간 올바른 손 씻기 방법을 홍보합니다.'
        }
    ],
    // 갤러리 사진
    gallery: []
};

// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소 가져오기
    const loginSection = document.getElementById('loginSection');
    const adminContent = document.getElementById('adminContent');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminTabs = document.querySelectorAll('.admin-tab');
    
    // 페이지 초기화
    initializePage();
    
    // 로그인 폼 제출 이벤트
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const adminId = document.getElementById('adminId').value;
        const adminPw = document.getElementById('adminPw').value;
        
        // 관리자 계정 확인
        if (adminId === adminData.adminAccount.id && adminPw === adminData.adminAccount.password) {
            // 로그인 성공
            loginSection.classList.add('hidden');
            adminContent.classList.remove('hidden');
            
            // 세션 스토리지에 로그인 상태 저장 (페이지 이동 시 유지)
            sessionStorage.setItem('adminLoggedIn', 'true');
            
            // 폼 초기화
            loadAdminData();
        } else {
            // 로그인 실패
            alert('아이디 또는 비밀번호가 올바르지 않습니다.');
        }
    });
    
    // 로그아웃 버튼 이벤트
    logoutBtn.addEventListener('click', () => {
        adminContent.classList.add('hidden');
        loginSection.classList.remove('hidden');
        loginForm.reset();
        
        // 세션 스토리지에서 로그인 상태 제거
        sessionStorage.removeItem('adminLoggedIn');
    });
    
    // 탭 클릭 이벤트
    adminTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 모든 탭에서 active 클래스 제거
            adminTabs.forEach(t => t.classList.remove('active'));
            // 모든 탭 컨텐츠 숨기기
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // 선택한 탭 활성화
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // 동아리 소개 폼 제출 이벤트
    document.getElementById('aboutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const intro = document.getElementById('clubIntro').value;
        const goals = document.getElementById('clubGoals').value.split('\n').filter(Boolean);
        const activities = document.getElementById('clubActivities').value.split('\n').filter(Boolean);
        
        // 데이터 저장
        adminData.about.intro = intro;
        adminData.about.goals = goals;
        adminData.about.activities = activities;
        
        // 로컬 스토리지에 저장
        saveAdminData();
        
        alert('동아리 소개가 저장되었습니다.');
    });
    
    // 연락처 정보 폼 제출 이벤트
    document.getElementById('contactForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const email = document.getElementById('clubEmail').value;
        const phone = document.getElementById('clubPhone').value;
        const social = document.getElementById('clubSocial').value;
        const location = document.getElementById('clubAddress').value;
        
        // 데이터 저장
        adminData.contact.email = email;
        adminData.contact.phone = phone;
        adminData.contact.social = social;
        adminData.contact.location = location;
        
        // 로컬 스토리지에 저장
        saveAdminData();
        
        alert('연락처 정보가 저장되었습니다.');
    });
    
    // 일정 추가 버튼 이벤트
    document.getElementById('addScheduleBtn').addEventListener('click', () => {
        showScheduleForm();
    });
    
    // 일정 추가/수정 폼 취소 버튼 이벤트
    document.getElementById('cancelScheduleBtn').addEventListener('click', () => {
        document.getElementById('scheduleForm').classList.add('hidden');
    });
    
    // 일정 폼 제출 이벤트
    document.getElementById('scheduleEditForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const scheduleId = document.getElementById('scheduleId').value;
        const date = document.getElementById('scheduleDate').value;
        const title = document.getElementById('scheduleTitle').value;
        const location = document.getElementById('scheduleLocation').value;
        
        if (scheduleId) {
            // 기존 일정 수정
            const index = adminData.schedules.findIndex(schedule => schedule.id === Number(scheduleId));
            if (index !== -1) {
                adminData.schedules[index].date = date;
                adminData.schedules[index].title = title;
                adminData.schedules[index].location = location;
            }
        } else {
            // 새 일정 추가
            const newId = adminData.schedules.length > 0 ? Math.max(...adminData.schedules.map(s => s.id)) + 1 : 1;
            adminData.schedules.push({
                id: newId,
                date,
                title,
                location
            });
        }
        
        // 로컬 스토리지에 저장
        saveAdminData();
        
        // 폼 초기화 및 숨기기
        document.getElementById('scheduleEditForm').reset();
        document.getElementById('scheduleForm').classList.add('hidden');
        
        // 일정 목록 갱신
        loadScheduleList();
        
        alert('일정이 저장되었습니다.');
    });
    
    // 공지사항 추가 버튼 이벤트
    document.getElementById('addNewsBtn').addEventListener('click', () => {
        showNewsForm();
    });
    
    // 공지사항 추가/수정 폼 취소 버튼 이벤트
    document.getElementById('cancelNewsBtn').addEventListener('click', () => {
        document.getElementById('newsForm').classList.add('hidden');
    });
    
    // 공지사항 폼 제출 이벤트
    document.getElementById('newsEditForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const newsId = document.getElementById('newsId').value;
        const date = document.getElementById('newsDate').value;
        const title = document.getElementById('newsTitle').value;
        const content = document.getElementById('newsContent').value;
        
        if (newsId) {
            // 기존 공지사항 수정
            const index = adminData.news.findIndex(news => news.id === Number(newsId));
            if (index !== -1) {
                adminData.news[index].date = date;
                adminData.news[index].title = title;
                adminData.news[index].content = content;
            }
        } else {
            // 새 공지사항 추가
            const newId = adminData.news.length > 0 ? Math.max(...adminData.news.map(n => n.id)) + 1 : 1;
            adminData.news.push({
                id: newId,
                date,
                title,
                content
            });
        }
        
        // 로컬 스토리지에 저장
        saveAdminData();
        
        // 폼 초기화 및 숨기기
        document.getElementById('newsEditForm').reset();
        document.getElementById('newsForm').classList.add('hidden');
        
        // 공지사항 목록 갱신
        loadNewsList();
        
        alert('공지사항이 저장되었습니다.');
    });
    
    // 갤러리 사진 추가 버튼 이벤트
    document.getElementById('addGalleryBtn').addEventListener('click', () => {
        showGalleryForm();
    });
    
    // 갤러리 추가/수정 폼 취소 버튼 이벤트
    document.getElementById('cancelGalleryBtn').addEventListener('click', () => {
        document.getElementById('galleryForm').classList.add('hidden');
        document.getElementById('imagePreview').style.display = 'none';
    });
    
    // 이미지 파일 선택 시 미리보기 표시
    document.getElementById('galleryImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            const preview = document.getElementById('imagePreview');
            
            reader.onload = function(e) {
                preview.src = e.target.result;
                preview.style.display = 'block';
            }
            
            reader.readAsDataURL(file);
        }
    });
    
    // 갤러리 폼 제출 이벤트
    document.getElementById('galleryEditForm').addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 폼 데이터 가져오기
        const galleryId = document.getElementById('galleryId').value;
        const category = document.getElementById('galleryCategory').value;
        const title = document.getElementById('galleryTitle').value;
        const date = document.getElementById('galleryDate').value;
        const location = document.getElementById('galleryLocation').value;
        const imageFile = document.getElementById('galleryImage').files[0];
        
        // 이미지 파일이 선택되었는지 확인
        if (!imageFile && !galleryId) {
            alert('이미지 파일을 선택해주세요.');
            return;
        }
        
        // 이미지 파일 처리
        const processForm = (imageData) => {
            if (galleryId) {
                // 기존 갤러리 항목 수정
                const index = adminData.gallery.findIndex(item => item.id === Number(galleryId));
                if (index !== -1) {
                    adminData.gallery[index].category = category;
                    adminData.gallery[index].title = title;
                    adminData.gallery[index].date = date;
                    adminData.gallery[index].location = location;
                    // 새 이미지가 선택된 경우에만 이미지 데이터 업데이트
                    if (imageData) {
                        adminData.gallery[index].imageData = imageData;
                    }
                }
            } else {
                // 새 갤러리 항목 추가
                const newId = adminData.gallery.length > 0 ? Math.max(...adminData.gallery.map(g => g.id)) + 1 : 1;
                adminData.gallery.push({
                    id: newId,
                    category,
                    title,
                    date,
                    location,
                    imageData
                });
            }
            
            // 로컬 스토리지에 저장
            saveAdminData();
            
            // 폼 초기화 및 숨기기
            document.getElementById('galleryEditForm').reset();
            document.getElementById('galleryForm').classList.add('hidden');
            document.getElementById('imagePreview').style.display = 'none';
            
            // 갤러리 목록 갱신
            loadGalleryList();
            
            alert('갤러리 항목이 저장되었습니다.');
        };
        
        if (imageFile) {
            // 이미지 파일을 Base64로 변환
            const reader = new FileReader();
            reader.onload = function(e) {
                processForm(e.target.result);
            };
            reader.readAsDataURL(imageFile);
        } else {
            // 이미지가 변경되지 않은 경우
            processForm(null);
        }
    });
});

// 페이지 초기화 함수
function initializePage() {
    // 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    if (isLoggedIn) {
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminContent').classList.remove('hidden');
        loadAdminData();
    }
}

// 관리자 데이터 로드 함수
function loadAdminData() {
    // 동아리 소개 로드
    document.getElementById('clubIntro').value = adminData.about.intro;
    document.getElementById('clubGoals').value = adminData.about.goals.join('\n');
    document.getElementById('clubActivities').value = adminData.about.activities.join('\n');
    
    // 연락처 정보 로드
    document.getElementById('clubEmail').value = adminData.contact.email;
    document.getElementById('clubPhone').value = adminData.contact.phone;
    document.getElementById('clubSocial').value = adminData.contact.social;
    document.getElementById('clubAddress').value = adminData.contact.location;
    
    // 일정 목록 로드
    loadScheduleList();
    
    // 공지사항 목록 로드
    loadNewsList();
    
    // 갤러리 목록 로드
    loadGalleryList();
}

// 일정 목록 로드 함수
function loadScheduleList() {
    const scheduleList = document.getElementById('scheduleList');
    scheduleList.innerHTML = '';
    
    // 날짜순으로 정렬
    const sortedSchedules = [...adminData.schedules].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedSchedules.forEach(schedule => {
        const row = document.createElement('tr');
        
        // 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
        const formattedDate = formatDate(schedule.date);
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${schedule.title}</td>
            <td>${schedule.location}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editSchedule(${schedule.id})">수정</button>
                <button class="btn cancel-btn btn-sm" onclick="deleteSchedule(${schedule.id})">삭제</button>
            </td>
        `;
        
        scheduleList.appendChild(row);
    });
}

// 공지사항 목록 로드 함수
function loadNewsList() {
    const newsList = document.getElementById('newsList');
    newsList.innerHTML = '';
    
    // 날짜순으로 정렬 (최신순)
    const sortedNews = [...adminData.news].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedNews.forEach(news => {
        const row = document.createElement('tr');
        
        // 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
        const formattedDate = formatDate(news.date);
        
        row.innerHTML = `
            <td>${formattedDate}</td>
            <td>${news.title}</td>
            <td>
                <button class="btn btn-secondary btn-sm" onclick="editNews(${news.id})">수정</button>
                <button class="btn cancel-btn btn-sm" onclick="deleteNews(${news.id})">삭제</button>
            </td>
        `;
        
        newsList.appendChild(row);
    });
}

// 갤러리 목록 로드 함수
function loadGalleryList() {
    const galleryList = document.getElementById('galleryList');
    galleryList.innerHTML = '';
    
    // 날짜순으로 정렬 (최신순)
    const sortedGallery = [...adminData.gallery].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    sortedGallery.forEach(item => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-preview-container';
        
        // 날짜 포맷팅 (YYYY-MM-DD -> YYYY.MM.DD)
        const formattedDate = formatDate(item.date);
        
        galleryItem.innerHTML = `
            <img src="${item.imageData}" class="gallery-preview" alt="${item.title}">
            <div class="delete-btn" onclick="deleteGallery(${item.id})">×</div>
            <div>${item.title}</div>
            <div>${formattedDate} | ${item.location}</div>
            <button class="btn btn-secondary btn-sm mt-1" onclick="editGallery(${item.id})">수정</button>
        `;
        
        galleryList.appendChild(galleryItem);
    });
}

// 일정 수정 함수
function editSchedule(id) {
    const schedule = adminData.schedules.find(s => s.id === id);
    if (schedule) {
        document.getElementById('scheduleId').value = schedule.id;
        document.getElementById('scheduleDate').value = schedule.date;
        document.getElementById('scheduleTitle').value = schedule.title;
        document.getElementById('scheduleLocation').value = schedule.location;
        
        document.getElementById('scheduleFormTitle').textContent = '일정 수정';
        document.getElementById('scheduleForm').classList.remove('hidden');
    }
}

// 일정 추가 폼 표시 함수
function showScheduleForm() {
    document.getElementById('scheduleId').value = '';
    document.getElementById('scheduleEditForm').reset();
    document.getElementById('scheduleFormTitle').textContent = '일정 추가';
    document.getElementById('scheduleForm').classList.remove('hidden');
}

// 일정 삭제 함수
function deleteSchedule(id) {
    if (confirm('이 일정을 삭제하시겠습니까?')) {
        adminData.schedules = adminData.schedules.filter(schedule => schedule.id !== id);
        saveAdminData();
        loadScheduleList();
    }
}

// 공지사항 수정 함수
function editNews(id) {
    const news = adminData.news.find(n => n.id === id);
    if (news) {
        document.getElementById('newsId').value = news.id;
        document.getElementById('newsDate').value = news.date;
        document.getElementById('newsTitle').value = news.title;
        document.getElementById('newsContent').value = news.content;
        
        document.getElementById('newsFormTitle').textContent = '공지사항 수정';
        document.getElementById('newsForm').classList.remove('hidden');
    }
}

// 공지사항 추가 폼 표시 함수
function showNewsForm() {
    document.getElementById('newsId').value = '';
    document.getElementById('newsEditForm').reset();
    document.getElementById('newsFormTitle').textContent = '공지사항 추가';
    document.getElementById('newsForm').classList.remove('hidden');
}

// 공지사항 삭제 함수
function deleteNews(id) {
    if (confirm('이 공지사항을 삭제하시겠습니까?')) {
        adminData.news = adminData.news.filter(news => news.id !== id);
        saveAdminData();
        loadNewsList();
    }
}

// 갤러리 수정 함수
function editGallery(id) {
    const gallery = adminData.gallery.find(g => g.id === id);
    if (gallery) {
        document.getElementById('galleryId').value = gallery.id;
        document.getElementById('galleryCategory').value = gallery.category;
        document.getElementById('galleryTitle').value = gallery.title;
        document.getElementById('galleryDate').value = gallery.date;
        document.getElementById('galleryLocation').value = gallery.location;
        
        // 미리보기 이미지 표시
        const preview = document.getElementById('imagePreview');
        preview.src = gallery.imageData;
        preview.style.display = 'block';
        
        document.getElementById('galleryFormTitle').textContent = '사진 수정';
        document.getElementById('galleryForm').classList.remove('hidden');
    }
}

// 갤러리 추가 폼 표시 함수
function showGalleryForm() {
    document.getElementById('galleryId').value = '';
    document.getElementById('galleryEditForm').reset();
    document.getElementById('imagePreview').style.display = 'none';
    document.getElementById('galleryFormTitle').textContent = '사진 추가';
    document.getElementById('galleryForm').classList.remove('hidden');
}

// 갤러리 삭제 함수
function deleteGallery(id) {
    if (confirm('이 사진을 삭제하시겠습니까?')) {
        adminData.gallery = adminData.gallery.filter(gallery => gallery.id !== id);
        saveAdminData();
        loadGalleryList();
    }
}

// 관리자 데이터 저장 함수
function saveAdminData() {
    localStorage.setItem('adminData', JSON.stringify(adminData));
    updateWebContent();
}

// 웹 컨텐츠 업데이트 함수 (페이지 간 동기화)
function updateWebContent() {
    // 이 함수는 localStorage에 저장된 데이터를 기반으로
    // 다른 페이지에서 데이터를 불러와 표시하는 데 사용됩니다.
    // 페이지 간 이동 시 localStorage 데이터가 자동으로 읽혀집니다.
}

// 날짜 포맷팅 함수 (YYYY-MM-DD -> YYYY.MM.DD)
function formatDate(dateStr) {
    if (!dateStr) return '';
    const dateParts = dateStr.split('-');
    return `${dateParts[0]}.${dateParts[1]}.${dateParts[2]}`;
} 