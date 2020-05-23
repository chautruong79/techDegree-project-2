//List of students as an array
const studentArr = Array.from(document.querySelectorAll('.student-item'));
const studentNameArr = Array.from(document.querySelectorAll('h3')).map(student => student.textContent);

//To hide all of the items in the list except for the ten needed to show.
const showPage = ( list, page ) => {
  list.forEach((item, i) => {
    if (!(i>=(page-1)*10 && i <= (page -1)*10 + 9))
         item.style.display = 'none';
    else
        item.style.display = 'block';
  });
}

const createDiv = (list) => {
    //Determine how many pages are needed for the list
    const numOfPages = Math.ceil(list.length/10);
    //Create new div, add li and a tags with the page number text for every page
    let newDiv = document.createElement('div');
    let newul = document.createElement('ul');
    for (let i =1; i<= numOfPages; ++i) {
        let newLi = document.createElement('li');
        let newLink = document.createElement('a');
        newLink.setAttribute('href', '#');
        newLink.textContent = i;
        newLi.appendChild(newLink);
        newul.appendChild(newLi);
    }
    newDiv.classList.add('pagination');
    newDiv.appendChild(newul);
    document.querySelector('.page').appendChild(newDiv);
};

// Add an event listener to each a tag. When they are clicked call the showPage function to display the appropriate page
const clickEvent = (list) => {
    const aArr = Array.from(document.querySelectorAll('a'));
    aArr.map( item => {
        item.addEventListener('click', event => {
            //Remove active class from all links
            aArr.map(item => item.classList.remove('active'));
            //Add the active class to the link that was just clicked. 
            event.target.classList.add('active');
            //Call the showPage function to display the appropriate page
            showPage(list, event.target.textContent);
        }
    )});
};

//To generate, append, and add functionality to the pagination buttons.
const appendPageLinks = (list ) => {
    createDiv(list);
    clickEvent(list);
};

//Add search component dynamically 
const searchComponent = () => {
    let newDiv = document.createElement('div');
    let newInput = document.createElement('input');
    let newButton = document.createElement('button');
    newDiv.className = 'student-search';
    newInput.setAttribute('placeholder','Search for students...');
    newInput.setAttribute('id','input');
    newButton.setAttribute('id','btn');
    newButton.textContent = 'Search';
    newDiv.appendChild(newInput);
    newDiv.appendChild(newButton);
    document.querySelector('h2').insertAdjacentElement("afterend", newDiv);
}

//Store the search results in an array 
const search = (text) => {
    let newArr = [];
    studentArr.forEach ((item)=> {
        let name = item.childNodes[1].childNodes[3].textContent;
        if (name.toLowerCase().includes(text.toLowerCase())) 
            newArr.push(item);
    });
    return newArr;
};

showPage(studentArr,1);
searchComponent();
appendPageLinks(studentArr);

const button = document.querySelector('#btn');

//Generate search list
const outPutSearch = () => {
    const input = document.querySelector('#input');
    let newArr = search(input.value);
    let page = document.querySelector('.page');
    studentArr.forEach((item, i) => { item.style.display = 'none'});
    page.removeChild(page.lastElementChild);
    showPage(newArr,1);
    appendPageLinks(newArr);
}

//Add eventListener to search button
button.addEventListener('click', () => {
    if (input.value.length >0) {
        outPutSearch();
        input.value = '';
    }
});

//Add a keyup event listener to the search input so that the list filters in real time as the user types
document.addEventListener('keyup', (event) => {
        outPutSearch();
});