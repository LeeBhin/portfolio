import '../styles/folder.css'

import { useState } from 'react';
import { Rnd } from 'react-rnd';

import TopHeader from './folder/folderElements/TopHeader';
import MidHeader from './folder/folderElements/MidHeader';
import BotHeader from './folder/folderElements/BotHeader';
import FolderBody from './folder/folderElements/FolderBody';

function Folder({ folderInner }) {
    const [size, setSize] = useState({ width: 1000, height: 600 });
    const [position, setPosition] = useState({ x: 430, y: 130 });

    const closeFolder = (event) => {
        const selectedFolder = event.currentTarget.closest('.folder');

        selectedFolder.style.transition = "transform 0.2s cubic-bezier(0.88, 0, 0.88, 1), opacity 0.15s cubic-bezier(0.88, 0, 0.88, 1)";
        selectedFolder.style.transform += " scale(0.8)";
        selectedFolder.style.opacity = "0";
    }

    return (
        <Rnd className='folder'
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

//  같은 폴더는 중복 열기 X
//  다른 폴더는 얼마든지 가능
//  여러개 열려있으면 작업표시줄에 hoverdiv 하나 더 표시

export default Folder;