import '../styles/folder.css'
import { Images } from '../images/Images';
import { CgClose } from "react-icons/cg";
import { PiPlus, PiArrowLeftLight, PiArrowRightLight, PiArrowUpLight, PiMinus } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { RxReload } from "react-icons/rx";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { IoSquareOutline, IoCloseOutline } from "react-icons/io5";
import { GrClose } from "react-icons/gr";
import { TbSquare } from "react-icons/tb";
import { CiCirclePlus } from "react-icons/ci";
import { GrFormDown } from "react-icons/gr";
import { TbCut } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa6";
import { BiRename } from "react-icons/bi";
import { FaRegShareSquare } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import { LiaClipboardSolid } from "react-icons/lia";

function Folder({ }) {
    return (
        <div className="folder">
            <div className="folderHeader">
                <div className="topHeader">
                    <div className="tabWrap">
                        <div className="folderTab">
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
                    <div className="minBtn"><PiMinus size={"16px"} /></div>
                    <div className="maxBtn"><TbSquare size={"14px"} /></div>
                    <div className="closeBtn"><GrClose size={"13px"} /></div>
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
                    <div className="newBtn"><CiCirclePlus /></div>
                    <div className="newTxt">새로 만들기</div>
                    <div className="newDrop"><GrFormDown size={"12px"} /></div>
                </div>

                <div className="toolWrap">
                    <div className="cut"><TbCut size={"20px"} /></div>
                    <div className="copy"><FaRegCopy size={"20px"} /></div>
                    <div className="clip"><LiaClipboardSolid size={"20px"} /></div>
                    <div className="rename"><BiRename size={"20px"} /></div>
                    <div className="share"><FaRegShareSquare size={"20px"} /></div>
                    <div className="delete"><GoTrash size={"20px"} /></div>
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