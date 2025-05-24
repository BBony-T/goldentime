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
    ]
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
            const index = adminData.schedules.findIndex(s => s.id === parseInt(scheduleId));
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
        
        // 일정 목록 업데이트
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
            const index = adminData.news.findIndex(n => n.id === parseInt(newsId));
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
        
        // 공지사항 목록 업데이트
        loadNewsList();
        
        alert('공지사항이 저장되었습니다.');
    });
});

// 페이지 초기화 함수
function initializePage() {
    // 세션 스토리지에서 로그인 상태 확인
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn');
    
    if (isLoggedIn) {
        // 로그인 상태면 관리자 콘텐츠 표시
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('adminContent').classList.remove('hidden');
        
        // 데이터 로드
        loadAdminData();
    }
}

// 관리자 데이터 로드 함수
function loadAdminData() {
    // 동아리 소개 데이터 로드
    document.getElementById('clubIntro').value = adminData.about.intro;
    document.getElementById('clubGoals').value = adminData.about.goals.join('\n');
    document.getElementById('clubActivities').value = adminData.about.activities.join('\n');
    
    // 연락처 정보 데이터 로드
    document.getElementById('clubEmail').value = adminData.contact.email;
    document.getElementById('clubPhone').value = adminData.contact.phone;
    document.getElementById('clubSocial').value = adminData.contact.social;
    document.getElementById('clubAddress').value = adminData.contact.location;
    
    // 일정 및 공지사항 로드
    loadScheduleList();
    loadNewsList();
    
    // 로그인 상태 저장
    sessionStorage.setItem('adminLoggedIn', 'true');
}

// 일정 목록 로드 함수
function loadScheduleList() {
    const scheduleListEl = document.getElementById('scheduleList');
    scheduleListEl.innerHTML = '';
    
    // 날짜 기준 정렬
    const sortedSchedules = [...adminData.schedules].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // 일정 항목 추가
    sortedSchedules.forEach(schedule => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(schedule.date)}</td>
            <td>${schedule.title}</td>
            <td>${schedule.location}</td>
            <td>
                <button class="btn btn-secondary edit-schedule" data-id="${schedule.id}">수정</button>
                <button class="btn cancel-btn delete-schedule" data-id="${schedule.id}">삭제</button>
            </td>
        `;
        
        scheduleListEl.appendChild(row);
    });
    
    // 일정 수정 버튼 이벤트
    document.querySelectorAll('.edit-schedule').forEach(btn => {
        btn.addEventListener('click', () => {
            const scheduleId = btn.getAttribute('data-id');
            editSchedule(parseInt(scheduleId));
        });
    });
    
    // 일정 삭제 버튼 이벤트
    document.querySelectorAll('.delete-schedule').forEach(btn => {
        btn.addEventListener('click', () => {
            const scheduleId = btn.getAttribute('data-id');
            deleteSchedule(parseInt(scheduleId));
        });
    });
}

// 공지사항 목록 로드 함수
function loadNewsList() {
    const newsListEl = document.getElementById('newsList');
    newsListEl.innerHTML = '';
    
    // 날짜 기준 정렬 (최신순)
    const sortedNews = [...adminData.news].sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 공지사항 항목 추가
    sortedNews.forEach(news => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${formatDate(news.date)}</td>
            <td>${news.title}</td>
            <td>
                <button class="btn btn-secondary edit-news" data-id="${news.id}">수정</button>
                <button class="btn cancel-btn delete-news" data-id="${news.id}">삭제</button>
            </td>
        `;
        
        newsListEl.appendChild(row);
    });
    
    // 공지사항 수정 버튼 이벤트
    document.querySelectorAll('.edit-news').forEach(btn => {
        btn.addEventListener('click', () => {
            const newsId = btn.getAttribute('data-id');
            editNews(parseInt(newsId));
        });
    });
    
    // 공지사항 삭제 버튼 이벤트
    document.querySelectorAll('.delete-news').forEach(btn => {
        btn.addEventListener('click', () => {
            const newsId = btn.getAttribute('data-id');
            deleteNews(parseInt(newsId));
        });
    });
}

// 일정 수정 폼 표시 함수
function editSchedule(id) {
    const schedule = adminData.schedules.find(s => s.id === id);
    if (!schedule) return;
    
    document.getElementById('scheduleFormTitle').textContent = '일정 수정';
    document.getElementById('scheduleId').value = schedule.id;
    document.getElementById('scheduleDate').value = schedule.date;
    document.getElementById('scheduleTitle').value = schedule.title;
    document.getElementById('scheduleLocation').value = schedule.location;
    
    document.getElementById('scheduleForm').classList.remove('hidden');
}

// 일정 추가 폼 표시 함수
function showScheduleForm() {
    document.getElementById('scheduleFormTitle').textContent = '일정 추가';
    document.getElementById('scheduleId').value = '';
    document.getElementById('scheduleEditForm').reset();
    
    document.getElementById('scheduleForm').classList.remove('hidden');
}

// 일정 삭제 함수
function deleteSchedule(id) {
    if (confirm('이 일정을 삭제하시겠습니까?')) {
        adminData.schedules = adminData.schedules.filter(s => s.id !== id);
        saveAdminData();
        loadScheduleList();
        alert('일정이 삭제되었습니다.');
    }
}

// 공지사항 수정 폼 표시 함수
function editNews(id) {
    const news = adminData.news.find(n => n.id === id);
    if (!news) return;
    
    document.getElementById('newsFormTitle').textContent = '공지사항 수정';
    document.getElementById('newsId').value = news.id;
    document.getElementById('newsDate').value = news.date;
    document.getElementById('newsTitle').value = news.title;
    document.getElementById('newsContent').value = news.content;
    
    document.getElementById('newsForm').classList.remove('hidden');
}

// 공지사항 추가 폼 표시 함수
function showNewsForm() {
    document.getElementById('newsFormTitle').textContent = '공지사항 추가';
    document.getElementById('newsId').value = '';
    document.getElementById('newsEditForm').reset();
    
    document.getElementById('newsForm').classList.remove('hidden');
}

// 공지사항 삭제 함수
function deleteNews(id) {
    if (confirm('이 공지사항을 삭제하시겠습니까?')) {
        adminData.news = adminData.news.filter(n => n.id !== id);
        saveAdminData();
        loadNewsList();
        alert('공지사항이 삭제되었습니다.');
    }
}

// 관리자 데이터 저장 함수
function saveAdminData() {
    localStorage.setItem('adminData', JSON.stringify(adminData));
    
    // 변경된 내용을 웹사이트에 적용 (다른 페이지에 적용하려면 페이지 새로고침 필요)
    updateWebContent();
}

// 웹사이트 콘텐츠 업데이트 함수
function updateWebContent() {
    // 이 함수는 현재 페이지의 일부 콘텐츠만 업데이트 가능
    // 다른 페이지의 내용을 업데이트하려면 해당 페이지의 로딩 시 localStorage의 데이터를 읽어야 함
    
    // 푸터 연락처 정보 업데이트 예시
    const footerContact = document.querySelector('footer p:last-child');
    if (footerContact) {
        footerContact.textContent = `문의: ${adminData.contact.email} | 전화: ${adminData.contact.phone}`;
    }
}

// 날짜 포맷팅 함수 (YYYY-MM-DD -> YYYY.MM.DD)
function formatDate(dateStr) {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[0]}.${parts[1]}.${parts[2]}`;
    }
    return dateStr;
} 