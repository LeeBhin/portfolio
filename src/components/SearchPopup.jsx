import '../styles/searchPopup.css'
import SearchPopupInner from './innerComponents/SearchPopupInner';
function SearchPopup() {
    return (
        <div className="searchPopup">
            <SearchPopupInner />
        </div>
    );
}

export default SearchPopup;