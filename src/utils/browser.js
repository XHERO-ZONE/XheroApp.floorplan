
export function browserDownload(json, name) {
  let fileOutputLink = document.createElement('a');
  let fileName = name + '.json'
  if (!name) return;

  let output = JSON.stringify(json);
  let data = new Blob([output], {type: 'text/plain'});
  let url = window.URL.createObjectURL(data);
  fileOutputLink.setAttribute('download', fileName);
  fileOutputLink.href = url;
  fileOutputLink.style.display = 'none';
  document.body.appendChild(fileOutputLink); 
  fileOutputLink.click();
  document.body.removeChild(fileOutputLink);
}

export function browserUpload() {
  return new Promise(function (resolve, reject) {

    let fileInput = document.createElement('input');
    fileInput.type = 'file';

    fileInput.addEventListener('change', function (event) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (fileEvent) => {
        let loadedData = fileEvent.target.result;
        resolve(loadedData);
      });
      reader.readAsText(file);
    });

    fileInput.click();
  });
}