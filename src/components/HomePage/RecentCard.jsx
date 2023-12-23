import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function RecentCard({image,title,recentNumber,size}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" crossOrigin='anonymus' src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Recent Files: {recentNumber}
        </Card.Text>
      </Card.Body>
        <Card.Footer>
            Size: {size}
        </Card.Footer>
    </Card>
  );
}

export default RecentCard;