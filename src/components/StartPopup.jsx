import '../styles/startPopup.css'
import StartPopupInner from '../components/innerComponents/StartPopupInner';

import { LuUser2 } from "react-icons/lu";

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
                </div>
            </div>
        </div>
    );
}

export default StartPopup;