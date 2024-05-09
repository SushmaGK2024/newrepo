import { useState } from 'react'

const ContactUs = () => {
  const [name, setName] = useState('')
  const [rollno, setRollno] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // send the form data to the server
    console.log(`Name: ${name}`)
    console.log(`Email: ${email}`)
    console.log(`Message: ${message}`)
  }

  return (
    <div style={{display: "flex",flexDirection: "column",justifyContent : "center", alignItems: "center"}}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
         <label htmlFor="rollno">RollNo:</label>
        <input
          type="text"
          id="rollno"
          name="rollno"
          value={rollno}
          onChange={(event) => setRollno(event.target.value)}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default ContactUs