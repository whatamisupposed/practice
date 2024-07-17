import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserProfile } from '../actions/userActions';

const ProfileScreen = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.username || success) {
        dispatch(getUserDetails('profile'));
      } else {
        setUsername(user.username);
        setEmail(user.email);
        setFirstname(user.firstname);
        setLastname(user.lastname);
        setTelephone(user.telephone);
        setAddress(user.address);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({ id: user._id, username, email, firstname, lastname, telephone, address, password }));
  };

  return (
    <div>
      <h1>Profile</h1>
      {error && <h3>{error}</h3>}
      {loading && <h3>Loading...</h3>}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter first name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter last name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter telephone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileScreen;
