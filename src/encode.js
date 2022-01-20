


// Validate .mp4 extension  - did this in accept for input type for Browse

// Validate that there are not special characters that AWS does not take. 

// Validate correct naming convention before submit https://stackoverflow.com/questions/8021880/javascript-validate-filename-before-upload

function handleFiles(files) {
  files = [...files]
  files.forEach(validateFile);
}

function validateFile(file){
  const size = file.size;
    const file_name_string = file.name;
    const file_name_array = file_name_string.split(".");
    console.log(file_name_array);
    const file_name= file_name_array[0];
    console.log(file_name);
    const file_type = file_name_array[file_name_array.length-1];

    const file_byte = new Array('Bytes', 'KB', 'MB', 'GB');
    let fSize = size;
    var i=0;
     while(fSize>900){fSize/=1024;i++;}

    const file_size = (Math.round(fSize*100)/100)+' '+file_byte[i];

    let  nodesString = "";

    nodesString += "<div>" + file_name + "</div>" + "<div>" + file_type + "</div>" + "<div>" + file_size + "</div>"; 

  console.log(file_name_array);

  var alphaExp = /^[a-zA-Z_]+$/;
  if(file_name.match(alphaExp)){
    alert("File name " + file_name + " works! Continue!");  
    return true;
  }else{
      alert("File name not suitable");
      return false;
  }
}
