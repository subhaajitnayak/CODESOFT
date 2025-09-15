import { motion } from 'framer-motion'
import { FiLogOut } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/authSlice'

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const isAdminPage = location.pathname.startsWith('/admin')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const handleTitleClick = () => {
    if (isAdminPage) {
      navigate('/admin')
    } else {
      navigate('/')
    }
  }

  return (
    <div className='w-full flex gap-3 flex-col items-center md:flex-row md:justify-between sm:justify-between items-center p-4 md:p-6'>
        <motion.h1
          className='text-white font-bold text-4xl cursor-pointer select-none text-center md:text-left'
          onClick={handleTitleClick}
          whileHover={{
            rotateX: 10,
            rotateY: 10,
            scale: 1.05,
            textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
          }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {isAdminPage ? (
            <>
              <span className='text-green-700'>Quiz </span> Dashboard <span className='text-green-800'>.</span>
            </>
          ) : (
            <><span className='text-green-700'>Quiz </span> Board <span className='text-green-800'>.</span></>
          )}
        </motion.h1>
        <div className='flex flex-row md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0'>
          {token ? (
            <>
              <div className='flex items-center space-x-2'>
                {user?.image ? (
                  <motion.img
                    src={`/uploads/${user.image}`}
                    alt={`${user.username} avatar`}
                    className='w-8 h-8 rounded-full cursor-pointer'
                    onClick={() => navigate('/profile')}
                    title='Go to Profile'
                    whileHover={{
                      rotateY: 15,
                      scale: 1.1,
                      boxShadow: '0px 0px 10px rgba(0,255,0,0.5)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  />
                ) : (
                  <motion.div
                    className='w-8 h-8 rounded-full bg-gray-500 flex items-center justify-center text-white text-sm cursor-pointer'
                    onClick={() => navigate('/profile')}
                    title='Go to Profile'
                    whileHover={{
                      rotateY: 15,
                      scale: 1.1,
                      boxShadow: '0px 0px 10px rgba(0,255,0,0.5)',
                    }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {user?.username?.charAt(0).toUpperCase()}
                  </motion.div>
                )}
                <span className='text-white '>Welcome, {user?.username}</span>
              </div>
              {user?.isAdmin && (
                <motion.div
                  whileHover={{
                    rotateY: 10,
                    scale: 1.05,
                    textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <button className='bg-green-600 text-white p-2 m-2 rounded'><Link to="/admin" className='text-white'>Admin Page </Link></button>
                </motion.div>
              )}
              <motion.button
                onClick={handleLogout}
                className='bg-red-500 text-white p-2 rounded'
                title='Logout'
                whileHover={{
                  rotateX: 10,
                  scale: 1.05,
                  boxShadow: '0px 5px 15px rgba(255,0,0,0.4)',
                }}
                whileTap={{
                  scale: 0.95,
                  rotateX: -5,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <FiLogOut size={20} />
              </motion.button>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{
                  rotateY: 10,
                  scale: 1.05,
                  textShadow: '0px 0px 8px rgba(255,255,255,0.8)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link to="/login" className='text-white'>Login</Link>
              </motion.div>
              <motion.div
                whileHover={{
                  rotateX: 10,
                  scale: 1.05,
                  boxShadow: '0px 5px 15px rgba(0,255,0,0.4)',
                }}
                whileTap={{
                  scale: 0.95,
                  rotateX: -5,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <Link to="/register" className='bg-green-500 text-white px-4 py-2 rounded'>Register</Link>
              </motion.div>
            </>
          )}
        </div>
    </div>
  )
}

export default Navbar
