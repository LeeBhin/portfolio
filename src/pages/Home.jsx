import '../styles/home.css'
import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import { useEffect, useState } from 'react';
import StartPopup from '../components/StartPopup';
import DesktopIcon from '../components/DesktopIcon';
import { Images } from '../images/Images';

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [isStartOn, setIsStartOn] = useState(false)

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
            <div className="background">
                <DesktopIcon Icon={Images.FILE} Name={'사진'} />
            </div>
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