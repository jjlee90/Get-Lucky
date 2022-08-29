import { useState, useEffect } from "react"
import { FaUser } from "react-icons/fa"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  })

  const { name, email, password, password2 } = formData
  const onChange = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <section>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className="form">
        <form>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            placeholder="Enter your name"
            onChange={onChange}
          />
        </form>
      </section>
    </>
  )
}
