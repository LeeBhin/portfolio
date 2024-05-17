import { HiOutlineSearch, HiLocationMarker } from "react-icons/hi";
import { RiShareBoxLine } from "react-icons/ri";

function SearchPopupInner() {
    const URL = ['https://highschfinder.netlify.app/','https://sebuungcm.netlify.app','https://scented-subdued-rose.glitch.me','https://leebhin.netlify.app']

    const OpenURL = (num) => {
        window.open(URL[num], '_blank');
      };
    return (
        <>
            <div className="search">
                <div className="searchWrap">
                    <HiOutlineSearch />
                    <input type="text" placeholder='여기에 입력하여 검색' />
                    <div className="searchImg"></div>
                </div>
            </div>

            <div className="searchInnerWrap">
                <div className="shortCut">
                    <span className='title'>
                        작품
                    </span>

                    <div className="shortList">
                        <div className="listWrap" onClick={() => OpenURL(0)}>
                            <div className="listIcon"></div>
                            <div className="listName">ChatHSF</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap" onClick={() => OpenURL(1)}>
                            <div className="listIcon"></div>
                            <div className="listName">Sebbung 커뮤니티</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap" onClick={() => OpenURL(2)}>
                            <div className="listIcon"></div>
                            <div className="listName">None-DB-Login</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap" onClick={() => OpenURL(3)}>
                            <div className="listIcon"></div>
                            <div className="listName">Windows 11</div>
                            <RiShareBoxLine />
                        </div>

                    </div>
                </div>

                <div className="activity">
                    <span className='title'>
                        당신을 위한 추천
                    </span>

                    <div className="aboutMe">
                        <div className="aboutWrap">
                            <div className="iconAndBg">
                                <div className="aboutIcon"></div>
                            </div>

                            <div className="aboutTxt">
                                Profile
                            </div>
                        </div>
                        <div className="aboutWrap">
                            <div className="iconAndBg">
                                <div className="aboutIcon"></div>
                            </div>

                            <div className="aboutTxt">
                                Github
                            </div>
                        </div>
                        <div className="aboutWrap">
                            <div className="iconAndBg">
                                <div className="aboutIcon"></div>
                            </div>

                            <div className="aboutTxt">
                                Contact
                            </div>
                        </div>
                    </div>

                    <div className="myImg">
                        <span className='source'>
                            출처: 이빈
                        </span>


                        <div className="myImages">
                            <div className="imageTxt"><HiLocationMarker />수상, 서울특별시교육청</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchPopupInner;