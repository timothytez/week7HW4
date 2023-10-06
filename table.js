
async function makeTable(){
    const res = await fetch ("https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js")
    var table = document.getElementById('tab');
    var row = document.getElementById('rows').value;
    var col = document.getElementById('cols').value;

    console.log(row+" "+col);

    for(var rowIndex = 0; rowIndex< row; rowIndex++){
        var tr = document.createElement('tr');
        for(var colIndex=0; colIndex<col; colIndex++){
            var td = document.createElement('td');
            var text = document.createTextNode('place-holder' +colIndex);

            td.appendChild(text);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}

document.getElementById('make').addEventListener('click',makeTable);