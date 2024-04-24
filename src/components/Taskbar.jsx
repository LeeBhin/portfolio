import { useEffect, useRef, useState } from 'react';
import '../styles/taskbar.css'
import { HiOutlineSearch } from "react-icons/hi";
import { GoBell } from "react-icons/go";

function Taskbar({ changeSearch, changeStart, isSearch, isStart }) {
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [isStartOn, setIsStartOn] = useState(false)
    const [time, setTime] = useState(new Date());
    const searchOnRef = useRef(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const period = hours >= 12 ? '오후' : '오전';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${period} ${formattedHours}:${formattedMinutes}`;
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }


    useEffect(() => {
        setIsSearchOn(isSearch)
        setIsStartOn(isStart)
    }, [isSearch, isStart]);

    useEffect(() => {
        if (isSearchOn) {
            searchOnRef.current.style.opacity = '1';
            searchOnRef.current.style.disPlay = 'block';
            searchOnRef.current.style.zIndex = '2';
        } else {
            searchOnRef.current.style.opacity = '0';
            searchOnRef.current.style.disPlay = 'none';
            searchOnRef.current.style.zIndex = '-2';
        }
    }, [isSearchOn]);

    const handleSearch = () => {
        setIsSearchOn(prevState => !prevState);
        changeSearch(!isSearchOn);
    }
    const handleStart = () => {
        setIsStartOn(prevState => !prevState);
        changeStart(!isStartOn);
    }

    return (
        <div className="taskbar">

            <div className='startBtn' onClick={handleStart}>
                <div className="startBtnWrap">
                    <div id="hoverDiv" style={{ opacity: isStartOn ? "1" : "" }}></div>
                    <div className="startBtnImg"></div>
                </div>
            </div>

            <div className='searchBtn' onClick={handleSearch}>
                <div className="searchWrap">
                    <div className="searchTxt">
                        <HiOutlineSearch color={isSearchOn ? "white" : ""} />
                        <span style={{ color: isSearchOn ? "white" : "black" }}>검색 </span>
                    </div>
                    <div className="searchBtnDiv searchOff">
                    </div>
                    <div className="searchBtnDiv searchOn" ref={searchOnRef}></div>
                </div>
            </div>

            <div className="fileExpBtn">
                <div className="fileExpWrap">
                    <div id="hoverDiv"></div>
                    <div className="fileExImg"></div>
                </div>
            </div>


            <div className="dateAndAlarm">
                <div className="dateWrap">
                    <div className="time">{formatTime(time)}</div>
                    <div className="date">{formatDate(time)}</div>
                </div>
                <div className="alarm"><GoBell /></div>
            </div>
        </div>
    );
}

export default Taskbar;