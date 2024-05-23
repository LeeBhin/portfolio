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
    const [prevPosition, setPrevPosition] = useState({ x: 430, y: 130 });
    const [firstDir, setFirstDir] = useState(folderInner);
    const [directory, setDirectory] = useState([]);
    const [isMax, setIsMax] = useState(false);
    const [pSize, setPSize] = useState({ width: 1000, height: 600 });
    const [prevState, setPrevState] = useState({ size: { width: 1000, height: 600 }, position: { x: 430, y: 130 } });
    const [wasMax, setWasMax] = useState(false);

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
            setIsMax(false);
            setWasMax(false); // 닫힐 때 상태 초기화
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

    // 최대화
    const maxFolder = () => {
        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        setPrevState({ size, position });
        setPSize({ width: size.width, height: size.height });

        folderStyle.transformOrigin = '50% 50%';
        folderStyle.transition = ".15s cubic-bezier(0.88, 0, 0.88, 1)";
        folderStyle.width = `${viewportWidth}px`;
        folderStyle.height = `${viewportHeight}px`;
        folderStyle.transform = 'translate(0px, 0px) scale(1)';

        folderState(folderInner, true);
        setSize({ width: viewportWidth, height: viewportHeight });
        setIsMax(true);
        setWasMax(false);
    }
    // 최대화 복구
    const maxFolderReset = () => {
        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        setPrevState({ size, position });

        folderStyle.transformOrigin = '50% 50%';
        folderStyle.transition = ".15s cubic-bezier(0.88, 0, 0.88, 1)";
        folderStyle.width = `${viewportWidth}px`;
        folderStyle.height = `${viewportHeight}px`;
        folderStyle.transform = 'translate(0px, 0px) scale(1)';

        folderState(folderInner, true);
        setSize({ width: viewportWidth, height: viewportHeight });
        setPosition({ x: 0, y: 0 });
        setIsMax(true);
        setWasMax(false);
    }

    // 최소화
    const minFolder = () => {

        if (!isMax) {
            setPrevPosition(position)
        }

        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        selectedFolder.style.transformOrigin = `${originX}px ${originY}px`;
        folderStyle.transition = "transform .17s cubic-bezier(0.88, 0, 0.88, 1)";
        folderStyle.transform = "scale(0.001)";

        folderState(folderInner, false);
        setWasMax(isMax);
        setIsMax(false);
    }

    // 복구
    const reset = () => {
        const selectedFolder = document.querySelector(`.f${folderInner}.f${index}`);
        const folderStyle = selectedFolder.style;

        folderStyle.transition = ".2s ease";

        if (wasMax && !isMax) {
            maxFolderReset(); // 최대화 상태로 복원
        } else if (isMax) {
            setSize(pSize); // 최대화되기 전 크기로 복원
            setPosition(prevState.position);
            folderStyle.width = `${size.width}px`;
            folderStyle.height = `${size.height}px`;
            folderStyle.transform = `translate(${prevState.position.x}px,${prevState.position.y}px) scale(1)`;
            setIsMax(false);
            setWasMax(true); // 복원 후 원래 크기로 돌아간 경우 wasMax 설정
        } else {
            folderStyle.width = `${size.width}px`;
            folderStyle.height = `${size.height}px`;
            folderStyle.transform = `translate(${position.x}px,${position.y}px) scale(1)`;
            setWasMax(false);
        }

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
        // console.log('was', wasMax)
        // console.log('is', isMax)
        // console.log('size', size)
        // console.log('pSize', pSize)
        // console.log('pos', position)
        // console.log('prevstate', prevState.position)
    }, [wasMax, isMax, position, size])

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
            // onResizeStart={(e, direction, ref) => {
            //     setPSize({ width: size.width, height: size.height });
            // }}
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
                    maxFolder={maxFolder}
                    setFolderTrigger={setFolderTrigger}
                    directory={directory}
                    isMax={isMax}
                    reset={reset}
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
