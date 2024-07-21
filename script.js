var books;
$(document).ready(function () {
    $('#search-box').focus(function () { 
        $('#search-container').css('visibility', 'visible');
        $('#Add-Book-container').css('visibility', 'hidden');
        //document.getElementById('search-container').style.visibility = 'visible';
    });
    $('#search-box').blur(function () { 
        $('#search-container').css('visibility', 'hidden');
        //document.getElementById('search-container').style.visibility = 'hidden';
    });
    $('#search-box').keyup(function (event) { 
        //Content changes, do search
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
        for(let i=5; i<books.length; i++)
        {
            addBookInList(books[i].title, books[i].author, books[i].price, books[i].imageUrl);
        }
        $(this).attr('disabled', 'true');
    });
    $('#add-btn-nav').click(function () { 
        $('#search-container').css('visibility', 'hidden');
        $('#Add-Book-container').css('visibility', 'visible');
    });
    $('#cancel-btn').click(function () { 
        $('#Add-Book-container').css('visibility', 'hidden');
        
    });
    $.ajax({
        type: "GET",
        url: "https://localhost:7015/api/books",
        dataType: "json",
        success: function (data) {
            books = data;
            for(let i=0; i<5; i++)
            {
                addBookInList(books[i].title, books[i].author, books[i].price, books[i].imageUrl);
            }
        },
        error: function(error){
            console.log("Some Error occured");
        }
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
          <td class="table-entry">${price}</td>
          <td class="right-entry">
            <button id="buynow-table">Buy Now</button>
        </td>
        `;
    document.getElementsByTagName('table')[0].appendChild(newElem);
}