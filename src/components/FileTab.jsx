import { useDispatch, useSelector } from "react-redux";
import css from "../styles/File.module.css";
import FileIcon from "./FileIcon";
import { VscChromeClose } from "react-icons/vsc";
import { setFocusedFile, setHistory } from "../features/historySlice";
import { setCurrentFiles } from "../features/historySlice";
import { useEffect, useState } from "react";

const FileTab = ({ fileName, filePath }) => {
  const dispatch = useDispatch();
  const [dup, setDup] = useState(null);

  const { focusedFile, currentFiles, history } = useSelector(
    (state) => state.history
  );

  const getExtension = (fileName) => {
    if (fileName === "robots.txt") return "robots";
    const parts = fileName.split(".");
    return parts.length > 1 ? "." + parts[parts.length - 1] : "";
  };

  const closeFile = (e) => {
    e.stopPropagation();
    const updatedFiles = currentFiles.filter((file) => file.path !== filePath);

    dispatch(setCurrentFiles(updatedFiles));
  };

  const tabClick = () => {
    const lastFile = history[history.length - 1];
    dispatch(setFocusedFile(filePath));
    if (lastFile !== filePath) {
      dispatch(setHistory([...history, filePath]));
    }
  };

  const getUpPath = (filePath) => {
    if (filePath.startsWith(`LEE BHIN/${fileName}`)) {
      return filePath.split("/").slice(0)[0];
    } else {
      return `...\\${filePath.split("/").slice(-2, -1)[0]}`;
    }
  };

  useEffect(() => {
    const fileNames = currentFiles.map((file) => file.path.split("/").pop());
    const duplicateFile = fileNames.find(
      (name, index) => fileNames.indexOf(name) !== index
    );
    if (duplicateFile) {
      setDup(duplicateFile);
    } else {
      setDup(null);
    }
  }, [currentFiles]);

  return (
    <div
      className={css.FileTab}
      onClick={() => tabClick()}
      style={
        focusedFile === filePath
          ? {
              backgroundColor: "#1f1f1f",
              borderBottom: "solid 1px #1f1f1f",
            }
          : {}
      }
    >
      {focusedFile === filePath && <div className={css.tabLine} />}

      <div className={css.fileWrap}>
        <FileIcon extension={getExtension(fileName)} />
        <div className={css.name}>{fileName}</div>
        {dup && dup === fileName && (
          <div className={css.path}>{getUpPath(filePath)}</div>
        )}
      </div>

      <div className={css.close} onClick={(e) => closeFile(e)}>
        <VscChromeClose />
      </div>
    </div>
  );
};

export default FileTab;
