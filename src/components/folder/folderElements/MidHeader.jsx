import { Images } from "../../../images/Images";

import { GoHome } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";

function MidHeader() {
    return (
        <>
            <div className="midHeader">
                <div className="moveWrap">
                    <div className="prev"><img src={Images.LEFTARROW} alt="" /></div>
                    <div className="next"><img src={Images.LEFTARROW} style={{ transform: "rotate(180deg)" }} alt="" /></div>
                    <div className="up"><img src={Images.UPARROW} alt="" /></div>
                    <div className="reload"><img src={Images.RELOAD} alt="" /></div>
                </div>

                <div className="directory">
                    <div className="icon"><GoHome size={"17px"} /></div>
                    <div className="arrow" id='btn'><RiArrowRightSLine /></div>
                    <div className="txt" id='btn'>홈</div>
                </div>

                <div className="search">
                    <div className="searchWrap">
                        <input type="search" placeholder='홈 검색' />
                        <div className="searchIcon"><IoIosSearch /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MidHeader;