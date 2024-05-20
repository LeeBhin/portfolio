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
    const [folder, setFolder] = useState([]);
    const [isFolderOn, setIsFolderOn] = useState(false)
    const [folderTrigger, setFolderTrigger] = useState(null)
    const [activeWidth, setActiveWidth] = useState('')

    const [folders, setFolders] = useState([
        { name: 'FolderHome', value: false },
        { name: 'FolderLeebhin', value: false },
        { name: 'FolderCertificate', value: false },
        { name: 'FolderPortfolio', value: false },
        { name: 'FolderPicture', value: false }
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

    const addFolder = (target) => {
        setFolder([...folder, target]);
    };

    const dropFolder = (target) => {
        setFolder(prevFolder => prevFolder.filter(item => item !== target));
    };

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
    }, [folder, folders]);

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


    const folderClick = (target, which = 'desk') => {
        const trueCount = folders.filter(aFolder => aFolder.value === true).length;

        if (which === 'task') {
            if (folderLength === 0 && trueCount === 0) {
                addFolder(target);
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
                    // 이미 열린 폴더 제일 앞으로
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
                />

                <DesktopIcon
                    Icon={Images.FOLDER}
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

            {folder.map((folderItem) => (
                <Folder
                    folderInner={folderItem}
                    folderState={folderState}
                    dropFolder={() => dropFolder(folderItem)}
                    key={folderItem}
                    folderTrigger={folderTrigger}
                    setFolderTrigger={setFolderTrigger}
                    setActiveWidth={setActiveWidth}
                    folders={folders}
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