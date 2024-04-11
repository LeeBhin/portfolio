import '../styles/folder.css'

function Folder({ }) {
    return (
        <div className="folder">
            <div className="headerWrap">
                <div className="folderHeader">
                    <div className="iconWrap">
                        <div className="icon">icon</div>
                        <div className="folderName">name</div>
                    </div>

                    <div className="btnWrap">
                        <div className="miniBtn">ㅡ</div>
                        <div className="maxBtn">ㅁ</div>
                        <div className="closeBtn">X</div>
                    </div>
                </div>

                <div className="folderNav">
                    <div className="newWrap">
                        <div className="newIcon">+</div>
                        <div className="newTxt">New</div>
                        <div className="newDrop">^</div>
                    </div>

                    <div className="iconWrap">
                        <div className="cutIcon">C</div>
                        <div className="copyIcon">Cp</div>
                        <div className="pasteIcon">P</div>
                        <div className="renameIcon">R</div>
                        <div className="shareIcon">S</div>
                        <div className="deleteIcon">D</div>
                    </div>

                    <div className="viewWrap">
                        <div className="sortBtn" id='SVWrap'>
                            <div className="sortIcon">ㅗㅜ</div>
                            <div className="sortTxt">Sort</div>
                            <div className="sortDrop">^</div>
                        </div>
                        <div className="viewBtn" id='SVWrap'>
                            <div className="viewIcon">ㅁ</div>
                            <div className="viewTxt">View</div>
                            <div className="viewDrop">^</div>
                        </div>
                    </div>

                    <div className="etcWrap">
                        <div className="etcBtn">* * *</div>
                    </div>
                </div>
            </div>

            <div className="folderInner">
                <div className="moveTool">
                    <div className="moveIcons">
                        <div className="prev">←</div>
                        <div className="next">→</div>
                        <div className="drop">^</div>
                        <div className="mvUp">↑</div>
                    </div>

                    <div className="route">
                        <div className="fIcon"></div>
                        <div className="routeElement">Desktop</div>
                    </div>
                </div>
            </div>
            {/*
                같은 폴더는 중복 열기 X
                다른 폴더는 얼마든지 가능
                여러개 열려있으면 작업표시줄에 hoverdiv 하나 더 표시
            */}
        </div>
    );
}

export default Folder;