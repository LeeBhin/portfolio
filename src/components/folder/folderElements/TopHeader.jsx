import { Images } from "../../../images/Images";

import { PiPlus, PiMinus } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
import { TbSquare } from "react-icons/tb";

function TopHeader({ closeFolder, minFolder, directory }) {
    const lastDir = directory[directory.length - 1]

    const minHandle = () => {
        minFolder();
    }

    const closeHandle = () => {
        closeFolder();
    }

    const transDir = (dir) => {
        const dirMap = {
            '홈': 'HOME',
            '갤러리': 'GALLERY',
            '자격증': 'CERTIFICATE',
            '바탕 화면': 'DESKTOP',
            '다운로드': 'DOWNLOAD',
            '문서': 'DOCUMENT',
            '사진': 'PICTURE',
            '음악': 'MUSIC',
            '동영상': 'VIDEO',
            'BenDrive': 'DRIVE',
            '내 PC': 'MYPC',
            '네트워크': 'NETWORK'
        };

        return dirMap[dir] || dir;
    };
    const transedLastDir = transDir(lastDir);

    return (
        <>
            <div className="folderHeader">
                <div className="topHeader">
                    <div className="tabWrap">
                        <div className="folderTab">
                            <svg id="folderTab" viewBox="0 0 250 31" shapeRendering="geometricPrecision" textRendering="geometricPrecision">
                                <path d="M34.806874,71.257641q3.219742-.482265,4.666691-2.973539.451881-1.42284,0-18.48985q0-6.93695,6.434401-9.522052.911221,0,227.804183,0q7.285117,1.768101,7.285117,9.522052c0,.000001,0,12.324742,0,17.335137c0,3.137052,3.668328,4.128252,3.668328,4.128252q0,0-249.85872,0Z" transform="translate(-34.740162-40.2722)" fill="#f0f5f9" strokeWidth="0.682" />
                            </svg>
                            <div className="iconWrap">
                                <div className="tabIcon">
                                    <img src={Images[transedLastDir]} alt={transedLastDir} />
                                </div>
                                <div className="iconTxt">{lastDir}</div>
                            </div>

                            <div className="tabClose" onClick={closeHandle}><img src={Images.FOLDERTABX} alt="tabClose" /></div>
                        </div>
                        <div className="tabPlus"><PiPlus /></div>
                    </div>
                </div>

                <div className="minMaxWrap">
                    <div className="minBtn" onClick={minHandle}><PiMinus size={"14px"} /></div>
                    <div className="maxBtn"><TbSquare size={"12px"} /></div>
                    <div className="closeBtn" onClick={closeHandle}><GrClose size={"12px"} /></div>
                </div>
            </div>
        </>
    );
}

export default TopHeader;