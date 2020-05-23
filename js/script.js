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

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = ( list ) => {
   /*
   1. Determine how many pages are needed for the list by dividing the
   total number of list items by the max number of items per page
   2. Create a div , give it the “pagination” class, and append it to the .page div

   3. Add a ul to the “pagination” div to store the pagination links

   4. for every page, add li and a tags with the page number text
   5. Add an event listener to each a tag. When they are clicked
   call the showPage function to display the appropriate page
   6. Loop over pagination links to remove active class from all links
   7. Add the active class to the link that was just clicked. You can identify that
   clicked link using event.target
   */
  const numOfPages = Math.ceil(list.length/10);
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
  
  (Array.from(document.querySelectorAll('a'))).map(item => {
     item.addEventListener('click', event => {
         console.log(event.target.textContent);
         (Array.from(document.querySelectorAll('a'))).map(item => {  
             item.classList.remove('active')          
         })
         event.target.classList.add('active');
        showPage(list,event.target.textContent);
         console.log(document.querySelectorAll('a'));
        }
  )});
  console.log(document.querySelector('.page'));
}

showPage(studentArr,1);
appendPageLinks(studentArr);
