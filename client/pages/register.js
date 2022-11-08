import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal } from 'antd';
import Link from 'next/Link';
import { UserContext } from '../context';
import AuthForm from '../components/forms/AuthForm';
import { useRouter } from 'next/router';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const [state] = useContext(UserContext);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(name,email,password,secret);
    try {
      setLoading(true);
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
        secret,
      });
      setName('');
      setEmail('');
      setPassword('');
      setSecret('');
      setOk(data.ok);
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };

  if (state && state.token) router.push('/');

  return (
    <div className='container-fluid'>
      <div className='row py-5 text-light bg-default-image'>
        <div className='col text-white text-center '>
          <h1 className='regg'>Register page</h1>
        </div>
      </div>
      {/* {loading ? <h1>Loading</h1> : ""} */}
      <div className='row py-5'>
        <div className='col-md-6 offset-md-3'>
          <AuthForm
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

export default Register;
