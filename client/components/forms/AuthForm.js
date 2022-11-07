import { SyncOutlined } from '@ant-design/icons';

const AuthForm = ({
  name,
  handleSubmit,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    {page !== 'login' && (
      <div className='form-group p-1'>
        <small>
          <label className='text-muted'> Your Name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type='text'
          className='form-control'
          placeholder='Enter Name'
        />
      </div>
    )}

    <div className='form-group p-1'>
      <small>
        <label className='text-muted'>Email Id</label>
      </small>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='email'
        className='form-control'
        placeholder='Enter email'
      />
    </div>

    <div className='form-group p-1'>
      <small>
        <label className='text-muted'>Password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        className='form-control'
        placeholder='Enter password'
      />
    </div>

    {page !== 'login' && (
      <>
        <div className='form-group p-1'>
          <small>
            <label className='text-muted'>Pick a question</label>
          </small>
          <select className='form-control'>
            <option>What is your favourite color</option>
            <option>What is your best friends name</option>
            <option>What city you born</option>
          </select>

          <small className='form-text text-muted'>
            You can use this to reset your password if forgotten
          </small>
        </div>
        <div className='form-group'>
          <input
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            type='text'
            className='form-control'
            placeholder='Your answer'
          />
        </div>
      </>
    )}

    <div className='form-group  p-2'>
      <button
        disabled={
          page === 'login'
            ? !email || !password
            : !name || !email || !secret || !password
        }
        className='btn btn-primary col-12'
      >
        {loading ? <SyncOutlined spin className='py-1' /> : 'Submit'}
      </button>
    </div>
  </form>
);

export default AuthForm;
