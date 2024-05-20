import '../styles/folder.css';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import TopHeader from './folder/folderElements/TopHeader';
import MidHeader from './folder/folderElements/MidHeader';
import BotHeader from './folder/folderElements/BotHeader';
import FolderBody from './folder/folderElements/FolderBody';

function Folder({ folderInner, folderState, dropFolder, folderTrigger, setFolderTrigger, index, setFolder, setFolders, transInner, setDouble, getMaxZIndex, openPos }) {
    const [size, setSize] = useState({ width: 1000, height: 600 });
    const [position, setPosition] = useState({ x: 430, y: 130 });
    const [firstDir, setFirstDir] = useState(folderInner);
    const [directory, setDirectory] = useState([]);

    useEffect(() => setDirectory([transInner(firstDir)]), [firstDir]);

    // 폴더 닫기
    const closeFolder = () => {

        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);

        selectedFolder.style.transformOrigin = '50% 50%';
        selectedFolder.style.transition = "transform 0.2s cubic-bezier(0.88, 0, 0.88, 1), opacity 0.15s cubic-bezier(0.88, 0, 0.88, 1)";
        selectedFolder.style.transform += " scale(0.8)";
        selectedFolder.style.opacity = "0";

        folderState(folderInner, false);
        setTimeout(() => {
            dropFolder(folderInner);
        }, 200);
    }

    // 컴포넌트 생성 후 동작
    const firstFolder = () => {
        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        folderStyle.transform += ' scale(.8)';
        folderStyle.opacity = "0";

        folderStyle.zIndex = getMaxZIndex() + 1;
        folderState(folderInner, true)
        setTimeout(() => {
            openFolder();
        }, 0);
    }

    // 열리는 애니메이션
    const openFolder = () => {

        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;
        folderStyle.transition = "transform 0.2s ease, opacity 0.15s ease";
        folderStyle.transform = folderStyle.transform.replace(/scale\([\d.]+\)/, 'scale(1)');
        folderStyle.opacity = "1";

        setTimeout(() => {
            transitionReset();
        }, 300);
    }

    const file = document.querySelector('.fileExImg').getBoundingClientRect();
    const originX = file.left;
    const originY = file.top;

    // 최소화
    const minFolder = () => {

        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        selectedFolder.style.transformOrigin = `${originX}px ${originY}px`;
        folderStyle.transition = "transform .17s cubic-bezier(0.88, 0, 0.88, 1)";
        folderStyle.transform = "scale(0.001)";
        // folderStyle.transform = folderStyle.transform.replace(/scale\([\d.]+\)/, 'scale(0.001)');

        folderState(folderInner, false)
    }

    // 최소화 -> 복구
    const reset = () => {

        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        folderStyle.transition = "transform .2s ease";

        folderStyle.transform = `translate(${position.x}px,${position.y}px) scale(1)`;
        // folderStyle.transform = folderStyle.transform.replace(/scale\([\d.]+\)/, 'scale(1)');

        folderState(folderInner, true);
        setTimeout(() => {
            transitionReset();
        }, 300);
    }

    // 기본
    const transitionReset = () => {
        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;
        folderStyle.transition = "none";
    }

    useEffect(() => {
        if (folderTrigger === 'min') {
            minFolder();
        } else if (folderTrigger === 'reset') {
            reset();
        }
        setFolderTrigger(null)
    }, [folderTrigger]);

    // 초기 동작
    useEffect(() => {
        firstFolder();
        setPosition(openPos)
    }, []);

    return (
        <Rnd className={`folder f${folderInner} f${index}`}
            size={size}
            position={position}
            dragHandleClassName="folderHeader"
            onDragStop={(e, d) => {
                setPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10)
                });
                setPosition(position);
            }}
            minWidth={760}
            minHeight={250}
            resizeHandleStyles={{
                top: { cursor: 'n-resize' },
                right: { cursor: 'e-resize' },
                bottom: { cursor: 's-resize' },
                left: { cursor: 'w-resize' },
            }}
        >
            <div className="folderWrap">
                <TopHeader
                    closeFolder={closeFolder}
                    minFolder={minFolder}
                    setFolderTrigger={setFolderTrigger}
                    directory={directory}
                />
                <MidHeader
                    directory={directory}
                    transInner={transInner}
                />
                <BotHeader />
                <FolderBody
                    folderInner={folderInner}
                    setFirstDir={setFirstDir}
                    firstDir={firstDir}
                    transInner={transInner}
                    setFolder={setFolder}
                    setFolders={setFolders}
                    index={index}
                    directory={directory}
                    setDouble={setDouble}
                />
            </div >
        </Rnd >
    );
}

export default Folder;
