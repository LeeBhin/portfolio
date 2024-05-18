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
    const desktopRef = useRef(null);
    const [folders, setFolders] = useState({
        Leebhin: false,
        Certificate: false,
        Portfolio: false,
        Picture: false
    })

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
        togglePopupMove('.searchPopup', isSearchOn, 'searchUp', 'searchDown')
        togglePopupMove('.startPopupWrap', isStartOn, 'startUp', 'startDown')
        // eslint-disable-next-line
    }, [isSearchOn, isStartOn]);

    const changeSearch = (isSearchOn) => {
        if (isStartOn) setIsStartOn(false)
        setIsSearchOn(isSearchOn)
        togglePopupMove('.searchPopup', isSearchOn, 'searchUp', 'searchDown')
    }

    const changeStart = (isStartOn) => {
        if (isSearchOn) setIsSearchOn(false)
        setIsStartOn(isStartOn)
        togglePopupMove('.startPopupWrap', isStartOn, 'startUp', 'startDown')
    }

    const togglePopupMove = (element, isOn, classUp, classDown) => {
        const popupElement = document.querySelector(element)
        if (isOn) {
            popupElement.style.transition = '.2s ease'
            popupElement.classList.remove(classDown)
            popupElement.classList.add(classUp)
        } else {
            if (!isSearchOn && !isStartOn) {
                popupElement.style.transition = '.2s cubic-bezier(0.88, 0, 0.88, 1)'
            } else {
                popupElement.style.transition = '0s'
            }
            popupElement.classList.remove(classUp)
            popupElement.classList.add(classDown)
        }
    }



    const folderClick = () => {
        if (Object.values(folders).every(value => value === false)) {

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
            <Folder folderInner='FolderHome' />
            <Taskbar
                changeSearch={changeSearch}
                changeStart={changeStart}
                isSearch={isSearchOn}
                isStart={isStartOn}
                folderClick={folderClick}
            />
            <SearchPopup />
            <StartPopup />
        </div>
    );
}

export default Home;