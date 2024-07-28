

const greetThankyou = document.querySelector(".greetThankyou");
const subscribeBtn = document.querySelector(".subscribe");
subscribeBtn.addEventListener("click", greetingFunc)

function greetingFunc(){
  setTimeout(() => {
    greetThankyou.style.display = "block";
  },500);
  setTimeout(()=>{
    greetThankyou.style.display = "none";
  },3000);
}