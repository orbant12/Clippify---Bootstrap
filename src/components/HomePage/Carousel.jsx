import Carousel from 'react-bootstrap/Carousel';
import bugsImage from '../../assets/Images/bugs-image.jpg';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function DarkVariantExample() {
  return (
    <Carousel data-bs-theme="dark" >
      <Carousel.Item>
        <Container fluid className="justify-content-md-center">
                <Col >
                    <h5>First slide label</h5>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Col>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
      <Container>
            <Row>
                <Col style={{width:200}}>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Col>
            </Row>
        </Container>
      </Carousel.Item>
      <Carousel.Item>
      <Container>
            <Row>
                <Col style={{alignItems:"center"}}>
                <h5>First slide label</h5>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Col>
            </Row>
        </Container>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;