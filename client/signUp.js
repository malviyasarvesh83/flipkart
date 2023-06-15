const validateForm = () => {
    let Fname = document.getElementById('Fname').value;
    let Lname = document.getElementById('Lname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address1 = document.getElementById('address1').value;
    let address2 = document.getElementById('address2').value;
    let password1 = document.getElementById('password1').value;
    let password2 = document.getElementById('password2').value;

    if (Fname == '') {
        alert('First Name is Required..!');
        return false;
    }
    if (Lname == '') {
        alert('Last Name is Required..!');
        return false;
    }
    if (email == '') {
        alert('Email Address is Required..!');
        return false;
    }
    if (phone == '') {
        alert('Phone Number is Required..!');
        return false;
    }
    if (address1 == '') {
        alert('Address Line 1 is Required..!');
        return false;
    }
    if (address2 == '') {
        alert('Address Line 2 is Required..!');
        return false;
    }
    if (password1 == '') {
        alert('Password is Required..!');
        return false;
    }
    if (password2 == '') {
        alert('Password is Required..!');
        return false;
    }
    if (password1 != password2) {
        alert('Both Password did not Matched');
        return false;
    }
    return true;
}

const signUp = async () => {
    try {
        if (validateForm() == true) {
            let Fname = document.getElementById("Fname").value;
            let Lname = document.getElementById("Lname").value;
            let email = document.getElementById("email").value;
            let phone = document.getElementById("phone").value;
            let address1 = document.getElementById("address1").value;
            let address2 = document.getElementById("address2").value;
            let password1 = document.getElementById("password1").value;
            let password2 = document.getElementById("password2").value;

            let response = await axios.post(
              "http://localhost:7000/user/signup", {
                firstName:Fname,
                lastName:Lname,
                email:email,
                phone:phone,
                address1:address1,
                address2:address2,
                password1:password1,
                password2: password2,
              }
            );
            alert(response.data.message);
            
            document.getElementById("Fname").value = '';
            document.getElementById("Lname").value = '';
            document.getElementById("email").value = '';
            document.getElementById("phone").value = '';
            document.getElementById("address1").value = '';
            document.getElementById("address2").value = '';
            document.getElementById("password1").value = '';
            document.getElementById("password2").value = '';
            location.href = 'login.html';
        }
    } catch (error) {
        alert(error.response.data.error);
    }
}