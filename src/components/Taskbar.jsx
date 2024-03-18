import '../styles/taskbar.css'
import { IoIosSearch } from "react-icons/io";

function Taskbar() {
    return (
        <div className="taskbar">

            <div className='startBtn'>
                <div className="startBtnWrap">
                    <div id="hoverDiv"></div>
                    <div className="startBtnImg"></div>
                </div>
            </div>


            <div className='searchBtn'>
                <div className="searchWrap">
                    <IoIosSearch />
                    <IoIosSearch color="white" />
                </div>
            </div>


        </div>
    );
}

export default Taskbar;