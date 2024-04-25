import '../styles/home.css'
import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import { useEffect, useRef, useState } from 'react';
import StartPopup from '../components/StartPopup';
import DesktopIcon from '../components/DesktopIcon';
import Folder from '../components/Folder'
import { Images } from '../images/Images';

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [isStartOn, setIsStartOn] = useState(false);
    const [activeIcon, setActiveIcon] = useState(null);
    const desktopRef = useRef(null);

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

    return (
        <div className="home">
            <div className="background" ref={desktopRef}>
                <DesktopIcon Icon={Images.USERFOLDER} Name={'이빈'} onClick={() => handleIconClick('my')} isActive={activeIcon === 'my'} />
                <DesktopIcon Icon={Images.FOLDER} Name={'자격증'} onClick={() => handleIconClick('cert')} isActive={activeIcon === 'cert'} />
                <DesktopIcon Icon={Images.FOLDER} Name={'포트폴리오'} onClick={() => handleIconClick('port')} isActive={activeIcon === 'port'} />
                <DesktopIcon Icon={Images.PICTURESFOLDER} Name={'사진'} onClick={() => handleIconClick('img')} isActive={activeIcon === 'img'} />
            </div>
            <Folder />
            <Taskbar
                changeSearch={changeSearch}
                changeStart={changeStart}
                isSearch={isSearchOn}
                isStart={isStartOn}
            />
            <SearchPopup />
            <StartPopup />
        </div>
    );
}

export default Home;