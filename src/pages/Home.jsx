import '../styles/home.css'

import { Images } from '../images/Images';
import { useEffect, useRef, useState } from 'react';

import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import StartPopup from '../components/StartPopup';
import DesktopIcon from '../components/DesktopIcon';
import Folder from '../components/Folder'

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [isStartOn, setIsStartOn] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const [folder, setFolder] = useState([]);
    const [isFolderOn, setIsFolderOn] = useState(false)
    const [folderTrigger, setFolderTrigger] = useState(null)
    const desktopRef = useRef(null);

    const [folders, setFolders] = useState([
        { name: 'FolderHome', value: false },
        { name: 'Leebhin', value: false },
        { name: 'Certificate', value: false },
        { name: 'Portfolio', value: false },
        { name: 'Picture', value: false }
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedIcon = event.target.closest('.desktopIcon');
            if (!clickedIcon) {
                setActiveIcon(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedIcon = event.target.closest('.searchPopup');
            const searchIcon = event.target.closest('.searchBtn');
            if (!clickedIcon && !searchIcon) {
                setIsSearchOn(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSearchOn]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedIcon = event.target.closest('.startPopupWrap');
            const startIcon = event.target.closest('.startBtn');
            if (!clickedIcon && !startIcon) {
                setIsStartOn(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isSearchOn]);

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    };

    useEffect(() => {
        togglePopupMove('.searchPopup', isSearchOn, 'searchUp', 'searchDown');
        togglePopupMove('.startPopupWrap', isStartOn, 'startUp', 'startDown');
        // eslint-disable-next-line
    }, [isSearchOn, isStartOn]);

    const changeSearch = (isSearchOn) => {
        if (isStartOn) setIsStartOn(false);
        setIsSearchOn(isSearchOn);
        togglePopupMove('.searchPopup', isSearchOn, 'searchUp', 'searchDown');
    }

    const changeStart = (isStartOn) => {
        if (isSearchOn) setIsSearchOn(false);
        setIsStartOn(isStartOn);
        togglePopupMove('.startPopupWrap', isStartOn, 'startUp', 'startDown');
    }

    // 검색 <-> 시작 메뉴
    const togglePopupMove = (element, isOn, classUp, classDown) => {
        const popupElement = document.querySelector(element);
        if (isOn) {
            popupElement.style.transition = '.23s ease';
            popupElement.classList.remove(classDown);
            popupElement.classList.add(classUp);
        } else {
            if (!isSearchOn && !isStartOn) {
                popupElement.style.transition = '.23s cubic-bezier(0.88, 0, 0.88, 1)';
            } else {
                popupElement.style.transition = '0s';
            }
            popupElement.classList.remove(classUp);
            popupElement.classList.add(classDown);
        }
    }

    // 폴더 hoverDiv 여부
    useEffect(() => {
        if (folder.length === 1 && folders.filter(folders => folders.value === true).length === 1) {
            setIsFolderOn(true);
        } else {
            setIsFolderOn(false);
        }
    }, [folder, folders]);

    useEffect(() => {
        console.log(folder);
        console.log(folders);
    }, [folder, folders]);

    // 폴더 최소화 여부
    const folderState = (target, newState) => {
        setFolders(prevFolders => {
            return prevFolders.map(folder => {
                if (folder.name === target) {
                    return { ...folder, value: newState };
                }
                return folder;
            });
        });
    };

    const addFolder = (inner) => {
        setFolder([...folder, { inner }]);
    };

    const dropFolder = (inner) => {
        setFolder(folder.filter(item => item.inner !== inner));
    };

    const folderClick = (target) => {
        // 폴더가 하나도 열려있지 않을 때
        if (folder.length === 0 && folders.filter(folders => folders.value === true).length === 0) {
            addFolder(target);
        }
        // 폴더 하나가 열려 있을 때
        else if (folder.length === 1 && folders.filter(folders => folders.value === true).length === 1) {
            setFolderTrigger('min');
        }
        // 폴더 하나가 최소화 상태일 때
        else if (folder.length === 1 && folders.filter(folders => folders.value === true).length === 0) {
            setFolderTrigger('reset');
        }
        // 다른 상황 처리
        else {
            // 다른 상황에 대한 처리 추가
        }
    }

    return (
        <div className="home">
            <div className="background" ref={desktopRef}>
                <DesktopIcon Icon={Images.USERFOLDER} Name={'이빈'} onClick={() => handleIconClick('my')} isActive={activeIcon === 'my'} />
                <DesktopIcon Icon={Images.FOLDER} Name={'자격증'} onClick={() => handleIconClick('cert')} isActive={activeIcon === 'cert'} />
                <DesktopIcon Icon={Images.FOLDER} Name={'포트폴리오'} onClick={() => handleIconClick('port')} isActive={activeIcon === 'port'} />
                <DesktopIcon Icon={Images.PICTURESFOLDER} Name={'사진'} onClick={() => handleIconClick('img')} isActive={activeIcon === 'img'} />
            </div>

            {folder.map((folderItem, index) => (
                <Folder
                    folderInner={folderItem.inner}
                    folderState={folderState}
                    dropFolder={dropFolder}
                    key={index}
                    index={index}
                    folderTrigger={folderTrigger}
                    setFolderTrigger={setFolderTrigger}
                />
            ))}

            <Taskbar
                changeSearch={changeSearch}
                changeStart={changeStart}
                isSearch={isSearchOn}
                isStart={isStartOn}
                folderClick={folderClick}
                isFolderOn={isFolderOn}
            />
            <SearchPopup />
            <StartPopup />
        </div>
    );
}

export default Home;