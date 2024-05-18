import { Images } from "../../../images/Images";

import { GrFormDown } from "react-icons/gr";
import { FiMoreHorizontal } from "react-icons/fi";

function BotHeader() {

    return (
        <>
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
        </>
    );
}

export default BotHeader;