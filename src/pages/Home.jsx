import '../styles/home.css'
import Taskbar from "../components/Taskbar";
import SearchPopup from '../components/SearchPopup';
import { useEffect, useState } from 'react';

function Home() {
    const [isSearchOn, setIsSearchOn] = useState(false)

    const a = isSearchOn => {
        setIsSearchOn(isSearchOn)
    }

    useEffect(() => {
        console.log(isSearchOn)
    }, [isSearchOn]);

    return (
        <div className="home">
            <div className="background">
            </div>
            <Taskbar a={a} />
            <SearchPopup />
        </div>
    );
}

export default Home;