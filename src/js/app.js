import '../css/style.css';
import '../css/reset.css';
import { users } from './data';
import { questions } from './data';


const nav = document.getElementById('nav')
const a_login = document.getElementById('a_login')
const div_de_connection = document.getElementById('div_de_connection')
const img_login = document.getElementById('img_login')
const p_login = document.getElementById('p_login')

function css_deflt(){
    div_de_connection.style.width = "10%"
    nav.style.gap = '40%'
    a_login.textContent = 'se connecter'
    p_login.style.display = 'none'
    img_login.style.display = 'none'
} css_deflt()
function css_add(){
    img_login.style.display = 'block'
    div_de_connection.style.width = "25%"
    nav.style.gap = '20%'
    p_login.style.display = 'block'
}



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
            const unanswered_span = document.getElementById('unanswered_span')
            const answered_span = document.getElementById('answered_span')

            let cont_unan = 0
            let cont_ans = 0

            function unanswered(){
                questions_unan.style.borderTop = ' 2px solid #c0baba '
                questions_unan.style.borderLeft = ' 2px solid #c0baba '
                questions_unan.style.borderRight = ' 2px solid #c0baba '
                questions_unan.style.borderBottom = ' 5px solid white '
                questions_ans.style.border = 'none'


                questions_rep.innerHTML = ``
                for(const prop in questions){
                   cont_unan ++
                    let author = questions[prop].author
                    console.log(author); 
                    switch (author){
                        case 'sarahedo':
                        questions_rep.innerHTML += `
                            <article id="articles_cards">
                            <div>
                                <img src="${users.sarahedo.avatarURL}" alt = "image de ${users.sarahedo.name}">
                                <h2>${users.sarahedo.name}</h2>
                                <p>would you rather? ${questions[prop].optionOne.text}</p>
                            </div>
                            <button type="submit">Voir le sondage</button>
                        </article>
                        `
                        break
                        case 'tylermcginnis':
                            questions_rep.innerHTML += `
                                <article id="articles_cards">
                                <div>
                                    <img src="${users.tylermcginnis.avatarURL}" alt ="image de ${users.tylermcginnis.name}">
                                    <h2>${users.tylermcginnis.name}</h2>
                                    <p>would you rather? ${questions[prop].optionOne.text}</p>
                                </div>
                                <button type="submit">Voir le sondage</button>
                            </article>
                            `
                            break
                            case 'johndoe':
                                questions_rep.innerHTML += `
                                    <article id="articles_cards">
                                    <div>
                                        <img src="${users.johndoe.avatarURL}" alt ="image de ${users.johndoe.name}">
                                        <h2>${users.johndoe.name}</h2>
                                        <p>would you rather? ${questions[prop].optionOne.text}</p>
                                    </div>
                                    <button type="submit">Voir le sondage</button>
                                </article>
                                `
                                break
                    }
                }
            }unanswered()
            function answered(){
                questions_rep.innerHTML = 'pas de questions'
                questions_unan.style.border = 'none'
                questions_ans.style.borderTop = ' 2px solid #c0baba '
                questions_ans.style.borderLeft = ' 2px solid #c0baba '
                questions_ans.style.borderRight = ' 2px solid #c0baba '
                questions_ans.style.borderBottom = ' 5px solid white '
                
            }
           
            questions_unan.addEventListener('click',()=>{
                unanswered()
            })  
            questions_ans.addEventListener('click',()=>{
                answered()
            })

             
            
            unanswered_span.textContent = cont_unan
            answered_span.textContent = cont_ans
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
                <img src="/assets/img/message-solid.svg" alt="image message">
                <p>Se connecter à votre compte</p>
            </div>
            <div class="champ_sel">
                <select id="select"> 
                </select>
                <p>Sélectionnez un utilisateur ci-dessus et cliquez sur le bouton de connexion. Il s'agit d'une application de démonstration qui ne nécessite pas de mot de passe.</p>
                <button id="button_login">Se connecter</button>
            </div>
        </div>`
        
let name_option = ""

const select = document.getElementById('select')
select.innerHTML = `<option>Sélectionner un Utilisateur</option>`
                    for( let prop in users ){
                        console.log(users[prop].id);
                        select.innerHTML += `
                            <option id="${users[prop].id}">${users[prop].name} </option>`
                    }       
                
const button_login = document.getElementById('button_login')
const sarah = document.getElementById('sarahedo')
const tyler = document.getElementById('tylermcginnis')
const john = document.getElementById('johndoe')

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


console.log(a_login);
button_login.addEventListener('click',()=>{
    nav.style.display = 'flex'
    a_login.textContent = 'se deconnecter'
    app.innerHTML = ``
    let test = name_option 

    switch (test) {
        case "sarah":
            console.log("sarah");
            p_login.innerHTML = `Bonjour, ${users.sarahedo.name}`
            img_login.setAttribute("src", "https://tylermcginnis.com/would-you-rather/sarah.jpg")
            img_login.setAttribute("alt","image de sarah")
            css_add()
            break;
        case "tyler":
            console.log("tyler");
            p_login.innerHTML = `Bonjour, ${users.tylermcginnis.name}`
            img_login.setAttribute("src", "https://tylermcginnis.com/would-you-rather/tyler.jpg")
            img_login.setAttribute("alt","image de tyler")
            css_add()
            break;
        case "john":
            console.log("john");
            p_login.innerHTML = `Bonjour, ${users.johndoe.name}`
            img_login.setAttribute("src", "https://tylermcginnis.com/would-you-rather/tyler.jpg")
            img_login.setAttribute("alt","image de john")
            css_add()
            break;
        default:
            console.log("personne");
            a_login.textContent = 'se connecter'
            css_deflt()
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


