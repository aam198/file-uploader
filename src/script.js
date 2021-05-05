const dropArea = document.querySelector(".drag-area");
const dragText = document.querySelector("header");
const button = document.querySelector("button");
const icon = document.querySelector("icon");
const input = document.querySelector("input");

const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close") [0];
const backBtn = document.getElementById("backBtn");

let file; 


button.addEventListener("click", () => {
  input.click();
  dropArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
})

//getting user select file and [0] this means if user select multiple files then we'll select only the first one
input.addEventListener("change", function(){
    file = this.files[0];
    dropArea.classList.add("active");
    // showFile();
    listUpload ();
});

//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //Prevents default behavior 
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  });

dropArea.addEventListener("drop", (e) =>{
    e.preventDefault();
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = e.dataTransfer.files[0];
    showFile(); //calling function
    listUpload ();
    
});


// Progress Bar when uploading files

let uploadProgress = []
let progressBar = document.getElementById('progress-bar')

function initializeProgress(numFiles) {
  progressBar.value = 0
  uploadProgress = []

  for(let i = numFiles; i > 0; i--) {
    uploadProgress.push(0)
  }
}

function updateProgress(fileNumber, percent) {
  uploadProgress[fileNumber] = percent
  let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
  console.debug('update', fileNumber, percent, total)
  progressBar.value = total
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
        dropArea.innerHTML = imgTag; //adding that created img tag inside dropArea container
        nextBtn.disabled = false;
      }
      fileReader.readAsDataURL(file);
    }else{
      alert("This is not an Image File!");
      dropArea.classList.remove("active");
      dragText.textContent = "Drag & Drop to Upload File";
      nextBtn.disabled = true;
    }
  }
  
  function listUpload () {
    dropArea.classList.remove("active");
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
     const listBtn = document.createElement('button');
   
    listItem.classList.add('fadeIn');
   
     list.appendChild(listItem);
     listItem.appendChild(listText);
     listText.textContent = myItem;


     listItem.appendChild(listBtn);
     listBtn.textContent = 'Remove';
     listBtn.className= "remove-btn";
      
   
     listBtn.onclick = function(e){

      setTimeout(function(){
        list.removeChild(listItem);
      }, 1000);
        listItem.classList.remove('fadeIn');
        listItem.classList.add('fadeOut');
     }
    
     input.focus();
  }
  
  else{
   alert("Please select a file.");
   }
 }


  