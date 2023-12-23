//REACT & CONTEXTS
import React, { useState, useEffect  } from 'react';
import { useAuth } from '../context/UserAuthContext'
import { Link } from 'react-router-dom';
//FIREBASE
import { collection, doc, getDocs,query,limit,getDoc} from 'firebase/firestore';
import { db } from "../firebase";
//CSS

//ASSETS
import DarkVariantExample from "../components/HomePage/Carousel"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import RecentCard from '../components/HomePage/RecentCard';
import FolderCard from '../components/HomePage/FolderCard';
//ICONS
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ScreenshotIcon from '@mui/icons-material/Screenshot';
import TwitterIcon from '@mui/icons-material/Twitter';
import BasicSpeedDial from "../assets/FileAdd/addBtn"

export function Home({folderUrl}) {


//<******************************VARIABLES*******************************>

//COMMON VARIABLES
const { currentuser } = useAuth();

//FOLDERS
const [folders, setFolders] = useState([]);
const [recentFiles, setRecentFiles] = useState([]);
const [userData, setUserData] = useState([]);

//<******************************FUNCTIONS*******************************>

//UPDATES DEPENDING ON USER "FILE-Storage" DOCS
useEffect(() => {
  if (!currentuser) {
    setFolders([]);
    return;
  }
  // USER ID & FIRESTORE REF
  const currentUserId = currentuser.uid;
  const colRef = collection(db, "users", currentUserId, "File-Storage");
  // Fetch all documents (folders) in the subcollection
  getDocs(colRef)
    .then((querySnapshot) => {
      const userFolders = [];
      querySnapshot.forEach((doc) => {
        userFolders.push({ id: doc.id, ...doc.data() });
      });
    setFolders(userFolders);
    })
    .catch((error) => {
      console.error("Error fetching user folders: ", error);
    });
    //FETCH USER DATA
    const fetchData = async () => {
      try {
        if (currentuser) {
          const currentUserId = currentuser.uid;
          const userDocRef = doc(db, "users", currentUserId);
          const docSnapshot = await getDoc(userDocRef);
          if (docSnapshot.exists()) {
            // Document exists, retrieve its data
            const elementData = docSnapshot.data();
            setUserData(elementData);
          } else {
            console.log("Document does not exist.");
            setUserData(null); // Set to null or handle accordingly
          }
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };
    // Call fetchData
    fetchData();
}, [currentuser]);

//RECENTLY ADDED
useEffect(() => {
  const fetchRecent = async () => {
    try{
      if (userData !== null) {
        const fileChildrenRef = userData.recent;
        folderUrl(userData.folder_id)
        const docSnapshot = await getDoc(fileChildrenRef)
        if (docSnapshot.exists()) {
          // Document exists, retrieve its data
          const elementData = docSnapshot.data();
          setRecentFiles(elementData);
          console.log(elementData.folder_id)
          folderUrl(elementData.folder_id)
        } else {
          console.log("Document does not exist.");
          setRecentFiles([]); // Set to null or handle accordingly
        }
      }
    } catch(err) {
      console.log(err)
    }
  }
  fetchRecent();
}, [userData]);


return (
<Container  >
  <Row>
    <Col>
      <DarkVariantExample />
    </Col>
  </Row>
  <Row>
    <Col>
      <h1>Recently Openned<Badge style={{marginLeft:10}} bg="secondary">New</Badge> </h1>  
    </Col>
  </Row>
  <Row>
    <Col>
      <RecentCard image={recentFiles.img} title={recentFiles.title} recentNumber={recentFiles.related_count} size={recentFiles.video_size} />
    </Col>
  </Row>
  <Row>
    <Col>
    <h1>Your Folders<Badge style={{marginLeft:10}} bg="secondary">New</Badge> </h1>  
    </Col>
  </Row>
  <Row>
    <Col>
    <div className="ag-courses_box" >
        {/*ADDED DOM*/}
        {folders.length === 0 ? (
          <div className="no-folder">
            <a href="/memory" className='no-folder-a' >No Folders Yet <br />
              <div className='inline_txt'><CreateNewFolderIcon sx={{mt:3,pt:0}}/></div>
            </a>
          </div>
        ) : (
          folders.map((folderD) => 
            folderD && folderD.id ? (
              <FolderCard folder={folderD} />
            ):null
          )
        )}
      </div>
    </Col>
  </Row>
</Container>

)}


