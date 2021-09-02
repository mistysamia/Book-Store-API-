//Search Button 
document.getElementById('search').addEventListener('click', function () {
    const bookName = document.getElementById('bookInput').value;

    // Removing prev child 
    const BookDiv = document.getElementById('Book-Div');
    while (BookDiv.firstChild)
        BookDiv.removeChild(BookDiv.lastChild);

    const errorDiv = document.getElementById('error');
    while (errorDiv.firstChild)
        errorDiv.removeChild(errorDiv.lastChild);

    // Spinning start
    const spin = document.getElementById('spin');
    spin.style.display = "block";

    if (bookName === "") {
        alert("Please Enter Input Correctly");
    }
    else {
        apiCall(bookName);
    }
});

//API Calling 
const apiCall = searchText => {
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            BookSet(json);
        });
}


const BookSet = bookName => {

    //Spinning stop
    const spin = document.getElementById('spin');
    spin.style.display = "none";

    if (bookName["docs"].length === 0) {
        const errorDiv = document.getElementById('error');
        const error = document.createElement('section');
        let errorMsg = `
        <h1>No Search Result Found</h1>
        `;
        error.innerHTML = errorMsg;
        errorDiv.appendChild(error);
    }
    else {

        const BookDiv = document.getElementById('Book-Div');
        const errorDiv = document.getElementById('error');

        //Search Result Showing 
        const totalResult = document.createElement('section');
        let totalResultFound = `
        <h1>Search Result Found: ${bookName["docs"].length}</h1>
        `;
        totalResult.innerHTML = totalResultFound;
        errorDiv.appendChild(totalResult);


        bookName["docs"].forEach(element => {
            const BookDetails = document.createElement('section');
            const BookEachCard = document.createElement('article');
            BookEachCard.className = 'col';
            const cardInnerDetails = document.createElement('div');
            cardInnerDetails.className = 'card-body';
            let bookAbout = "";

            /// Unfortunately this time ternary options is not working 
            /* let url = "https://covers.openlibrary.org/b/id/";
            bookAbout += `
                 <img src="${url + element.cover_i+'-M.jpg' ? url + element.cover_i+'-M.jpg' :Images/noImage.jpg}" 
                   class="img-thumbnail mt-3" > 
                 `;*/
            if (element.cover_i) {
                let url = "https://covers.openlibrary.org/b/id/";
                bookAbout += `
                     <img src="${url + element.cover_i}-M.jpg" class="img-thumbnail mt-3" >
                    `;
            }
            else {
                bookAbout += `
                    <img src="Images/noImage.jpg" class="img-thumbnail mt-3" >
                    `
            }
            bookAbout += `
            <h5 class ="card-title title">${element.title ? element.title : "Not Available"}</h5>
            `;
            bookAbout += `
            <h6 class ="card-text author_name">${element.author_name ? 'By '+element.author_name : "Not Available"}</h6>
            `
            bookAbout += `
            <h6 class ="card-text publishers">Publishers : ${element.publisher ? element.publisher : "Not Available"}/h6>
            `
            bookAbout += `
                <h6 class="publishedYear">First Published Year : ${element.first_publish_year ? element.first_publish_year : "Not Available"}</h6>
                `;


            // Adding to the div
            cardInnerDetails.innerHTML = bookAbout;
            BookEachCard.appendChild(cardInnerDetails);
            BookDiv.appendChild(BookEachCard);


        });
    }

}
