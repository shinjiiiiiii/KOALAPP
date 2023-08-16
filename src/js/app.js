import '../css/style.css';
import '../css/reset.css';
import { users } from './data';

const nav = document.getElementById('nav')

const routes = {
    menu : '/',
    questions : '/add',
    board: '/tableaudebord',
    login: '/login'
}
const app = document.getElementById('app')

function handleLinks() {
    const links = document.querySelectorAll('a.liens')
    links.forEach(link =>{
        link.addEventListener('click', (e) =>{
            e.preventDefault()
            window.history.pushState({}, '', e.target.href)
            router()
        })
    })
}

async function router (){
    console.log(location.pathname);
    switch (location.pathname) {
        case routes.menu:
            app.innerHTML = await (await fetch('./src/html/menu.html')).text()
            const questions_unan = document.getElementById('questions_unan')
            const questions_ans = document.getElementById('questions_ans')
            const questions_rep = document.getElementById('questions_rep')

            function cardslinks() {
                const links = document.querySelectorAll('p#questions_unan')
                links.forEach(link =>{
                    link.addEventListener('click', (e) =>{
                        e.preventDefault()
                        window.history.pushState({}, '', e.target.href)
                        linkcards()
                    })
                })
            }
            async function linkcards(){
                questions_rep.innerHTML = await (await fetch('./src/html/unanswered.html')).text()
            }
            cardslinks()
    

            function cardslinks2() {
                const links = document.querySelectorAll('p#questions_ans')
                links.forEach(link =>{
                    link.addEventListener('click', (e) =>{
                        e.preventDefault()
                        window.history.pushState({}, '', e.target.href)
                        linkcards2()
                    })
                })
            }
            async function linkcards2(){
                questions_rep.innerHTML = await (await fetch('./src/html/answered.html')).text()
            }
            cardslinks2()


            break;

        case routes.questions:
            app.innerHTML = await (await fetch('./src/html/questions.html')).text()
            break;

        case routes.board:
            app.innerHTML = await (await fetch('./src/html/board.html')).text()
            break;



            ////////////////////////////////////////////////////////////



        case routes.login:
            nav.style.display = 'none'
            app.innerHTML = `   
            <div id="login">
            <div class="login_img">
                <img src="/assets/img/message-solid.svg">
                <p>Se connecter à votre compte</p>
            </div>
            <div class="champ_sel">
                <select id="select"> 
                </select>
                <p>blablblablablallblblablablablbllablblbablablablbablablabla</p>
                <button id="button_login">Se connecter</button>
            </div>
        </div>`
        
let name_option = ""

const select = document.getElementById('select')


select.innerHTML = `<option>Sélectionner un Utilisateur</option>
                    <option id="sarah">${users.sarahedo.name} </option>
                    <option id="tyler">${users.tylermcginnis.name} </option>
                    <option id="john">${users.johndoe.name} </option>`


const button_login = document.getElementById('button_login')
const sarah = document.getElementById('sarah')
const tyler = document.getElementById('tyler')
const john = document.getElementById('john')


sarah.addEventListener('click',()=>{
    name_option = "sarah"
    console.log(name_option);
})
tyler.addEventListener('click',()=>{
    name_option = "tyler"
    console.log(name_option);
})
john.addEventListener('click',()=>{
    name_option = "john"
    console.log(name_option);
})

const p_login = document.getElementById('p_login')
button_login.addEventListener('click',()=>{
    nav.style.display = 'flex'
    app.innerHTML = ``
    let test = name_option 

    switch (test) {
        case "sarah":
            console.log("sarah");
            p_login.style.display = 'none'
            break;
        case "tyler":
            console.log("tyler");
            break;
        case "john":
            console.log("john");
            break;
        default:
            console.log("personne");
            break;
    }
   
})

console.log(select);
            break;

/////////////////////////////////////////////////////////////////////////////////////


        default:
            break;
    }
}




router()
handleLinks()


