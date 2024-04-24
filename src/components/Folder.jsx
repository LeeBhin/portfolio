import '../styles/folder.css'
import { Images } from '../images/Images';
import { CgClose } from "react-icons/cg";
import { PiPlus, PiArrowLeftLight, PiArrowRightLight, PiArrowUpLight, PiMinus } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { RxReload } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { TbSquare } from "react-icons/tb";
import { PiPlusCircleThin } from "react-icons/pi";
import { GrFormDown } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";

function Folder({ }) {
    return (
        <div className="folder">
            <div className="folderHeader">
                <div className="topHeader">
                    <div className="tabWrap">
                        <div className="folderTab">
                            <svg id="folderTab" viewBox="0 0 250 31" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                                <path d="M34.806874,71.257641q3.219742-.482265,4.666691-2.973539.451881-1.42284,0-18.48985q0-6.93695,6.434401-9.522052.911221,0,227.804183,0q7.285117,1.768101,7.285117,9.522052c0,.000001,0,12.324742,0,17.335137c0,3.137052,3.668328,4.128252,3.668328,4.128252q0,0-249.85872,0Z" transform="translate(-34.740162-40.2722)" fill="#f0f5f9" strokeWidth="0.682" />
                            </svg>
                            <div className="iconWrap">
                                <div className="tabIcon">
                                    <img src={Images.HOME} alt="" />
                                </div>
                                <div className="iconTxt">홈</div>
                            </div>

                            <div className="tabClose"><CgClose /></div>
                        </div>
                        <div className="tabPlus"><PiPlus /></div>
                    </div>
                </div>

                <div className="minMaxWrap">
                    <div className="minBtn"><PiMinus size={"14px"} /></div>
                    <div className="maxBtn"><TbSquare size={"12px"} /></div>
                    <div className="closeBtn"><GrClose size={"12px"} /></div>
                </div>
            </div>
            <div className="midHeader">
                <div className="moveWrap">
                    <div className="prev"><PiArrowLeftLight /></div>
                    <div className="next">< PiArrowRightLight /></div>
                    <div className="up"><PiArrowUpLight /></div>
                    <div className="reload"><RxReload size={"14px"} /></div>
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

            <div className="botHeader">
                <div className="newWrap">
                    <div className="newHover">
                        <div className="newBtn"><PiPlusCircleThin size={"20px"} /></div>
                        <div className="newTxt">새로 만들기</div>
                        <div className="newDrop"><GrFormDown size={"12px"} color='gray' /></div>
                    </div>
                </div>

                <div className="toolWrap">
                    <div className="cut"><img src={Images.SCISSORS} alt="" /></div>
                    <div className="copy"><img src={Images.COPY} alt="" /></div>
                    <div className="clip"><img src={Images.PASTE} alt="" /></div>
                    <div className="rename"><img src={Images.RENAME} alt="" /></div>
                    <div className="share"><img src={Images.SHARE} alt="" /></div>
                    <div className="delete"><img src={Images.DELETE} alt="" /></div>
                </div>

                <div className="visionWrap">
                    <div className="sort">
                        <div className="sortWrap" id='visionWrap'>
                            <div className="sortIcon"><img src={Images.SORT} alt="" /></div>
                            <div className="inWrap">
                                <div className="sortTxt">정렬</div>
                                <div className="sortDrop"><GrFormDown size={"12px"} color='gray' /></div>
                            </div>
                        </div>
                    </div>

                    <div className="view">
                        <div className="viewWrap" id='visionWrap'>
                            <div className="viewIcon"><img src={Images.VIEWBIG} alt="" /></div>
                            <div className="inWrap">
                                <div className="viewTxt">보기</div>
                                <div className="viewDrop"><GrFormDown size={"12px"} color='gray' /></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="more">
                    <div className="moreWrap">
                        <FiMoreHorizontal />
                    </div>
                </div>
            </div>



            <div className="leftHeader">


            </div>
        </div >
    );
}

//  같은 폴더는 중복 열기 X
//  다른 폴더는 얼마든지 가능
//  여러개 열려있으면 작업표시줄에 hoverdiv 하나 더 표시

export default Folder;