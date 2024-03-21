import '../styles/searchPopup.css'
import { HiOutlineSearch } from "react-icons/hi";

function SearchPopup() {
    return (
        <div className="searchPopup">
            <div className="search">
                <div className="searchWrap">
                    <HiOutlineSearch />
                    <input type="text" placeholder='여기에 입력하여 검색' />
                </div>
            </div>
        </div>
    );
}

export default SearchPopup;