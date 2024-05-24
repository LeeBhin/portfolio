import '../styles/folder.css';
import { useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import TopHeader from './folder/folderElements/TopHeader';
import MidHeader from './folder/folderElements/MidHeader';
import BotHeader from './folder/folderElements/BotHeader';
import FolderBody from './folder/folderElements/FolderBody';

function Folder({ folderInner, folderState, dropFolder, folderTrigger, setFolderTrigger, index, setFolder, setFolders, transInner, setDouble, getMaxZIndex, openPos }) {

    const ratio = 10 / 6.5;

    const initialWidth = window.innerWidth * .7;
    const initialHeight = window.innerHeight * .7;
    const initialSize = initialWidth / initialHeight > ratio
        ? { width: initialHeight * ratio, height: initialHeight }
        : { width: initialWidth, height: initialWidth / ratio };

    const [size, setSize] = useState(initialSize);

    const initialPosition = {
        x: (window.innerWidth - initialSize.width) / 2,
        y: (window.innerHeight - initialSize.height) / 2
    };

    const [position, setPosition] = useState(initialPosition);
    const [prevPosition, setPrevPosition] = useState(initialPosition);
    const [firstDir, setFirstDir] = useState(folderInner);
    const [directory, setDirectory] = useState([]);
    const [isMax, setIsMax] = useState(false);
    const [pSize, setPSize] = useState({ width: 1000, height: 600 });
    const [prevState, setPrevState] = useState({ size: { width: 1000, height: 600 }, position: initialPosition });
    const [wasMax, setWasMax] = useState(false);

    useEffect(() => setDirectory([transInner(firstDir)]), [firstDir]);

    // 폴더 요소 선택
    const selectFolder = () => document.querySelector(`.f${folderInner}.f${index}`);

    // 스타일 전환 적용
    const applyTransition = (element, transition) => {
        element.style.transition = transition;
    };

    // 변환 설정
    const setTransform = (element, transform) => {
        element.style.transform = transform;
    };

    // 폴더 닫기
    const closeFolder = () => {
        const selectedFolder = selectFolder();
        applyTransition(selectedFolder, "transform 0.2s cubic-bezier(0.88, 0, 0.88, 1), opacity 0.15s cubic-bezier(0.88, 0, 0.88, 1)");
        setTransform(selectedFolder, selectedFolder.style.transform + " scale(0.8)");
        selectedFolder.style.opacity = "0";

        folderState(folderInner, false);
        setTimeout(() => {
            dropFolder(folderInner);
            setIsMax(false);
            setWasMax(false);
        }, 200);
    };

    // 폴더 처음 열기
    const firstFolder = () => {
        const selectedFolder = selectFolder();
        selectedFolder.style.transform += ' scale(.8)';
        selectedFolder.style.opacity = "0";
        selectedFolder.style.zIndex = getMaxZIndex() + 1;
        folderState(folderInner, true);
        setTimeout(() => openFolder(), 0);
    };

    // 폴더 열리는 애니메이션
    const openFolder = () => {
        const selectedFolder = selectFolder();
        applyTransition(selectedFolder, "transform 0.2s ease, opacity 0.15s ease");
        setTransform(selectedFolder, selectedFolder.style.transform.replace(/scale\([\d.]+\)/, 'scale(1)'));
        selectedFolder.style.opacity = "1";
        // setTimeout(() => transitionReset(), 400);
    };

    const file = document.querySelector('.fileExImg').getBoundingClientRect();
    const originX = file.left;
    const originY = file.top;

    // 폴더 최대화
    const maxFolder = () => {
        const selectedFolder = selectFolder();
        setPrevState({ size, position });
        setPSize({ width: size.width, height: size.height });

        applyTransition(selectedFolder, ".15s cubic-bezier(0.88, 0, 0.88, 1)");
        selectedFolder.style.width = `${window.innerWidth}px`;
        selectedFolder.style.height = `${window.innerHeight}px`;
        setTransform(selectedFolder, 'translate(0px, 0px) scale(1)');

        folderState(folderInner, true);
        setSize({ width: window.innerWidth, height: window.innerHeight });
        setIsMax(true);
        setWasMax(false);
        // setTimeout(() => transitionReset(), 200);
    };

    // 최대화 복구
    const maxFolderReset = () => {
        const selectedFolder = selectFolder();
        setPrevState({ size, position });

        applyTransition(selectedFolder, ".2s cubic-bezier(0.88, 0, 0.88, 1)");
        selectedFolder.style.width = `${window.innerWidth}px`;
        selectedFolder.style.height = `${window.innerHeight}px`;
        setTransform(selectedFolder, `scale(1)`);

        folderState(folderInner, true);
        setSize({ width: window.innerWidth, height: window.innerHeight });
        setIsMax(true);
        setWasMax(false);
    };

    // 폴더 최소화
    const minFolder = () => {
        if (!isMax) {
            setPrevPosition({ x: position.x, y: position.y });
        }

        const selectedFolder = selectFolder();
        selectedFolder.style.transformOrigin = `${originX}px ${originY}px`;
        applyTransition(selectedFolder, "transform .17s cubic-bezier(0.88, 0, 0.88, 1)");
        setTransform(selectedFolder, "scale(0.001)");

        folderState(folderInner, false);
        setWasMax(isMax);
        setIsMax(false);
    };

    // 복구
    const reset = () => {
        const selectedFolder = selectFolder();
        applyTransition(selectedFolder, ".2s ease");

        if (wasMax && !isMax) {
            maxFolderReset();
        } else if (isMax) {
            setSize(pSize);
            setPosition(prevState.position);
            selectedFolder.style.width = `${size.width}px`;
            selectedFolder.style.height = `${size.height}px`;
            setTransform(selectedFolder, `translate(${prevState.position.x}px,${prevState.position.y}px) scale(1)`);
            setIsMax(false);
            setWasMax(true);
        } else {
            selectedFolder.style.width = `${size.width}px`;
            selectedFolder.style.height = `${size.height}px`;
            setTransform(selectedFolder, `translate(${prevPosition.x}px,${prevPosition.y}px) scale(1)`);
            setWasMax(false);
        }

        folderState(folderInner, true);
        // setTimeout(() => transitionReset(), 300);
    };

    // 전환 초기화
    const transitionReset = () => {
        const selectedFolder = selectFolder();
        applyTransition(selectedFolder, "none");
    };

    // 인덱스 업
    const indexUp = () => {
        transitionReset();
        const selectedFolder = selectFolder();
        selectedFolder.style.zIndex = getMaxZIndex() + 1;
    };

    // 열기 설정
    const openSet = () => {
        const selectedFolder = selectFolder();
        selectedFolder.style.opacity = "0";
        setPosition(openPos);
    };

    useEffect(() => {
        console.log('was', wasMax);
        console.log('is', isMax);
        console.log('size', size);
        console.log('pSize', pSize);
        console.log('pos', position);
        console.log('prevpos', prevPosition);
        console.log('prevstate', prevState.position);
    }, [wasMax, isMax, position, size]);

    useEffect(() => {
        if (folderTrigger === 'min') {
            minFolder();
        } else if (folderTrigger === 'reset') {
            reset();
        }
        setFolderTrigger(null);
    }, [folderTrigger]);

    useEffect(() => {
        openSet();
        setTimeout(() => firstFolder(), 0);
    }, []);

    return (
        <Rnd className={`folder f${folderInner} f${index}`}
            size={size}
            onMouseDown={indexUp}
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
            </div>
        </Rnd>
    );
}

export default Folder;
