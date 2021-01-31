//Form validation using regex

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

name.addEventListener("blur", () => {
    console.log('name is blur')
    //validate name here
    let regex = /^[a-zA-Z]([0-9a-zA-Z]){2,10}$/;
    // must start with a character and must end(or must contain) with 3-10 characters
    let str = name.value;
    console.log(str, regex);
    if (regex.test(str)) {
        console.log('your name is valid');
        name.style["background-color"] = "white"; 
             
    }
    else {
        console.log('your name is not valid');
        name.style["background-color"] = "red"; 
        
       

    }
})

email.addEventListener("blur", () => {
    console.log('email is blur')
    //validate email here
    let regex = /^([_\-\.a-zA-Z0-9]+)@([_\-\.a-zA-Z0-9]+)\.([a-zA-Z]){2,7}$/;
    let str = email.value;
    console.log(str, regex);
    if (regex.test(str)) {
        console.log('your email is valid');
        email.style["background-color"] = "white"; 
      
    }
    else {
        console.log('your email is not valid');
        email.style["background-color"] = "red"; 
     
        
    }
})

phone.addEventListener("blur", () => {
    console.log('phone is blur')
    //validate phone here
    let regex = /^([0-9]){10}$/;
    let str = phone.value;
    console.log(str, regex);
    if (regex.test(str)) {
        console.log('your phone is valid');
        phone.style["background-color"] = "white"; 
       
    }
    else {
        console.log('your phone is not valid');
        phone.style["background-color"] = "red"; 
        

    }
})
