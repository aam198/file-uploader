let dropArea = document.getElementById("drop-area");
const dragArea = document.querySelector(".drag-area");
const dragText = document.querySelector("header");
const button = document.querySelector("button");
const icon = document.querySelector("icon");
const input = document.querySelector("input");

const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close") [0];
const backBtn = document.getElementById("backBtn");


let droppedFiles = [];


// let file;   Can uncomment if you need file 

//Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
});


// Highlight drop area when item is dragged over it
;['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});




button.addEventListener("click", () => {
  input.click();
  dragArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
});

//getting user select file and [0] this means if user select multiple files then we'll select only the first one
input.addEventListener("change", function(){
    file = this.files[0];
    dragArea.classList.add("active");
    // showFile();
    listUpload();
});

//If user Drag File Over DropArea
dragArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //Prevents default behavior 
    dragArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dragArea.addEventListener("dragleave", ()=>{
    dragArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  });

dragArea.addEventListener("drop", (e) =>{
    e.preventDefault();
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
   const dt = e.dataTransfer;
   const files = dt.files;

   handleFiles(files);
    // showFile(); //calling function
    // listUpload();
    
});


// Progress Bar when uploading files

let uploadProgress = [];
let progressBar = document.getElementById('progress-bar');

function initializeProgress(numFiles) {
  progressBar.value = 0;
  uploadProgress = [];

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0);
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent;
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.value = total
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  listUpload();
}

// Open Modal
nextBtn.addEventListener("click", () => {
  modal.style.display = "block";
});
 
 span.addEventListener("click", () => {
  modal.style.display = "none";
 });

 backBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

//  backBtn.onclick = function() {
//   modal.style.display = "none";
// }
 
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

function showFile(){
    let fileType = file.type; //getting selected file type
    let validExtensions = ["image/jpeg", "image/jpg", "image/png"]; //adding some valid image extensions in array
    if(validExtensions.includes(fileType)){ //if user selected file is an image file
      let fileReader = new FileReader(); //creating new FileReader object
      fileReader.onload = ()=>{
        let fileURL = fileReader.result; //passing user file source in fileURL variable
          // UNCOMMENT THIS BELOW LINE. I GOT AN ERROR WHILE UPLOADING THIS POST SO I COMMENTED IT
        let imgTag = `<img src="${fileURL}" alt="image">`; //creating an img tag and passing user selected file source inside src attribute
        dragArea.innerHTML = imgTag; //adding that created img tag inside dragArea container
        nextBtn.disabled = false;
      }
      fileReader.readAsDataURL(file);
    }else{
      alert("This is not an Image File!");
      dragArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
      nextBtn.disabled = true;
    }
  }
  
  function listUpload () {
    dragArea.classList.remove("active");
    const list = document.querySelector('ul');
    const input = document.querySelector('input');
    const files = document.querySelector('file');

    const btn = document.querySelector('button');

    let myItem = input.value;
    input.value= "";
   
  if (myItem !== "" ){ 
    
    nextBtn.disabled = false;
    
     //Creating 3 new elements and store them in variables 
     const listItem = document.createElement('li');
     const listText = document.createElement('span');
     const close = document.createElement('i');
   
    listItem.classList.add('fadeIn');
   
     list.appendChild(listItem);
     listItem.appendChild(listText);
     listText.textContent = myItem;


     listItem.appendChild(close);
     close.className="fas fa-times";
     
      
    close.addEventListener("click", function(e){
      setTimeout(function(){
        list.removeChild(listItem);
      }, 1000);
        listItem.classList.remove('fadeIn');
        listItem.classList.add('fadeOut');
    });

     
    
     input.focus();
  }
  
  else{
   alert("Please select a file.");
   }
 }


  