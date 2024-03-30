import '../styles/startPopup.css'
import StartPopupInner from '../components/innerComponents/StartPopupInner';

import { LuUser2 } from "react-icons/lu";
import { CiPower } from "react-icons/ci";

function StartPopup() {
    return (
        <div className="startPopupWrap">
            <div className="startPopup">
                <StartPopupInner />
            </div>

            <div className="startBottom">
                <div className="bttomProfileWrap">
                    <div className="bottomProfile">
                        <div className="startProfile"><LuUser2 /></div>
                        <div className="startName">이빈</div>
                    </div>
                    <div className="powerBtn">
                        <div className="powerBtnWrap">
                            <div className="powerIcon">
                                <CiPower />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default StartPopup;