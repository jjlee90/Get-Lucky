import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import dealer3 from "../../images/5.png"
import bjPlayer from "../../images/bj-player.png"
import "./dashboard.scss"
function Dashboard() {
  const navigate = useNavigate()

  const [getCard, setGetCard] = useState("")
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
    async function getCards() {
      const response = await fetch(
        `http://localhost:3000/api/cards/shufflecards`
      )
      var resData = await response.json()
      console.log(resData)
      setGetCard(resData)
    }
    getCards()
  }, [user, navigate])

  return (
    <div
      className="container playArea"
      style={{
        backgroundImage: `url(${dealer3})`,
      }}
    >
      <div className="dealerTable">
        {/* <img src={dealer3} /> */}

        <img className="pokerCard" src={getCard[2]?.image} />
      </div>

      {/* <div className="userContainer">
        <div className="playerContainer">
          <img src={bjPlayer} />
          <p>{user?.name ? user.name : ""}</p>
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
      </div> */}
    </div>
  )
}

export default Dashboard
