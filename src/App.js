import React, { useState  } from 'react';
import { ImageUploader } from './components/ImageUploader';
import './App.css';

function App() {
  const [loadedFiles, setLoadedFiles] = useState([]);

  function handleFileUpload(e) {
    
    const currentFile = e.currentTarget.files[0];

    const fileReader = new FileReader();

    fileReader.onload = () => {
      const file = {
        name: currentFile.name,
        size: currentFile.size,
        type: currentFile.type,
        data: fileReader.result,
      }

      addLoadedFile(file);
    }

    fileReader.onabort = () => {
      alert("Reading Aborted");
    }

    fileReader.onerror = () => {
      alert("Reading Error");
    }

    try {
      fileReader.readAsDataURL(currentFile);
      
    } catch (error) {
      alert(error)
    }

  }

  function addLoadedFile(file) {
    setLoadedFiles((prevLoadedFiles ) => [...prevLoadedFiles, file ]);
  }

  function removeLoadedFile(file, index) {
    setLoadedFiles((prevLoadedFiles) => {
      return prevLoadedFiles.filter((prevFiles,  prevIndex) => prevIndex !== index)
    })
  }

  function onUpload(params) {
    console.log('I am here');
  }

  return (
    <div className="App container">
      <h1>Drag an image</h1>
      <section className="section-container" >
        <ImageUploader  
          // dropZoneClassName="test"
          // dropZoneStyle={{ background: 'blue' }}
          // dropZoneLabel="Drag and Drop Images Here"
          onDrop={handleFileUpload}
          onRemove={removeLoadedFile}
          filesUploaded={loadedFiles}
          onUpload={onUpload}
          // buttonsContainerClassName="test"
          // buttonsContainerStyles={{ background: 'red' }}
          // buttonBrowseFileClassName="test"
          // buttonBrowseFileStyle={{ background: 'red' }}
          // buttonUploadClassName="test"
          // buttonUploadStyle={{ background: 'blue' }}
          // buttonBrowseLabel="djjdd"
        />
      </section>
    </div>
  );
}

export default App;
