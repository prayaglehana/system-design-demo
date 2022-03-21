import Demo from "./components/Demo";
import "./App.css";
import { useRef, useState } from "react";

class Folder {
  constructor(id, name, type, parent) {
    this.name = name;
    this.type = type;
    this.parent = parent;
    this.subfolders = [];
    this.id = id;
  }
}

const intializeFolders = () => {
  let folders = new Map();
  let root = new Folder(0, "root", "folder", -1);
  root.subfolders = [1, 2, 3];

  let f1 = new Folder(1, "A", "folder", 0);
  let f2 = new Folder(2, "B", "folder", 0);
  let f3 = new Folder(3, "myfile.txt", "file", 0);
  f1.subfolders = [4, 5];

  let f1_1 = new Folder(4, "A_1", "folder", 1);
  let f1_2 = new Folder(5, "A_2", "folder", 1);

  folders.set(0, root);
  folders.set(1, f1);
  folders.set(2, f2);
  folders.set(3, f3);
  folders.set(4, f1_1);
  folders.set(5, f1_2);
  // folders.push(root, f1, f2, f3, f1_1, f1_2);

  return folders;
};

function App() {
  const [allFolders, setAllFolders] = useState(() => intializeFolders());
  const [visibleId, setVisibleId] = useState(0);

  const IdGenerater = useRef(6);

  const handleGoBack = () => {
    if (visibleId) setVisibleId(allFolders.get(visibleId).parent);
  };

  const handleFolderClick = (subIdx) => {
    setVisibleId(subIdx);
  };

  const handleCreateFolder = (isFile) => {
    const fname = document.getElementById("name_text_box_id").value;

    let _allFolders = new Map(allFolders);

    const newID = IdGenerater.current;
    _allFolders.get(visibleId).subfolders.push(newID);

    let newfolder = isFile
      ? new Folder(newID, fname, "file", visibleId)
      : new Folder(newID, fname, "folder", visibleId);

    _allFolders.set(newID, newfolder);
    IdGenerater.current = IdGenerater.current + 1;
    setAllFolders(_allFolders);
  };

  const handleFolderDelete = (subIdx) => {
    let _allFolders = new Map(allFolders);

    // for (let [key, value] of _allFolders) {
    //   console.log(key, value);
    // }

    const idx = _allFolders.get(visibleId).subfolders.indexOf(subIdx);

    _allFolders.get(visibleId).subfolders.splice(idx, 1);

    setAllFolders(_allFolders);
  };

  const renderFolders = (subIdx, idx) => {
    return (
      <div>
        <button
          className="button"
          onClick={() => handleFolderClick(subIdx)}
          key={idx}
        >
          {allFolders.get(subIdx).name}
        </button>
        <button onClick={() => handleFolderDelete(subIdx)}>delete</button>
      </div>
    );
  };

  const renderFiles = (subIdx, idx) => {
    return (
      <div>
        <span key={idx}>{allFolders.get(subIdx).name}</span>
        <button onClick={() => handleFolderDelete(subIdx)}>delete</button>
      </div>
    );
  };

  return (
    <div className="App">
      <div>
        {allFolders.get(visibleId).subfolders.map((subIdx, idx) => {
          return (
            <div>
              {allFolders.get(subIdx).type == "folder"
                ? renderFolders(subIdx, idx)
                : null}
            </div>
          );
        })}

        {allFolders.get(visibleId).subfolders.map((subIdx, idx) => {
          return (
            <div>
              {allFolders.get(subIdx).type == "file"
                ? renderFiles(subIdx, idx)
                : null}
            </div>
          );
        })}
      </div>

      <div className="footer">
        <div className="input__box">
          <input id="name_text_box_id" placeholder="enter folder name" />
        </div>
        <button className="button__actions" onClick={() => handleGoBack()}>
          Go Back
        </button>

        <button
          className="button__actions"
          onClick={() => handleCreateFolder(false)}
        >
          createFolder
        </button>

        <button
          className="button__actions"
          onClick={() => handleCreateFolder(true)}
        >
          createFile
        </button>
      </div>
    </div>
  );
}

export default App;
