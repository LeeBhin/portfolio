import '../styles/folder.css'
import { Images } from '../images/Images';

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

                            <div className="tabClose">X</div>
                        </div>
                        <div className="tabPlus">+</div>
                    </div>
                </div>

                <div className="minMaxWrap">
                    <div className="minBtn">ㅡ</div>
                    <div className="maxBtn">ㅁ</div>
                    <div className="closeBtn">X</div>
                </div>
            </div>
            <div className="midHeader">
                <div className="moveWrap">
                    <div className="prev">→</div>
                    <div className="next">←</div>
                    <div className="up">↑</div>
                    <div className="reload">○</div>
                </div>
            </div>
        </div>
    );
}

//  같은 폴더는 중복 열기 X
//  다른 폴더는 얼마든지 가능
//  여러개 열려있으면 작업표시줄에 hoverdiv 하나 더 표시

export default Folder;