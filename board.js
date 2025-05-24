// 게시글 데이터를 저장할 배열
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let currentPostId = parseInt(localStorage.getItem('currentPostId')) || 1;

// DOM 요소들
const boardListEl = document.getElementById('boardList');
const writeBtn = document.getElementById('writeBtn');
const writeFormEl = document.getElementById('writeForm');
const postFormEl = document.getElementById('postForm');
const cancelBtn = document.getElementById('cancelBtn');
const postViewEl = document.getElementById('postView');
const viewTitleEl = document.getElementById('viewTitle');
const viewAuthorEl = document.getElementById('viewAuthor');
const viewDateEl = document.getElementById('viewDate');
const viewContentEl = document.getElementById('viewContent');
const editBtnEl = document.getElementById('editBtn');
const deleteBtnEl = document.getElementById('deleteBtn');
const listBtnEl = document.getElementById('listBtn');
const editFormEl = document.getElementById('editForm');
const editPostFormEl = document.getElementById('editPostForm');
const editIdEl = document.getElementById('editId');
const editTitleEl = document.getElementById('editTitle');
const editAuthorEl = document.getElementById('editAuthor');
const editContentEl = document.getElementById('editContent');
const editCancelBtnEl = document.getElementById('editCancelBtn');
const boardSectionEl = document.querySelector('.board-section');

// 초기 화면 로드
window.addEventListener('DOMContentLoaded', () => {
    displayPosts();
    console.log("게시판 초기화 완료");
});

// 게시글 목록 표시 함수
function displayPosts() {
    // 게시판 목록 초기화
    boardListEl.innerHTML = '';
    
    // 게시글이 없는 경우
    if (posts.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4" style="text-align: center;">등록된 게시글이 없습니다.</td>';
        boardListEl.appendChild(row);
        return;
    }
    
    // posts 배열을 역순으로 복사하여 최신글이 위에 오도록 정렬
    const reversedPosts = [...posts].reverse();
    
    // 각 게시글을 테이블에 추가
    reversedPosts.forEach(post => {
        const row = document.createElement('tr');
        row.dataset.id = post.id;
        
        const dateObj = new Date(post.date);
        const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
        
        row.innerHTML = `
            <td>${post.id}</td>
            <td>${post.title}</td>
            <td>${post.author}</td>
            <td>${formattedDate}</td>
        `;
        
        row.addEventListener('click', () => {
            viewPost(post.id);
        });
        
        boardListEl.appendChild(row);
    });
    
    // 게시판 섹션 표시
    boardSectionEl.classList.remove('hidden');
}

// 게시글 작성 버튼 클릭 이벤트
writeBtn.addEventListener('click', () => {
    writeFormEl.classList.remove('hidden');
    postViewEl.classList.add('hidden');
    editFormEl.classList.add('hidden');
    boardSectionEl.classList.add('hidden');
});

// 게시글 작성 취소 버튼 이벤트
cancelBtn.addEventListener('click', () => {
    writeFormEl.classList.add('hidden');
    boardSectionEl.classList.remove('hidden');
    postFormEl.reset();
});

// 게시글 등록 이벤트
postFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    
    // 새 게시글 객체 생성
    const post = {
        id: currentPostId++,
        title,
        author,
        content,
        date: new Date().toISOString()
    };
    
    // 게시글 배열에 추가
    posts.push(post);
    
    // 로컬 스토리지에 저장
    saveData();
    
    // 폼 리셋 및 숨기기
    postFormEl.reset();
    writeFormEl.classList.add('hidden');
    
    // 게시글 목록 업데이트
    displayPosts();
    
    // 방금 작성한 게시글 보기
    viewPost(post.id);
});

