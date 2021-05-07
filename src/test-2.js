let droppedFiles = [];

        let btnUpload = document.getElementById("btnUpload")
        btnUpload.addEventListener('click', uploadFiles, false)

        function uploadFiles(event) {
            event.preventDefault();
            // TODO - validate file size, extension & amount
            files = [...fileElem.files];


            for (let i = 0; i < droppedFiles.length; i++) {
                files.push(droppedFiles[i]);
            }

            console.log(files.length);
            // Submit each file separately.
            //files.forEach(uploadFile)
            //check if success and if so, remove from gallery 
        }

        // This all copy & paste
        // ************************ Drag and drop ***************** //
        let dropArea = document.getElementById("drop-area")

            // Prevent default drag behaviors
            ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, preventDefaults, false)
                document.body.addEventListener(eventName, preventDefaults, false)
            })

            // Highlight drop area when item is dragged over it
            ;['dragenter', 'dragover'].forEach(eventName => {
                dropArea.addEventListener(eventName, highlight, false)
            })

            ;['dragleave', 'drop'].forEach(eventName => {
                dropArea.addEventListener(eventName, unhighlight, false)
            })

        // Handle dropped files
        dropArea.addEventListener('drop', handleDrop, false)

        function preventDefaults(e) {
            e.preventDefault()
            e.stopPropagation()
        }

        function highlight(e) {
            dropArea.classList.add('highlight')
        }

        function unhighlight(e) {
            dropArea.classList.remove('active')
        }

        function handleDrop(e) {
            var dt = e.dataTransfer
            var files = dt.files

            for (let i = 0; i < files.length; i++) {
                droppedFiles.push(files[i]);
            }

            handleFiles(files)
        }

        let uploadProgress = []
        let progressBar = document.getElementById('progress-bar')

        function initializeProgress(numFiles) {
            progressBar.value = 0
            uploadProgress = []
            for (let i = numFiles; i > 0; i--) {
                uploadProgress.push(0)
            }
        }

        function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            //console.log('update', fileNumber, percent, total)
            progressBar.value = total
            return total === 100;
        }

        function handleFiles(files) {
            files = [...files];
            // fileElem= [...files];
            initializeProgress(files.length)
            //files.forEach(uploadFile)
            files.forEach(previewFile)
        }

        function previewFile(file) {
            //console.error('file.name: ' + file.name);
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onloadend = function () {
                let img = document.createElement('img')
                img.id = file.name;//.toString().replaceAll('"', '').replaceAll('.', '').replaceAll(' ', '_');
                img.src = reader.result
                document.getElementById('gallery').appendChild(img)
            }
        }

        function uploadFile(file, i) {
            var url = '/api2/uploadfile/135/3435' // TODO: change end point
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function (e) {
                updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

            xhr.addEventListener('readystatechange', function (e) {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (updateProgress(i, 100)) {
                        //$("'" + "#gallery #" + xhr.responseText.replaceAll('"', '').replaceAll('.', '').replaceAll(' ', '_') + "'").remove();//how do we handle spaces in filenames?
                        //console.error(i);
                        $('#gallery img:nth-child(' + (i + 1) + ')').hide();

                        //alert('Complete') // TODO
                        return true;
                    }
                }
                else if (xhr.readyState == 4 && xhr.status != 200) {
                    $('#status').html(GetMessageStatus('Error: ' + xhr.responseText, 1));
                    return false;
                }
            })

            formData.append('file', file)
            xhr.send(formData)
        }