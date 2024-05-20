import { Images } from "../../../images/Images";
import { IoIosSearch } from "react-icons/io";

function MidHeader({ directory }) {

    const transDir = (dir) => ({
        '홈': 'HOMEICON',
        '갤러리': 'GALLERYICON',
        '네트워크': 'NETWORKICON'
    }[dir] || 'DESKICON');

    const lastDir = directory[directory.length - 1]
    const transedLastDir = transDir(lastDir);

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
                    <div className="icon"> <img src={Images[transedLastDir]} alt={transedLastDir} /></div>
                    <div className="arrow" id='btn'><img src={Images.DIRARROW} alt="" /></div>
                    <div className="txt" id='btn'>{directory}</div>
                </div>

                <div className="search">
                    <div className="searchWrap">
                        <input type="search" placeholder={`${lastDir} 검색`} />
                        <div className="searchIcon"><IoIosSearch /></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MidHeader;