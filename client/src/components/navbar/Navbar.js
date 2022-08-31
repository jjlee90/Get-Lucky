import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link, Navigate, useNavigate } from "react-router-dom"
import "./nav.scss"
import { useSelector, useDispatch } from "react-redux"
import { logout, reset } from "../../features/auth/authSlice"

export default function Navbar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate("/")
  }

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Home</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}