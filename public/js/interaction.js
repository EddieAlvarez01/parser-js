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