//List of students as an array
const studentArr = Array.from(document.querySelectorAll('.student-item'));

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
const appendPageLinks = ( list ) => {
    createDiv(list);
    clickEvent(list);
};

showPage(studentArr,1);
appendPageLinks(studentArr);
