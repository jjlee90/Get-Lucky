import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dealer3 from "../../images/5.png"
import bjPlayer from "../../images/bj-player.png"
import "./dashboard.scss"
function Dashboard() {
  const navigate = useNavigate()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <div className="container playArea">
      {/* <h1>Welcome {user && user.name}</h1> */}
      <div className="dealerTable">
        <img src={dealer3} />
      </div>

      <div className="userContainer">
        <div className="playerContainer">
          <img src={bjPlayer} />
          {/* <p>{user.name}</p> */}
          <p>bankroll</p>
        </div>

        <div className="actionContainer">
          <div className="actionBtns">
            <button>Bet</button>
            <button>Yes</button>
            <button>No</button>
            <button>Hit</button>

            <button>Stand</button>
            <button>Split</button>
            <button>Double</button>
          </div>

          <div className="chipContainer">
            <button className="grnChip">
              <p>$25</p>
            </button>

            <button className="bluChip">
              <p>$50</p>
            </button>

            <button type="button" className="blkChip">
              <p>$100</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
