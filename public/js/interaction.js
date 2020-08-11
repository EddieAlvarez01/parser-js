
//ALERTS
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
});


//SELECT DOM ELEMENTS
const btnDelete = document.querySelector('#btnDelete');
const btnOpen = document.querySelector('#btnOpen');
const fileInput = document.querySelector('#file-input');
const btnSave = document.querySelector('#btnSave');
const btnCompile = document.querySelector('#btnCompile');
const formTxt = document.querySelector('#formTxt');
const divGraph = document.querySelector('#graphTree');

//LISTENERS
btnDelete.addEventListener('click', DeleteText);
btnOpen.addEventListener('click', OpenTxt);
fileInput.addEventListener('change', fileSelected);
btnSave.addEventListener('click', saveText);
btnCompile.addEventListener('click', compile);
formTxt.addEventListener('submit', formSubmit);


//DELETE TEXT
function DeleteText() {
    document.querySelector('#txt').value = '';
}

//OPEN TXT
function OpenTxt() {
    fileInput.click();
}

//A FILE WAS SELECTED
function fileSelected() {
    const file = fileInput.files[0];
    if (file.type == 'text/plain'){
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = reader.result;
            document.querySelector('#txt').value = content;
        }
        reader.readAsText(file);
    }else{
        Toast.fire({
            icon: 'error',
            title: 'Solo se pueden abrir archivos con extension .txt'
        });
    } 
}

//SAVE TEXT
function saveText() {
    const content = document.querySelector('#txt').value;
    const download = document.createElement('A');
    download.href = `data:text/plain;charset=utf-8,${content}`
    download.download = 'code.txt';
    download.click();
}

//COMPILE TEXT
function compile() {
    console.log('onclikc');
    formTxt.submit();
}

//FORM
function formSubmit(e) {
    console.log('Submit');
    e.preventDefault();
}

if (divGraph != undefined) {
    const margin = {
        top: 40,
        right: 90,
        bottom: 50,
        left: 90
    }
    const width = 660 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    const tree = d3.tree().size([width, height]);
    let nodes = d3.hierarchy(graph);
    console.log(nodes);
    nodes = tree(nodes);
    const svg = d3.select("#graphTree").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
    const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    const link = g.selectAll(".link").data(nodes.descendants().slice(1))
                    .enter().append("path")
                    .attr("class", "link")
                    .attr("d", d => {
                        return "M" + d.x + "," + d.y
                                + "C" + d.x  + "," + (d.y + d.parent.y) / 2
                                + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                                + " " + d.parent.x + "," + d.parent.y;
                    });
    const node = g.selectAll(".node").data(nodes.descendants())
                .enter().append("g")
                .attr("class", d => {
                    return "node" + (d.children ? " node--internal" : " node--leaf");
                })
                .attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    node.append("circle").attr("r", 10);
    node.append("text").attr("dy", ".35em")
        .attr("y", d => {
            return d.children ? -20 : 20;
        })
        .style("text-anchor", "middle")
        .text(d => d.data.name);
}

/*"M" + d.x + "," + d.y
                                + "C" + d.x  + "," + (d.y + d.parent.y) / 2
                                + " " + d.parent.x + "," + (d.y + d.parent.y) / 2
                                + " " + d.parent.x + "," + d.parent.y; */

/*"M" + d.y + "," + d.x
         + "C" + (d.y + d.parent.y) / 2 + "," + d.x
         + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
         + " " + d.parent.y + "," + d.parent.x;*/