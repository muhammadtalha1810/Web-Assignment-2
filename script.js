var books;
var loadedBooksIndex = 4;
$(document).ready(function () {

    showinitialbooks();
    


    $('#search-box').focus(function () { 
        $('#search-container').css('visibility', 'visible');
        $('#Add-Book-container').css('visibility', 'hidden');
    });


    $('#search-box').blur(function () { 
        $('#search-container').css('visibility', 'hidden');
    });


    $('#search-box').keyup(function (event) { 
        $('#searched-books').html("");
        var keyword = $(this).val();
        for(let i=0; i<books.length; i++)
        {
            if(keyword == "")
            {
                break;
            }
            var title = books[i].title;
            if((title.toLowerCase()).includes(keyword.toLowerCase()))
            {
                addBookInSearchList(books[i].title, books[i].author, books[i].imageUrl);
            }
        }
    });



    $('#view-books').click(function () { 
        loadRemainingBooks();
        $(this).attr('disabled', 'true');
    });
    $('#add-btn-nav').click(function () { 
        $('#search-container').css('visibility', 'hidden');
        $('#Add-Book-container').css('visibility', 'visible');
    });
    $('#cancel-btn').click(function () { 
        $('#Add-Book-container').css('visibility', 'hidden');
        
    });
    



    $('#add-book-form').submit(function (e) { 
        e.preventDefault();
        var formData = { id : $('#book-id').val(), title: $('#book-title').val(), author: $('#book-author').val(), price: $('#book-price').val(),  imageUrl: $('#book-imageurl').val(),}
        $.ajax({
            type: "POST",
            contentType : "application/json",
            url: "https://localhost:7015/api/books",
            data: JSON.stringify(formData),
            success: function(){
                $('#Add-Book-container').css('visibility', 'hidden');
                shownotif("The book is added to library", 3);
                $('#add-book-form').trigger("reset");
                updateBooklist();
            },
            error: function(error){
                shownotif("Book Server Connection Error",3);
                $('#Add-Book-container').css('visibility', 'hidden');
            }
          });
        
    });
});


function addBookInSearchList(title, author, imgSource) {
    var newElem = document.createElement('div');
    newElem.className = "searched-book";
    newElem.innerHTML = `
        <img src="${imgSource}" alt="Cover Page" class="searched-book-image">
        <p class="searched-book-title">${title}</p>
        <p class="searched-book-author">${author}</p>
        `;
        
    document.getElementById('searched-books').appendChild(newElem);
}




function addBookInList(title, author, price, imgSource) {
    var newElem = document.createElement('tr');
    newElem.innerHTML = `
        <td class="left-entry">
            <img src="${imgSource}" alt="First Image" style="width: 20px; display: block;">
          </td>
          <td class="table-entry">${title}</td>
          <td class="table-entry">${author}</td>
          <td class="table-entry">Rs ${price}</td>
          <td class="right-entry">
            <button id="buynow-table">Buy Now</button>
        </td>
        `;
    document.getElementsByTagName('table')[0].appendChild(newElem);
}




async function shownotif(message, time)
{
    $('#notification-area').html(message);
    $('#notification-area').css('visibility', 'visible');
    await new Promise(resolve => setTimeout(resolve, time*1000));
    $('#notification-area').css('visibility', 'hidden');
}




function loadInitialBooks()
{
    for(let i=0; i<5; i++)
    {
        addBookInList(books[i].title, books[i].author, books[i].price, books[i].imageUrl);
    }
}




function loadRemainingBooks()
{
    for(let i=loadedBooksIndex+1; i<books.length; i++)
    {
        addBookInList(books[i].title, books[i].author, books[i].price, books[i].imageUrl);
        loadedBooksIndex++;
    }
}




function updateBooklist()
{
    $.ajax({
        type: "GET",
        url: "https://localhost:7015/api/books",
        dataType: "json",
        success: function (data) {
            books = data;
            loadRemainingBooks();
        },
        error: function(error){
            shownotif("Book Server Connection Error",3);
        }
    });
}



function showinitialbooks()
{
    $.ajax({
        type: "GET",
        url: "https://localhost:7015/api/books",
        dataType: "json",
        success: function (data) {
            books = data;
            loadInitialBooks();
        },
        error: function(error){
            shownotif("Book Server Connection Error",3);
        }
    });
}