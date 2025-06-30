export function nav(){
    const hamButton = document.querySelector("#hambutton");
    const navigation = document.querySelector("#banner");
    const closeButton = document.querySelector("#closeBanner")
    const overlay = document.getElementById('overlay');

    hamButton.addEventListener("click", ()=>{
        navigation.classList.toggle('closed');
        hamButton.classList.toggle('closed');
        overlay.classList.add('visible')
    });
    closeButton.addEventListener("click", ()=>{
        navigation.classList.toggle('closed');
        overlay.classList.remove('visible');
    })
    overlay.addEventListener('click', () => {
        navigation.classList.toggle('closed');
        hamButton.classList.toggle('closed');
        overlay.classList.remove('visible');
        });
    const welcome =document.querySelector("#welcome");
    const name = localStorage.getItem("fname");
    if (name){
        welcome.innerHTML=`Welcome, ${name.toLocaleUpperCase()}!`;
    } else{
        welcome.innerHTML = "Welcome!"
    }
}