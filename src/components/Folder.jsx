import '../styles/folder.css';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import TopHeader from './folder/folderElements/TopHeader';
import MidHeader from './folder/folderElements/MidHeader';
import BotHeader from './folder/folderElements/BotHeader';
import FolderBody from './folder/folderElements/FolderBody';

function Folder({ folderInner, folderState, index }) {
    const [size, setSize] = useState({ width: 1000, height: 600 });
    const [position, setPosition] = useState({ x: 430, y: 130 });

    const closeFolder = (event) => {
        const selectedFolder = event.currentTarget.closest('.folder');
        selectedFolder.style.transition = "transform 0.2s cubic-bezier(0.88, 0, 0.88, 1), opacity 0.15s cubic-bezier(0.88, 0, 0.88, 1)";
        selectedFolder.style.transform += " scale(0.8)";
        selectedFolder.style.opacity = "0";

        folderState(folderInner, false);

        setTimeout(() => {
            selectedFolder.remove();
        }, 250);
    }

    const firstFolder = () => {
        folderState(folderInner, true)
        const selectedFolder = document.querySelector(`.f${index}`);
        const folderStyle = selectedFolder.style;
        folderStyle.transform += ' scale(.8)';
        folderStyle.opacity = "0";
    }

    const openFolder = () => {
        const selectedFolder = document.querySelector(`.f${index}`);
        const folderStyle = selectedFolder.style;
        folderStyle.transition = "transform 0.2s ease, opacity 0.15s ease";
        folderStyle.transform = folderStyle.transform.replace(/scale\([\d.]+\)/, 'scale(1)');
        folderStyle.opacity = "1";

        setTimeout(() => {
            reset();
        }, 250);
    }

    const reset = () => {
        const selectedFolder = document.querySelector(`.f${index}`);
        const folderStyle = selectedFolder.style;
        folderStyle.transition = "none";
    }

    useEffect(() => {
        firstFolder();
        
        setTimeout(() => {
            openFolder();
        }, 0);
    }, []);

    return (
        <Rnd className={`folder f${index}`}
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
                <TopHeader closeFolder={closeFolder} />
                <MidHeader />
                <BotHeader />
                <FolderBody folderInner={folderInner} />
            </div >
        </Rnd >
    );
}

export default Folder;
