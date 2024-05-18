import { Images } from "../../../images/Images";

import { PiPlus, PiMinus } from "react-icons/pi";
import { GrClose } from "react-icons/gr";
import { TbSquare } from "react-icons/tb";

function TopHeader({ closeFolder }) {

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
                    <div className="closeBtn" onClick={closeFolder}><GrClose size={"12px"} /></div>
                </div>
            </div>
        </>
    );
}

export default TopHeader;