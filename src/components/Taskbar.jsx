import { useEffect, useRef, useState } from 'react';
import '../styles/taskbar.css'
import { HiOutlineSearch } from "react-icons/hi";

function Taskbar({ changeSearch, changeStart, isSearch, isStart }) {
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [isStartOn, setIsStartOn] = useState(false)
    const searchOnRef = useRef(null);

    useEffect(() => {
        setIsSearchOn(isSearch)
        setIsStartOn(isStart)
        console.log('search', isSearch)
        console.log('start', isStart)
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
        </div>
    );
}

export default Taskbar;