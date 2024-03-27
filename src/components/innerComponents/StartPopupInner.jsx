import { HiOutlineSearch } from "react-icons/hi";

function StartPopupInner() {
    const skillIcon = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']
    const skillName = ['HTML', 'CSS', 'JvaScript', 'Python', 'React', 'Java', 'JSP', 'MySQL', 'Github', 'Photoshop', 'PowerPoint', 'Excel', 'Word', 'Access', '한컴오피스 한글', 'Visual Studio Code', 'Brackets', 'IntelliJ IDEA', 'Firebase', 'Socket.io', 'Express.js', 'Notion', 'Premiere Pro', 'After Effects']
    const photoIcon = ['', '', '', '', '', '']
    const photoName = ['1', '2', '3', '4', '5', '6']
    const photoDate = ['1일 전', '1일 전', '1일 전', '1일 전', '1일 전', '1일 전']

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
                                <img className="listIcon" src={item} alt={item + 'icon'} />
                                <div className="listName">{skillName[index]}</div>
                            </div>
                        ))}

                    </div>
                </div>

                <span className='title' id="photoTitle">
                    사진
                </span>
                <div className="photos">
                    <div className="photoList">
                        {photoIcon.map((item, index) => (
                            <div className="photoWrap" key={index}>
                                <img className="photoIcon" src={item} alt={item + 'icon'} />
                                <div className="photoInfo">
                                    <div className="photoName">{photoName[index]}</div>
                                    <div className="photoDate">{photoDate[index]}</div>
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