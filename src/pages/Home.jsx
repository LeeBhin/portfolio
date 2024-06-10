import '../styles/home.css'

import { Images } from '../images/Images';
import { useEffect, useState } from 'react';

import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import StartPopup from '../components/StartPopup';
import DesktopIcon from '../components/DesktopIcon';
import Folder from '../components/Folder'

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [isStartOn, setIsStartOn] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const [isFolderOn, setIsFolderOn] = useState(false);
    const [folderTrigger, setFolderTrigger] = useState(null);
    const [activeWidth, setActiveWidth] = useState('');
    const [isTaskClick, setIsTaskClick] = useState(false);

    const [folder, setFolder] = useState([]);
    const [folders, setFolders] = useState([]);
    const [double, setDouble] = useState([]);

    const initialWidth = window.innerWidth * .7;
    const initialHeight = window.innerHeight * .7;
    const ratio = 10 / 6.5;
    const initialSize = initialWidth / initialHeight > ratio
        ? { width: initialHeight * ratio, height: initialHeight }
        : { width: initialWidth, height: initialWidth / ratio };

    const centerX = (window.innerWidth - initialSize.width) / 2;
    const centerY = (window.innerHeight - initialSize.height) / 2;

    const [openPos, setOpenPos] = useState({ x: centerX, y: centerY });

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
            } else if (isTaskClick) {
                popupElement.style.transition = '0s';
            } else {
                popupElement.style.transition = '.23s cubic-bezier(0.88, 0, 0.88, 1)';
            }
            popupElement.classList.remove(classUp);
            popupElement.classList.add(classDown);
        }
        setIsTaskClick(false)
    }

    const trueCount = folders.filter(folder => folder.value === true).length;

    // 폴더 hoverDiv 여부
    useEffect(() => {
        if (folderLength === 1 && trueCount === 1) {
            setIsFolderOn(true);
        } else {
            setIsFolderOn(false);
        }
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

    const handleIconClick = (iconName) => {
        setActiveIcon(iconName);
    };

    // 가장 높이 있는 폴더
    const getMaxZIndex = () => {
        const folderElements = document.querySelectorAll('.folder');
        let maxZIndex = 0;
        folderElements.forEach(item => {
            const zIndex = parseInt(window.getComputedStyle(item).zIndex);
            if (!isNaN(zIndex) && zIndex > maxZIndex) {
                maxZIndex = zIndex;
            }
        });
        return maxZIndex;
    };

    // 폴더 추가
    const addFolder = (target) => {
        setFolder(prevFolder => {
            const newIndex = prevFolder.length;
            const newTarget = `${target}${newIndex}`;
            return [...prevFolder, newTarget];
        });

        setFolders(prevFolders => {
            const newIndex = prevFolders.length;
            const newFolderName = `${target}${newIndex}`;
            return [...prevFolders, { name: newFolderName, value: true }];
        });

        setDouble(prevDouble => [...prevDouble, transInner(target)]);

        // 폴더 열리는 위치 ++
        if (folder.length > 0) {
            setOpenPos({ x: openPos.x + 30, y: openPos.y + 30 });
        } else {
            const centerX = (window.innerWidth - initialSize.width) / 2;
            const centerY = (window.innerHeight - initialSize.height) / 2;
            setOpenPos({ x: centerX, y: centerY });
        }
    };

    // 폴더 삭제
    const dropFolder = (target) => {
        setFolder(prevFolder => prevFolder.filter(item => item !== target));

        setFolders(prevFolders => prevFolders.filter(folder => folder.name !== target));

        setDouble(prevDouble => prevDouble.filter(item => item !== transInner(target)));
    };

    const transInner = (pwd) => {
        const pwdMap = {
            'FolderHome': '홈',
            'FolderLeebhin': '이빈',
            'FolderCertificate': '자격증',
            'FolderPortfolio': '포트폴리오',
            'FolderPicture': '사진',
            '홈': 'FolderHome',
            '이빈': 'FolderLeebhin',
            '자격증': 'FolderCertificate',
            '포트폴리오': 'FolderPortfolio',
            '사진': 'FolderPicture'
        }
        pwd = pwd.replace(/\d+$/, '')
        return pwd.replace(/\b\w+\b/g, match => pwdMap[match] || match);
    }

    const folderLength = folder.length;

    // 폴더 activeBar
    useEffect(() => {
        if (folderLength > 0 && trueCount > 0) {
            setActiveWidth('long')
        } else if (folderLength > 0 && trueCount === 0) {
            setActiveWidth('short')
        } else {
            setActiveWidth('close')
        }
        console.log(folder, folders)
    }, [folder, folders]);

    // actiebar 제어
    useEffect(() => {
        const active = document.querySelector('.activeBar');
        const file = document.querySelector('.fileExImg');

        if (activeWidth === 'long') {
            active.style.width = '40%';
            active.style.backgroundColor = '#0078D4';
            file.classList.remove('activeKeyDown');
            file.classList.add('activeKeyUp');
        } else if (activeWidth === 'short') {
            active.style.width = '15%';
            active.style.backgroundColor = '#747882';
            file.classList.remove('activeKeyUp');
            file.classList.add('activeKeyDown');
        } else {
            active.style.width = '0%';
            active.style.backgroundColor = '#747882';
        }
    }, [activeWidth]);

    // 폴더 클릭했을때(teskbar, desktop)
    const folderClick = (target, which = 'desk') => {

        const trueCount = folders.filter(aFolder => aFolder.value === true).length;

        if (double.includes(transInner(target))) {
            if (which !== 'task') {

                const upElement = document.querySelector(`.folder[class*="${target}"]`);
                if (upElement) {
                    const maxZIndex = getMaxZIndex();
                    upElement.style.zIndex = maxZIndex + 1;
                }
                return;
            }
        }

        if (which === 'task') {
            if (folderLength === 0 && trueCount === 0) {
                addFolder('FolderHome');
            } else if (folderLength === 1 && trueCount === 1) {
                setFolderTrigger('min');
            } else if (folderLength === 1 && trueCount === 0) {
                setFolderTrigger('reset');
            } else {
                // 활성화 폴더들 표시하기
            }
        } else {
            if (folderLength === 0 && trueCount === 0) {
                addFolder(target);
            } else if (folderLength > 0 && trueCount > 0) {
                if (folder.includes(target)) {
                } else {
                    addFolder(target);
                }
            } else if (folderLength > 0 && trueCount === 0) {
                if (folder[0] === target) {
                    setFolderTrigger('reset');
                } else {
                    addFolder(target);
                }
            }
        }
    }

    return (
        <div className="home">
            <div className="background">
                <DesktopIcon
                    Icon={Images.USERFOLDER}
                    Name={'이빈'}
                    onClick={() => handleIconClick('FolderLeebhin')}
                    onDoubleClick={() => folderClick('FolderLeebhin')}
                    isActive={activeIcon === 'FolderLeebhin'}
                />

                <DesktopIcon
                    Icon={Images.CERTIFICATEFOLDER}
                    Name={'자격증'}
                    onClick={() => handleIconClick('FolderCertificate')}
                    onDoubleClick={() => folderClick('FolderCertificate')}
                    isActive={activeIcon === 'FolderCertificate'}
                />

                <DesktopIcon
                    Icon={Images.FOLDER}
                    Name={'포트폴리오'}
                    onClick={() => handleIconClick('FolderPortfolio')}
                    onDoubleClick={() => folderClick('FolderPortfolio')}
                    isActive={activeIcon === 'FolderPortfolio'}
                />
                <DesktopIcon
                    Icon={Images.PICTURESFOLDER}
                    Name={'사진'}
                    onClick={() => handleIconClick('FolderPicture')}
                    onDoubleClick={() => folderClick('FolderPicture')}
                    isActive={activeIcon === 'FolderPicture'}
                />
            </div>

            {folder.map((folderItem, index) => (
                <Folder
                    folderInner={folderItem}
                    folderState={folderState}
                    dropFolder={() => dropFolder(folderItem)}
                    key={folderItem}
                    index={index}
                    folderTrigger={folderTrigger}
                    setFolderTrigger={setFolderTrigger}
                    setActiveWidth={setActiveWidth}
                    folders={folders}
                    setFolder={setFolder}
                    setFolders={setFolders}
                    transInner={transInner}
                    setDouble={setDouble}
                    getMaxZIndex={getMaxZIndex}
                    openPos={openPos}
                />
            ))}

            <Taskbar
                changeSearch={changeSearch}
                changeStart={changeStart}
                isSearch={isSearchOn}
                isStart={isStartOn}
                folderClick={folderClick}
                isFolderOn={isFolderOn}
                setIsTaskClick={setIsTaskClick}
            />
            <SearchPopup />
            <StartPopup />
        </div>
    );
}

export default Home;