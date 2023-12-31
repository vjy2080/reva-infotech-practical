import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBListGroup } from 'mdb-react-ui-kit';
import GoogleMapReact from 'google-map-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';



function Home() {
  const [user, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [userList, setUserList] = useState([]);

  const navigate = useNavigate();

  const fetchAPIData = async () => {
    try {
      const response = await fetch('http://localhost:3005/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCurrentUserData = () => {
    const storedCurrentUser = localStorage.getItem('data');
    setCurrentUser(JSON.parse(storedCurrentUser));
  };

  const filterUserData = () => {
    let filteredUsers = user.filter(x => !currentUser.filter(y => y.id === x.id).length);
    setUserList(filteredUsers);
  };

  const [basicModal, setBasicModal] = useState(false);
  const [modalStates, setModalStates] = useState([]);

  const toggleOpen = (index) => {
    const updatedModalStates = [...modalStates];
    updatedModalStates[index] = !updatedModalStates[index];
    setModalStates(updatedModalStates);
    navigate("/home");
    filterUserData();
  };


  // Fetch API data when the component mounts
  useEffect(() => {
    fetchAPIData();
  }, []);

  // Fetch current user data when the component mounts
  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  // Update user list when user or current user changes
  useEffect(() => {
    filterUserData();
  }, [user, currentUser]);

  const AnyReactComponent = ({ text }) => <div>{text}</div>;


  const defaultProps = {
    center: {
      "lat": 28.63409,
      "lng": 77.21693
    },
    zoom: 11
  };




  return (
    <>
      <div className='container'>
        <div className="row m-3">
          <h3 className='text-center'>List of Users</h3>
          {userList.map((user, index) => (
            <div className="col-sm p-3" key={index} open={basicModal}>
              {/* <Link to="/map"> */}

              <MDBCard className='border border-info p-0'>
                {/* <MDBCardBody onClick={toggleOpen}> */}
                <MDBCardBody onClick={() => toggleOpen(index)}>
                  <MDBListGroup flush="true">
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone No: {user.phoneNo}</p>
                    <p>Address: {user.address}</p>
                  </MDBListGroup>


                  {/* </Link> */}
                  {/* <MDBBtn onClick={toggleOpen}>LAUNCH DEMO MODAL</MDBBtn> */}
                  {/* <MDBModal open={basicModal} setopen={setBasicModal} tabIndex='-1' > */}
                  <MDBModal open={modalStates[index]} setopen={(value) => {
                    const updatedModalStates = [...modalStates];
                    updatedModalStates[index] = value;
                    setModalStates(updatedModalStates);
                  }} tabIndex='-1'>
                    <MDBModalDialog>
                      <MDBModalContent>
                        <MDBModalHeader>
                          <MDBModalTitle>{user.name}</MDBModalTitle>
                          <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                          <div style={{ height: '50vh', width: '100%' }}>
                            <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyCinmVECSsyEfQEAjPPacUo6P0ELQEOttg" }}
                              defaultCenter={user.position}
                              defaultZoom={defaultProps.zoom}
                            >
                              <AnyReactComponent
                                lat={59.955413}
                                lng={30.337844}
                                text="My Marker"
                              />
                            </GoogleMapReact>
                          </div>
                        </MDBModalBody>

                        <MDBModalFooter>
                          <MDBBtn color='secondary' onClick={toggleOpen}>
                            Closes
                          </MDBBtn>
                          {/* <MDBBtn>Save changes</MDBBtn> */}
                        </MDBModalFooter>
                      </MDBModalContent>
                    </MDBModalDialog>
                  </MDBModal>
                </MDBCardBody>

              </MDBCard>

            </div>
          ))}
        </div >
      </div >
    </>
  );
}

export default Home;
