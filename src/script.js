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


let droppedFiles = []; //Might not need or can use for submit


// let file;   Can uncomment if you need file 

//Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, preventDefaults, false)   
  document.body.addEventListener(eventName, preventDefaults, false)
});


// Highlight drop area when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, unhighlight, false)
});

// Handle dropped files
dropArea.addEventListener('drop', handleDrop, false)

function preventDefaults (e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight() {
  dragArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
}

function unhighlight(e) {
  dropArea.classList.remove('active')
}

function handleDrop(e) {
  const dt = e.dataTransfer
  const files = dt.files

  handleFiles(files)
}


button.addEventListener("click", () => {
  input.click();
  dragArea.classList.add("active");
  dragText.textContent = "Select File to Upload";
});

//UnComment Below

//getting user select file and [0] this means if user select multiple files then we'll select only the first one
// input.addEventListener("change", function(){
//     file = this.files[0];
//     dragArea.classList.add("active");
//     // showFile();
//     listUpload();
// });


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

// dragArea.addEventListener("drop", (e) =>{
//     e.preventDefault();
   
//    const dt = e.dataTransfer;
//    const files = dt.files;

//    handleFiles(files);
// });

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
  console.debug('update', fileNumber, percent, total);
  progressBar.value = total;
}

function handleFiles(files) {
  files = [...files]
  initializeProgress(files.length)
  files.forEach(uploadFile)
  files.forEach(previewFile)
}

function previewFile(file) {
  let reader = new FileReader()
  reader.readAsDataURL(file)
 
  console.log(file);

  let myItem = input.value;
    input.value= "";

    dragArea.classList.remove("active");
    const list = document.querySelector('ul');
    const listItem = document.createElement('li');
    const listText = document.createElement('span');
    const close = document.createElement('i');
   
    listItem.classList.add('fadeIn');
   
     list.appendChild(listItem);
     listItem.appendChild(listText);
     listText.textContent = file.name;


     listItem.appendChild(close);
     close.className="fas fa-times";
     
      
    close.addEventListener("click", function(){
      setTimeout(function(){
        list.removeChild(listItem);
      }, 1000);
        listItem.classList.remove('fadeIn');
        listItem.classList.add('fadeOut');
    });
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
 
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }

//  End of Modal


  

function uploadFile(file, i) {
  const url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload';
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // Update progress (can be used to show progress indicator)
  xhr.upload.addEventListener("progress", function(e) {
    updateProgress(i, (e.loaded * 100.0 / e.total) || 100);
  });

  xhr.addEventListener('readystatechange', function(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      updateProgress(i, 100) // <- Add this
    }
    else if (xhr.readyState == 4 && xhr.status != 200) {
      // Error. Inform the user
    }
  });

  formData.append('upload_preset', 'ujpu6gyk');
  formData.append('file', file);
  xhr.send(formData);
}

//   function listUpload () {
//     dragArea.classList.remove("active");
//     const list = document.querySelector('ul');
//     const input = document.querySelector('input');
//     const files = document.querySelector('file');

//     const btn = document.querySelector('button');

//     let myItem = input.value;
//     input.value= "";
   
//   if (myItem !== "" ){ 
    
    
    
//      //Creating 3 new elements and store them in variables 
//      const listItem = document.createElement('li');
//      const listText = document.createElement('span');
//      const close = document.createElement('i');
   
//     listItem.classList.add('fadeIn');
   
//      list.appendChild(listItem);
//      listItem.appendChild(listText);
//      listText.textContent = myItem;


//      listItem.appendChild(close);
//      close.className="fas fa-times";
     
      
//     close.addEventListener("click", function(e){
//       setTimeout(function(){
//         list.removeChild(listItem);
//       }, 1000);
//         listItem.classList.remove('fadeIn');
//         listItem.classList.add('fadeOut');
//     });

     
    
//      input.focus();
//   }
  
//   else{
//    alert("Please select a file.");
//    }
//  }


  