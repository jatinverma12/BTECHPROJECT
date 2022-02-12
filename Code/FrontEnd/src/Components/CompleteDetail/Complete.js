import React from 'react'
import models from '../../Data'
import { useParams } from 'react-router-dom'
import logistic from '../../Images/logistic.png'
import svm from '../../Images/svm.png'
import knn from '../../Images/knn.png'
import adaBoost from '../../Images/adaBoost.png'
import xgBoost from '../../Images/xgBoost.png'
import decision from '../../Images/decision.png'
import naive from '../../Images/naive.png'
import random_forest from '../../Images/random_forest.png'

import { Image, Table, Row, Col } from 'react-bootstrap'
import './Complete.css'

const Complete = () => {
  // const [image, setImage] = useState('')
  // useEffect(() => {
  //   const { id } = useParams()
  //   const temp = models.filter((item) => item.id == id)
  //   setImage(temp.imageUrl)
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }

  //   axios
  //     .post('/getImage', { image: image }, config)
  //     .then((response) => {
  //       console.log(response.data)
  //       setImage(response.data)
  //     })
  //     .catch((error) => {
  //       setImage('Not Found')
  //     })
  // }, [])

  const { id } = useParams()
  const data = models.filter((item) => item.id == id)
  var image = ''
  if (data[0].id === 1) image = logistic
  else if (data[0].id === 2) image = decision
  else if (data[0].id === 3) image = knn
  else if (data[0].id === 4) image = random_forest
  else if (data[0].id === 5) image = svm
  else if (data[0].id === 6) image = naive
  else if (data[0].id === 7) image = adaBoost
  else image = xgBoost

  return (
    <div className='data-container'>
      <h1 style={{ marginBottom: '2rem' }}>{data[0].name}</h1>
      <Row>
        <Col sm={4}>
          <Image src={image} style={{ width: '100%' }} />
        </Col>
        <Col>
          <p>{data[0].intro}</p>
          <p>
            <strong>Accuracy: </strong>
            {data[0].accuracy}
          </p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Precision</th>
                <th>Recall</th>
                <th>F1-Score</th>
              </tr>
            </thead>
            <tbody>
              {data[0].matrix.map((item) => {
                return (
                  <tr>
                    <td>{item.value[0]}</td>
                    <td>{item.value[1]}</td>
                    <td>{item.value[2]}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}

export default Complete
