import '../styles/home.css'
import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import { useEffect, useState } from 'react';
import StartPopup from '../components/StartPopup';

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [isStartOn, setIsStartOn] = useState(false)

    useEffect(() => {
        // console.log('search', isSearchOn)
        // console.log('start', isStartOn)
        searchPopupMove(isSearchOn)
        startPopupMove(isStartOn)
    }, [isSearchOn, isStartOn]);

    const changeSearch = isSearchOn => {
        if (isStartOn) {
            setIsStartOn(!isStartOn)
        }
        setIsSearchOn(isSearchOn)
    }

    const changeStart = isStartOn => {
        if (isSearchOn) {
            setIsSearchOn(!isSearchOn)
        }
        setIsStartOn(isStartOn)
    }

    const searchPopupMove = (isSearchOn) => {
        const searchElement = document.querySelector('.searchPopup')
        if (isSearchOn) {
            searchElement.className = "searchPopup searchUp"
        } else {
            searchElement.className = "searchPopup searchDown"
        }
    }

    const startPopupMove = (isStartOn) => {
        const searchElement = document.querySelector('.startPopup')
        if (isStartOn) {
            searchElement.className = "startPopup startUp"
        } else {
            searchElement.className = "startPopup startDown"
        }
    }

    return (
        <div className="home">
            <div className="background">
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