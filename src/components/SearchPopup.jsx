import '../styles/searchPopup.css'
import { HiOutlineSearch } from "react-icons/hi";
import { RiShareBoxLine } from "react-icons/ri";

function SearchPopup() {
    return (
        <div className="searchPopup">
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
                        <div className="listWrap">
                            <div className="listIcon"></div>
                            <div className="listName">ChatHSF</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap">
                            <div className="listIcon"></div>
                            <div className="listName">Sebbung 커뮤니티</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap">
                            <div className="listIcon"></div>
                            <div className="listName">Windows 11</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap">
                            <div className="listIcon"></div>
                            <div className="listName">세명랜드</div>
                            <RiShareBoxLine />
                        </div>
                        <div className="listWrap">
                            <div className="listIcon"></div>
                            <div className="listName">프로젝트</div>
                            <RiShareBoxLine />
                        </div>
                    </div>
                </div>

                <div className="activity">
                    <span className='title'>
                        이빈에 대해 알아보기
                    </span>
                </div>
            </div>
        </div>
    );
}

export default SearchPopup;