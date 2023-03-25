import Card from 'react-bootstrap/Card';

import projStyles from '../styles/projects.module.css'
import projData from '../data/projects'


export const Projs = () => {
    return (
        <div className="row">
            {projData.map((proj) => 
                <div key={proj.name} className="col-lg-4 col-md-6 col-sm-12">
                    <Card className={projStyles.card}>
                        <Card.Img variant="top" src={proj.image} height="140px"></Card.Img>
                        <Card.Body>
                            <Card.Title as="h4">{proj.name}</Card.Title>
                            <br></br>
                            <Card.Text>{proj.description}</Card.Text>
                            <br></br>
                            <Card.Link className={projStyles.link} href={proj.website} target="_blank">Website</Card.Link>
                            <Card.Link className={projStyles.link} href={proj.github} target="_blank">Github</Card.Link>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
};