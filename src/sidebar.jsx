import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './components/Sidebar/SubMenu';
import SubMenu2 from './components/Sidebar/SubMenu2';
import { IconContext } from 'react-icons/lib';
import HomeIcon from '@mui/icons-material/Home';
import SnippetFolderIcon from '@mui/icons-material/SnippetFolder';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import PaymentsIcon from '@mui/icons-material/Payments';
import './Css/file.css';
import { useAuth } from './context/UserAuthContext';
import { collection, doc, getDocs,getDoc} from 'firebase/firestore';
import { db } from "./firebase";


import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';



const Nav = styled.div`
  background: #15171c;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  align-items: center;
  width: 100px;
  background-color: transparent;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

  @media (max-width: 768px) {
    height: 9%;
    box-shadow: 0 0px 0px 0 rgba(0,0,0,0.2);
  }
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  top: 0;
  position: absolute;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
`;


const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
  margin-top: 80px;
  overflow: scroll;
  scrollbar-width: none;
  scrollbar-color: transparent;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Sidebar = () => {

  const [SidebarData, setSidebarData] = useState([
    {
      title: 'Home',
      path: '/overview',
      icon: <AiIcons.AiFillHome />,

    },
    {
      title: 'Folders',
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,

      subNav: [
      ]
    },
    {
      title: 'Subscriptions',
      path: '/subscription',
      icon: <FaIcons.FaCartPlus />
    },
    {
      title: 'Settings',
      path: '/messages',
      icon: <FaIcons.FaEnvelopeOpenText />,

    },
    {
      title: 'Support',
      path: '/support',
      icon: <IoIcons.IoMdHelpCircle />
    }
  ]);

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const { currentuser } = useAuth();
  const [userData, setUserData] = useState(null);
  //UPDATES DEPENDING ON USER "FILE-Storage" DOCS
  useEffect(() => {
    if (!currentuser) {
      setUserData([]);
      return;
    }
    // USER ID & FIRESTORE REF
    const currentUserId = currentuser.uid;
    const colRef = collection(db, "users", currentUserId, "File-Storage");
    // Fetch all documents (folders) in the subcollection
    getDocs(colRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          SidebarData[1].subNav.push({ path: `/folder/${doc.id}`, ...doc.data() });
        });
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

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars style={{color:"black"}} onClick={showSidebar} />
          </NavIcon>
          <div className='nav-bar-menu' >

          
            <div style={{display:"flex",flexDirection:"column",marginLeft:"auto",marginRight:"auto",height:300,justifyContent:"space-between",position:"absolute",top:200}}>
              <Link to={"/"}>
              <HomeIcon />
              </Link>
              <hr />
              <Link to={"/memory"}>
              <SnippetFolderIcon />
              </Link>
              <hr />
              <Link to={"/policies"}>
              <PrivacyTipIcon />
              </Link>
              <hr />
              <Link to={"/subscription"}>
              <PaymentsIcon />
              </Link>
            </div>

            <div style={{display:"flex",flexDirection:"column",marginLeft:"auto",marginRight:"auto",marginTop:100,alignItems:"center",position:"absolute",bottom:30}}>
              <Avatar alt="Remy Sharp" imgProps={{crossOrigin:"anonymous"}} style={{border:"2px solid black",width:50,height:50}} src={userData.profilePictureURL} />
              <hr />
              <LogoutIcon />
            </div>

          </div>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;