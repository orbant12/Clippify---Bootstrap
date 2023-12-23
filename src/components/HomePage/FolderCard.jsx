
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { Link } from 'react-router-dom';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import "../../Css/folderCard.css"
const FolderCard = ({ folder }) => {
return(
<div className="ag-courses_item" key={folder.id}>
        <Link to={`/folder/${folder.id}`}>
            <div className="ag-courses-item_link">
            <div className="ag-courses-item_bg" style={{background: folder.color}} />
            <div className="ag-courses-item_title" >{folder.title}</div>
            <div className='ag-bottom'>
                <div className="ag-courses-item_date-box">
                <h3>{folder.files_count} Files</h3>
                <SnippetFolderIcon className='ag-folder-icon'/>
                </div>
                <div className='auto-sync'>
                <CloudSyncIcon className='ag-auto-sync'/>
                <h6>Auto Sync</h6>
                </div>
            </div>
            </div>
        </Link>
</div>
)
}

export default FolderCard;