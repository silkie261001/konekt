import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import Link from 'next/Link';
import { UserContext } from '../../../context';
import AuthForm from '../../../components/forms/AuthForm';
import { useRouter } from 'next/router';

const ProfileUpdate = () => {
  const [username, setUsername] = useState('');
  const [about, setAbout] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);

  const router = useRouter();

  useEffect(() => {
    if (state && state.user) {
      //   console.log('user from state ', state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
    }
  }, [state && state.user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,secret);
    try {
      setLoading(true);
      const { data } = await axios.put(`/profile-update`, {
        username,
        about,
        name,
        email,
        password,
        secret,
      });
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  //   if (state && state.token) router.push('/');

  return (
    <div className='container-fluid'>
      <div className='row py-5 text-light bg-default-image'>
        <div className='col text-white text-center '>
          <h1 className='regg'>Profile</h1>
        </div>
      </div>
      <div className='row py-5'>
        <div className='col-md-6 offset-md-3'>
          <AuthForm
            profileUpdate={true}
            username={username}
            setUsername={setUsername}
            about={about}
            setAbout={setAbout}
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            // setLoading ={setLoading}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <Modal
            title='Congratulations!'
            open={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <div>You have successfully registered</div>
            <Link href='/login'>
              <a className='btn btn-primary btn-sm'>Login</a>
            </Link>
          </Modal>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div className='text-center'>
            Already Registered?
            <Link href='/login'>
              <a>Login</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
