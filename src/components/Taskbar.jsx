import { useEffect, useRef, useState } from 'react';
import '../styles/taskbar.css'
import { HiOutlineSearch } from "react-icons/hi";

function Taskbar(searchPopup) {
    const [isSearchOn, setIsSearchOn] = useState(false)
    const searchOnRef = useRef(null);

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
        searchPopup.a(!isSearchOn)
    }

    return (
        <div className="taskbar">

            <div className='startBtn'>
                <div className="startBtnWrap">
                    <div id="hoverDiv"></div>
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