// 게시글 상세 보기 함수
function viewPost(id) {
    console.log("상세보기 호출:", id);
    
    // id에 해당하는 게시글 찾기
    const post = posts.find(post => post.id === Number(id));
    
    if (!post) {
        alert('존재하지 않는 게시글입니다.');
        return;
    }
    
    // 게시글 정보 표시
    viewTitleEl.textContent = post.title;
    viewAuthorEl.textContent = `작성자: ${post.author}`;
    
    const dateObj = new Date(post.date);
    const formattedDate = `${dateObj.getFullYear()}-${(dateObj.getMonth()+1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    viewDateEl.textContent = `작성일: ${formattedDate}`;
    
    // 줄바꿈을 HTML <br>로 변환하여 표시
    viewContentEl.innerHTML = post.content.replace(/\n/g, '<br>');
    
    // 게시판 목록 숨기기
    boardSectionEl.classList.add('hidden');
    
    // 게시글 보기 화면 표시
    writeFormEl.classList.add('hidden');
    editFormEl.classList.add('hidden');
    postViewEl.classList.remove('hidden');
    
    // 수정 버튼에 이벤트 리스너 설정
    editBtnEl.onclick = () => {
        showEditForm(post.id);
    };
    
    // 삭제 버튼에 이벤트 리스너 설정
    deleteBtnEl.onclick = () => {
        deletePost(post.id);
    };
    
    // 목록 버튼 이벤트 다시 연결
    listBtnEl.onclick = () => {
        postViewEl.classList.add('hidden');
        boardSectionEl.classList.remove('hidden');
    };
}

// 게시글 수정 폼 표시 함수
function showEditForm(id) {
    console.log("수정 폼 표시 함수 호출됨, ID:", id);
    
    // id에 해당하는 게시글 찾기
    const post = posts.find(post => post.id === Number(id));
    
    if (!post) {
        alert('존재하지 않는 게시글입니다.');
        return;
    }
    
    // 수정 폼에 데이터 설정
    editIdEl.value = post.id;
    editTitleEl.value = post.title;
    editAuthorEl.value = post.author;
    editContentEl.value = post.content;
    
    // 수정 폼 표시
    writeFormEl.classList.add('hidden');
    postViewEl.classList.add('hidden');
    boardSectionEl.classList.add('hidden');
    editFormEl.classList.remove('hidden');
}

// 게시글 수정 취소 버튼 이벤트
editCancelBtnEl.addEventListener('click', () => {
    editFormEl.classList.add('hidden');
    postViewEl.classList.remove('hidden');
});

// 게시글 수정 이벤트
editPostFormEl.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 가져오기
    const id = parseInt(editIdEl.value);
    const title = editTitleEl.value;
    const content = editContentEl.value;
    
    // 게시글 찾기 및 업데이트
    const postIndex = posts.findIndex(post => post.id === id);
    
    if (postIndex === -1) {
        alert('존재하지 않는 게시글입니다.');
        return;
    }
    
    // 게시글 수정
    posts[postIndex].title = title;
    posts[postIndex].content = content;
    posts[postIndex].date = new Date().toISOString(); // 수정일로 업데이트
    
    // 로컬 스토리지에 저장
    saveData();
    
    // 수정된 게시글 보기
    editFormEl.classList.add('hidden');
    
    // 게시글 목록 업데이트
    displayPosts();
    
    // 수정된 게시글 보기
    viewPost(id);
});

// 게시글 삭제 함수
function deletePost(id) {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
        return;
    }
    
    // 게시글 찾기 및 삭제
    const postIndex = posts.findIndex(post => post.id === Number(id));
    
    if (postIndex === -1) {
        alert('존재하지 않는 게시글입니다.');
        return;
    }
    
    // 게시글 삭제
    posts.splice(postIndex, 1);
    
    // 로컬 스토리지에 저장
    saveData();
    
    // 게시글 목록 화면으로 이동
    postViewEl.classList.add('hidden');
    editFormEl.classList.add('hidden');
    boardSectionEl.classList.remove('hidden');
    
    // 게시글 목록 업데이트
    displayPosts();
}

// 로컬 스토리지에 데이터 저장 함수
function saveData() {
    localStorage.setItem('posts', JSON.stringify(posts));
    localStorage.setItem('currentPostId', currentPostId.toString());
    console.log("데이터 저장 완료:", posts);
} 