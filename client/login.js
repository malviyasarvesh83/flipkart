const validateForm = () => {
    let email1 = document.getElementById("email1").value;
    let password = document.getElementById("password").value;

    if (email1 == "") {
      alert("Email is Required");
      return false;
    }
    if (password == "") {
      alert("Password is Required");
      return false;
    }
    return true;
}

const login = async () => {
  try {
    if (validateForm() == true) {
      let email1 = document.getElementById("email1").value;
      let password = document.getElementById("password").value;
      let response = await axios.post("http://localhost:7000/user/login", {
        email1: email1,
        password: password,
      });
      console.log(response);
      document.getElementById("email1").value = "";
      document.getElementById("password").value = "";
      alert(response.data.message);
      localStorage.setItem("token", response.data.token);
      location.href='homepage.html';
    }
  } catch (error) {
    alert(error.response.data.error);
  }
};