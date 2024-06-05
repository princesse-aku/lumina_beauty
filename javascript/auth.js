document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    document.querySelector('#inscription-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const userName = document.getElementById('userName').value;
        const lastName = document.getElementById('lastName').value;
        const firstName  = document.getElementById('firstName').value;
        const age  = document.getElementById('age').value;
        const genderSelect = document.getElementById('gender');
        const gender = genderSelect.options[genderSelect.selectedIndex].value;
        const password = document.getElementById('password').value;
        const contact = document.getElementById('contact').value;

        const formData = {
            userName:userName,
            lastName: lastName,
            firstName: firstName,
            age: age,
            gender: gender,
            password: password,
            contact: contact
        };

        console.log(formData);

        fetch("http://localhost:5000/gerant/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.localStorage.setItem("lastName", formData.lastName);
            if (data.success) {
                const lastName = window.localStorage.getItem("lastName"); 
                console.log(lastName);

                const notification = document.getElementById('notification');
                if (lastName) {
                    notification.innerText = `M./Mme ${lastName}, votre inscription s'est réalisée sans encombre.`;
                    notification.style.display = 'block';
                } else {
                    console.error("L'élément avec l'ID 'notification' n'a pas été trouvé dans le DOM.");
                }
                window.localStorage.removeItem("lastName");
            }else{  
                const notification = document.getElementById('notification');
                notification.innerText = `Veuillez vérifier la validité des informations entrées et éviter de vous réinscrire.`;
                notification.style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });



    document.querySelector('#connexion-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value; 

        const formData = {
            username: username,
            password: password
        };

        fetch("http://localhost:5000/gerant/connexion", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                //console.log(response.formData);
                console.log("ok");

                window.location.href = '../html/admin.html';
            } else {
                const notification = document.getElementById('notification');
                notification.innerText = `Mauvaise combinaison utilisateur ou mot de pass`;
                notification.style.display = 'block';
            }
            return response.json();
        }).then((data) => {
            console.log(data);
            window.localStorage.setItem("token", data.token);
            console.log(data.token);

        })
        .catch(error => {
            console.error("Erreur lors de l'envoi des données au serveur:", error);
        });
    });
});
