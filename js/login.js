const tabs = document.querySelectorAll('.auth__tab');

const btn = document.querySelector('.auth__button');

const message = document.querySelector('.auth__message');

const username = document.querySelector('.username');

const password = document.querySelector('.password');

let isLogin = true;

//change mode
tabs.forEach((tab, index) => {

    tab.addEventListener('click', () => {

        tabs.forEach(item => {
            item.classList.remove(
                'auth__tab--active'
            )
        })

        tab.classList.add(
            'auth__tab--active'
        )

        isLogin = index === 0; //trả về true nếu index === 0, false ngược lại.

        btn.textContent = isLogin
                        ? 'Login' //true
                        : 'Register' //false

        message.textContent = '';
    })

})


//submit
btn.addEventListener(
    'click',
    function (e) {
        e.preventDefault();
        const user = username.value.trim();
        const pass = password.value.trim();

        if (!user || !pass) {
            message.textContent ='Điền đủ thông tin';
            return; //dừng lun, không chạy ở dưới
        }

        //REGISTER
        if (!isLogin) { //isLoigin = false/ trang register

            localStorage.setItem( //lưu auth và localstorage (setItem(key, value))
                user, //key
                pass //value
            ) //nếu tạo trùng thì đè lên, vì làm đơn giản nên v được r

            message.textContent = 'Đăng ký thành công';
            return; //dừng lun
        }

        //LOGIN
        const saved = localStorage.getItem(user);// lấy cái value của cái user, user là cái nhập trong thanh user, lấy value là cái register pass theo cái user key

        if (saved === pass) {
            message.textContent = 'Đăng nhập thành công';
            localStorage.setItem('currentUser', user); //tạo để lấy dữ liệu lên trang chủ
            window.location.href = 'index.html';
        }
        else {
            message.textContent = 'Sai tài khoản';
        }
    })