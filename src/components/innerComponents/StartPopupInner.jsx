import { HiOutlineSearch } from "react-icons/hi";
import { Images } from "../../images/Images";

function StartPopupInner() {
    const skillIcon = [Images.HTML, Images.CSS, Images.JS, Images.JQUERY, Images.PYTHON, Images.REACT, Images.VUE, Images.NEXT, Images.JAVA, Images.JSP, Images.SQL, Images.FIREBASE, Images.SOCKET, Images.EXPRESS, Images.GITHUB, Images.VSCODE, Images.BRACKETS, Images.INTELLIJ, Images.PHOTOSHOP, Images.PPT, Images.EXCEL, Images.WORD, Images.ACCESS, Images.HANGEUL]
    const skillName = ['HTML', 'CSS', 'JavaScript', 'Jquery', 'Python', 'React.js', 'Vue.js', 'Next.js', 'Java', 'JSP', 'OracleSQL', 'Firebase', 'Socket.io', 'Express.js', 'Github', 'Visual Studio Code', 'Brackets', 'IntelliJ IDEA', 'Photoshop', 'PowerPoint', 'Excel', 'Word', 'Access', '한컴오피스 한글']
    const photoIcon = [Images.HRDK, Images.HRDK, Images.KCCI, Images.KCCI, Images.HRDK, Images.KPC]
    const photoName = ['정보기기운용기능사', '웹디자인기능사', '컴퓨터활용능력 1급', '컴퓨터활용능력 2급', '정보처리기능사', 'GTQ 1급']
    const photoDate = ['2023.07.05.', '2022.09.08.', '2022.04.08.', '2021.03.05.', '2019.12.26.', '2019.05.17.']

    function timeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.round((now - date) / 1000);
        const minutes = Math.round(seconds / 60);
        const hours = Math.round(minutes / 60);
        const days = Math.round(hours / 24);
        const weeks = Math.round(days / 7);
        const months = Math.round(days / 30);
        const years = Math.round(days / 365);

        if (minutes < 60) return `${minutes}분 전`;
        else if (hours < 24) return `${hours}시간 전`;
        else if (days < 7) return `${days}일 전`;
        else if (weeks < 5) return `${weeks}주 전`;
        else if (months < 12) return `${months}달 전`;
        else return `${years}년 전`;
    }

    return (
        <>
            <div className="start">
                <div className="startWrap">
                    <HiOutlineSearch />
                    <input type="text" placeholder='앱, 언어 및 작품 검색' />
                    <div className="startImg"></div>
                </div>
            </div>


            <div className="startInnerWrap">
                <span className='title'>
                    고정됨
                </span>
                <div className="skills">
                    {/* <span className='title'>
                        모든 앱 &gt;
                    </span> */}

                    <div className="skillList">
                        {skillIcon.map((item, index) => (
                            <div className="listWrap" key={index}>
                                <img className="listIcon" src={item} alt={'icon ' + index} />
                                <div className="listName">{skillName[index]}</div>
                            </div>
                        ))}

                    </div>
                </div>

                <span className='title' id="photoTitle">
                    자격증
                </span>
                <div className="photos">
                    <div className="photoList">
                        {photoIcon.map((item, index) => (
                            <div className="photoWrap" key={index}>
                                <img className="photoIcon" src={item} alt={item + 'icon'} />
                                <div className="photoInfo">
                                    <div className="photoName">{photoName[index]}</div>
                                    <div className="photoDate">{timeAgo(photoDate[index])}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>

        </>
    );
}

export default StartPopupInner;