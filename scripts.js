document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const commentForm = document.getElementById('comment-form');
    const commentList = document.getElementById('comment-list');
    const commentCount = document.getElementById('comment-count');
    const userProfile = document.getElementById('userProfile');
    const profilePhoto = document.getElementById('profilePhoto');

    // Kullanıcı kaydı işlemi
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Kullanıcı bilgilerini localStorage'a kaydet
            const users = JSON.parse(localStorage.getItem('users')) || [];
            users.push({ username, email, password });
            localStorage.setItem('users', JSON.stringify(users));

            alert('Kayıt başarılı! Hesabınıza giriş yapabilirsiniz.');
            window.location.href = 'login.html';
        });
    }

    // Kullanıcı girişi işlemi
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kullanıcı bilgilerini doğrulama
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === password);

            if (user) {
                // Profil fotoğrafı oluşturma
                const profileImages = [
                    'https://randomuser.me/api/portraits/lego/1.jpg',
                    'https://randomuser.me/api/portraits/lego/2.jpg',
                    'https://randomuser.me/api/portraits/lego/3.jpg',
                    'https://randomuser.me/api/portraits/lego/4.jpg',
                    'https://randomuser.me/api/portraits/lego/5.jpg'
                ];

                const randomIndex = Math.floor(Math.random() * profileImages.length);
                user.profilePhoto = profileImages[randomIndex]; // Kullanıcıya rastgele bir profil fotoğrafı ata

                localStorage.setItem('loggedInUser', JSON.stringify(user));
                alert('Giriş başarılı!');
                window.location.href = 'index.html';
            } else {
                alert('Kullanıcı adı veya şifre yanlış! Hesabınız yoksa kayıt olabilirsiniz.');
                window.location.href = 'register.html';
            }
        });
    }

    // Ürün satın alma işlemi
    window.purchaseProduct = function(productName, productPrice) {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

        if (!loggedInUser) {
            alert('Lütfen satın alma işlemi için giriş yapın!');
            window.location.href = 'login.html';
            return;
        }

        alert(`${productName} ürününü $${productPrice} karşılığında satın aldınız!`);
    }

    // Yorum yapma işlemi
    if (commentForm) {
        commentForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

            if (!loggedInUser) {
                alert('Yorum yapabilmek için giriş yapmalısınız!');
                window.location.href = 'login.html';
                return;
            }

            const username = loggedInUser.username; // Yorum yapan kullanıcının adını almak
            const rating = document.querySelector('input[name="rating"]:checked');
            const comment = document.getElementById('comment').value;

            if (rating) {
                const ratingValue = rating.value;

                const commentItem = document.createElement('div');
                commentItem.classList.add('comment-item');

                commentItem.innerHTML = `
                    <p class="username">${username}</p>
                    <p class="rating">${'☆'.repeat(ratingValue)}</p>
                    <p>${comment}</p>
                `;

                commentList.appendChild(commentItem);

                commentCount.textContent = `${parseInt(commentCount.textContent) + 1} yorum`;

                commentForm.reset();
            }
        });
    }

    // Profil fotoğrafını ayarlama ve gösterme
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
        profilePhoto.src = loggedInUser.profilePhoto; // Kullanıcının profil fotoğrafını ayarla
        userProfile.style.display = 'block'; // Kullanıcı profili görünür yap

        // Profil fotoğrafına tıklama etkinliği
        profilePhoto.addEventListener('click', () => {
            const profileMenu = document.getElementById('profileMenu');
            profileMenu.style.display = (profileMenu.style.display === 'none' || profileMenu.style.display === '') ? 'block' : 'none';
        });

        // Menü dışında bir yere tıklanırsa menüyü kapatma
        document.addEventListener('click', (event) => {
            const profileMenu = document.getElementById('profileMenu');
            if (!userProfile.contains(event.target)) {
                profileMenu.style.display = 'none';
            }
        });
    } else {
        // Giriş yapmamış kullanıcı için varsayılan profil fotoğrafı
        profilePhoto.src = 'file:///C:/Users/ACER/Desktop/Emojis/s8icSRfU_400x400.jpg';
        userProfile.style.display = 'block'; // Kullanıcı profili görünür yap

        // Profil fotoğrafına tıklama etkinliği
        profilePhoto.addEventListener('click', () => {
            const profileMenu = document.getElementById('profileMenu');
            profileMenu.innerHTML = `
                <ul>
                    <li onclick="window.location.href='register.html'">Hesap Oluştur</li>
                    <li onclick="window.location.href='login.html'">Giriş Yap</li>
                </ul>
            `;
            profileMenu.style.display = 'block'; // Menü görünür yap
        });
    }

    // Profil görüntüleme fonksiyonu
    window.viewProfile = function() {
        alert('Profil sayfası burada açılacak!'); // Burada profil sayfasına yönlendirme yapabilirsiniz
    }

    // Çıkış yapma fonksiyonu
    window.logout = function() {
        localStorage.removeItem('loggedInUser');
        alert('Çıkış yaptınız.');
        window.location.href = 'login.html'; // Giriş sayfasına yönlendirme
    }

    // Bot B ürününü gizleme işlemi
    var botBElement = document.querySelector('.product-item:nth-child(2)');
    if (botBElement) {
        botBElement.style.display = 'none';
    }
});
function filterProducts() {
    const selectedCategory = document.getElementById('botCategory').value;
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        if (selectedCategory === 'all' || item.getAttribute('data-category') === selectedCategory) {
            item.style.display = 'block'; // Seçilen kategoriye uygun ürünleri göster
        } else {
            item.style.display = 'none'; // Seçilmeyen ürünleri gizle
        }
    });
}

