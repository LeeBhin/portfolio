import { Images } from "../../../images/Images";

import FolderLeebhin from "../folderInners/FolderLeebhin";
import FolderCertificate from "../folderInners/FolderCertificate";
import FolderPicture from "../folderInners/FolderPicture";
import FolderPortfolio from "../folderInners/FolderPortfolio";
import FolderHome from "../folderInners/FolderHome";

function FolderBody({ folderInner, setFirstDir, transInner, directory, setDouble }) {

    const homeIcons = { '홈': 'HOME', '갤러리': 'GALLERY', '자격증': 'CERTIFICATE' };
    const pinnedIcons = { '바탕 화면': 'DESKTOP', '다운로드': 'DOWNLOAD', '문서': 'DOCUMENT', '사진': 'PICTURE', '음악': 'MUSIC', '동영상': 'VIDEO' };
    const driveIcons = { 'BenDrive': 'DRIVE', '내 PC': 'MYPC', '네트워크': 'NETWORK' };

    const components = {
        FolderHome,
        FolderLeebhin,
        FolderCertificate,
        FolderPortfolio,
        FolderPicture
    };

    const InnerComponent = components[folderInner.replace(/\d+$/, '')];

    const navClick = (txt) => {
        setFirstDir(transInner(txt));
        setDouble(prevDouble => prevDouble.filter(item => item !== transInner(folderInner)));
    }

    return (
        <>
            <div className="folderBody">

                <div className="leftHeader">
                    <div className="homeWrap leftWrap">
                        {Object.entries(homeIcons).map(([txt, icon]) => (
                            <div key={icon} className='iconWrap' onClick={() => navClick(txt)}>
                                <div className="icon"><img src={Images[icon]} alt={txt} /></div>
                                <div className="txt">{txt}</div>
                            </div>
                        ))}
                    </div>

                    <div className="leftWrapLine"></div>

                    <div className="pinnedWrap leftWrap">
                        {Object.entries(pinnedIcons).map(([txt, icon]) => (
                            <div key={icon} className='iconWrap' onClick={() => navClick(txt)}>
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
                            <div key={icon} className='iconWrap' onClick={() => navClick(txt)}>
                                <div className="icon"><img src={Images[icon]} alt={txt} /></div>
                                <div className="txt">{txt}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="folderInner">
                    <InnerComponent />
                    <div className="countAndView">
                        <span className="count">0개 항목</span>

                        <span className="selected">0개 항목 선택함 0바이트</span>

                        <div className="footerWrap">
                            <img src={Images.LINEVIEW} alt="" />
                            <img src={Images.BIGVIEW} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FolderBody;