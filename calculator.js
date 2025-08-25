// let string = "";
// let buttons = document.querySelectorAll('.btn')

// Array.from(buttons).forEach((btn) => {
//     document.addEventListener('click', (e) => {
//         // if(e.target.innerHTML == '='){
//         //     string = eval(strind);
//         //     document.querySelector('input').value = string;
//         // } else if(e.target.innerHTML == 'CL'){
//         //     string = "";
//         //     document.querySelector('input').value = string;
//         // } else {
//             console.log(e.target);
//             string = string + e.target.innerHTML;
//             document.querySelector('input').value = string;
//     })
// })

let string = "";
let buttons = document.querySelectorAll('.btn');

Array.from(buttons).forEach((btn) => {
    btn.addEventListener('click',(e)=>{
        if(e.target.innerHTML == "="){
            string = eval(string);
            document.querySelector('input').value = string;
        } else if(e.target.innerHTML == "CL"){
            string = "";
            document.querySelector('input').value = string;
        } else {
            console.log(e.target)
            string = string + e.target.innerHTML;
            document.querySelector('input').value = string;
        }
    })
})