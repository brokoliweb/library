let bookCollection = [
    {
        title: 'b',
        author: 'b',

    },
    {
        title: 'a',
        author: 'a',
    }
];


bookCollection.sort(function sortList(a,b) {
    let textA = a.author.toUpperCase();
    let textB = b.author.toUpperCase();
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
});



console.log(bookCollection)
bookCollection.sort();
console.log(bookCollection)
bookCollection.splice(0,1);
console.log(bookCollection[0].author);
bookCollection.indexOf();