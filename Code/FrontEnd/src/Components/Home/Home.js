import React, { useState } from 'react'
import './Home.css'
import Header from '../Header'
import axios from 'axios'
import { Row, Col, Button, Image } from 'react-bootstrap'
import models from '../../Data'
import CardContainer from '../Card/Card'
import logo from '../../Images/JNU_logo.jpg'
import Loader from '../Loader'

const Home = () => {
  const [message, setMessage] = useState('')
  const [hyperLink, setHyperlink] = useState(' ')
  const [check, setCheck] = useState(false)
  const [url, setURL] = useState('')
  const team = [
    { image: 'arun', name: 'Arun Pratap Singh' },
    { image: 'jv', name: 'Jatin Verma' },
    { image: 'shubham', name: 'Shubham Choudhary' },
    { image: 'shivam', name: 'Shivam Jha' },
  ]
  const faculty = [
    { image: 'tv', name: 'Prof. T.V.Vijay Kumar' },
    { image: 'manju', name: 'Prof. Manju Khari' },
  ]

  const isValid = (str) => {
    var res = str.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    )
    return res !== null
  }

  const submitHandler = (e) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    e.preventDefault()
    setURL(hyperLink)
    console.log(hyperLink)
    if (!isValid(hyperLink)) {
      setMessage('Invalid Link. Please Use a Valid Link')
    } else {
      setCheck(true)
      const data = { hyperLink: hyperLink }

      axios
        .post('/checkURL', data, config)
        .then((response) => {
          console.log(response.data)
          setCheck(false)
          setMessage(response.data)
        })
        .catch((error) => {
          setMessage('We faced some errors. Please try again after a while.')
        })
    }
    setHyperlink('')
  }
  return (
    <div className='fullPage'>
      <Header />

      <Row className='projectIntro'>
        <Col
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 'auto',
          }}
          sm={6}
        >
          <h1>Phishing Website Detector</h1>
        </Col>
        <Col sm={6} style={{ margin: 'auto' }}>
          <Image
            style={{ borderRadius: '50%', display: 'flex', margin: 'auto' }}
            src={logo}
            height={150}
          />
        </Col>
      </Row>

      <div className='linkContainer'>
        <h3>Check your Hyperlink here...</h3>
        <form onSubmit={submitHandler}>
          <input
            className='form-link'
            placeholder='Insert your HyperLink'
            type='text'
            value={hyperLink}
            onChange={(e) => {
              setHyperlink(e.target.value)
            }}
          />
          <Button
            type='submit'
            style={{ marginLeft: '3px' }}
            variant='primary'
            size='lg'
          >
            Submit
          </Button>
        </form>

        {check ? (
          // <p>Verifying...</p>
          <>
            <h5 style={{ textAlign: 'center' }}>Verifying {url}</h5>
            <Loader />
          </>
        ) : (
          message.length != 0 && (
            <>
              <h1
                className={
                  message === 'It is a Legitimate URL' ? 'green' : 'red'
                }
              >
                {message}
              </h1>
              <h5 style={{ textAlign: 'center' }}>{url}</h5>
            </>
          )
        )}
        {}
      </div>
      <div className='models-container'>
        <h1 style={{ textAllign: 'center' }}>Models Used</h1>
        <Row>
          {models.map((item, index) => (
            <Col sm={6} lg={4} key={index}>
              <CardContainer id={item.id} name={item.name} data={item.intro} />
            </Col>
          ))}
        </Row>
      </div>

      <div className='avatar-container'>
        <h1 className='supervisor'>Our Supervisors</h1>
        <Row style={{ justifyContent: 'space-evenly' }}>
          {faculty.map((member) => (
            <Col sm={6} lg={3}>
              <div className={`box ${member.image}`}></div>
              <p className='name'>{member.name}</p>
            </Col>
          ))}
        </Row>
        <h1 className='supervisor'>Our Team </h1>
        <Row>
          {team.map((member) => (
            <Col sm={6} lg={3}>
              <div className={`box ${member.image}`}></div>
              <p className='name'>{member.name}</p>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home
