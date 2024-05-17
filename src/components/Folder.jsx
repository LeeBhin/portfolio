import '../styles/folder.css'
import { Images } from '../images/Images';
import { PiPlus, PiMinus } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { RiArrowRightSLine } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { TbSquare } from "react-icons/tb";
import { GrFormDown } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from 'react';
import { Rnd } from 'react-rnd';

function Folder() {
    const [size, setSize] = useState({ width: 1000, height: 600 });
    const [position, setPosition] = useState({ x: 430, y: 130 });

    const homeIcons = { '홈': 'HOME', '갤러리': 'GALLERY', '자격증': 'CERTIFICATE' };
    const pinnedIcons = { '바탕 화면': 'DESKTOP', '다운로드': 'DOWNLOAD', '문서': 'DOCUMENT', '사진': 'PICTURE', '음악': 'MUSIC', '동영상': 'VIDEO' };
    const driveIcons = { 'BenDrive': 'DRIVE', '내 PC': 'MYPC', '네트워크': 'NETWORK' };

    const CloseFolder = (event) => {
        const selectedFolder = event.currentTarget.closest('.folder');

        selectedFolder.style.transition = "transform 0.2s cubic-bezier(0.88, 0, 0.88, 1), opacity 0.15s cubic-bezier(0.88, 0, 0.88, 1)";
        selectedFolder.style.transform += " scale(0.8)";
        selectedFolder.style.opacity = "0";
    }

    return (
        <Rnd className='folder'
            size={size}
            position={position}
            dragHandleClassName="folderHeader"
            onDragStop={(e, d) => {
                setPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setSize({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10)
                });
                setPosition(position);
            }}
            minWidth={760}
            minHeight={250}
            resizeHandleStyles={{
                top: { cursor: 'n-resize' },
                right: { cursor: 'e-resize' },
                bottom: { cursor: 's-resize' },
                left: { cursor: 'w-resize' },
            }}
        >
            <div className="folderWrap">
                <div className="folderHeader">
                    <div className="topHeader">
                        <div className="tabWrap">
                            <div className="folderTab">
                                <svg id="folderTab" viewBox="0 0 250 31" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                                    <path d="M34.806874,71.257641q3.219742-.482265,4.666691-2.973539.451881-1.42284,0-18.48985q0-6.93695,6.434401-9.522052.911221,0,227.804183,0q7.285117,1.768101,7.285117,9.522052c0,.000001,0,12.324742,0,17.335137c0,3.137052,3.668328,4.128252,3.668328,4.128252q0,0-249.85872,0Z" transform="translate(-34.740162-40.2722)" fill="#f0f5f9" strokeWidth="0.682" />
                                </svg>
                                <div className="iconWrap">
                                    <div className="tabIcon">
                                        <img src={Images.HOME} alt="home" />
                                    </div>
                                    <div className="iconTxt">홈</div>
                                </div>

                                <div className="tabClose"><img src={Images.FOLDERTABX} alt="tabClose" /></div>
                            </div>
                            <div className="tabPlus"><PiPlus /></div>
                        </div>
                    </div>

                    <div className="minMaxWrap">
                        <div className="minBtn"><PiMinus size={"14px"} /></div>
                        <div className="maxBtn"><TbSquare size={"12px"} /></div>
                        <div className="closeBtn" onClick={CloseFolder}><GrClose size={"12px"} /></div>
                    </div>
                </div>
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

                <div className="botHeader">
                    <div className="newWrap">
                        <div className="newHover">
                            <div className="newBtn"><img src={Images.NEWMAKE} alt="" /></div>
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

                    <div className="detailInfo">
                        <div className="icon"><img src={Images.DETAIL} alt="" /></div>
                        <div className="txt">세부 정보</div>
                    </div>
                </div>

                <div className="folderBody">

                    <div className="leftHeader">
                        <div className="homeWrap leftWrap">
                            {Object.entries(homeIcons).map(([txt, icon]) => (
                                <div key={icon} className='iconWrap'>
                                    <div className="icon"><img src={Images[icon]} alt={txt} /></div>
                                    <div className="txt">{txt}</div>
                                </div>
                            ))}
                        </div>

                        <div className="leftWrapLine"></div>

                        <div className="pinnedWrap leftWrap">
                            {Object.entries(pinnedIcons).map(([txt, icon]) => (
                                <div key={icon} className='iconWrap'>
                                    <div className="icon"><img src={Images[icon]} alt={txt} /></div>
                                    <div className="txt">{txt}</div>

                                    <div className="pinIcon">
                                        <img src={Images.PIN} alt="" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="leftWrapLine"></div>

                        <div className="driveWrap leftWrap">
                            {Object.entries(driveIcons).map(([txt, icon]) => (
                                <div key={icon} className='iconWrap'>
                                    <div className="icon"><img src={Images[icon]} alt={txt} /></div>
                                    <div className="txt">{txt}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="folderInner">
                    </div>
                </div>
            </div >
        </Rnd >
    );
}

//  같은 폴더는 중복 열기 X
//  다른 폴더는 얼마든지 가능
//  여러개 열려있으면 작업표시줄에 hoverdiv 하나 더 표시

export default Folder;