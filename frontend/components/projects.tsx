import { Card, Col, Row } from 'react-bootstrap';

import projData from '../data/projects.json';
import ProjectProps from '../interfaces/projects';
import projStyles from '../styles/projects.module.css';

const projs: ProjectProps[] = projData

export const Projs = () => {
    return (
        <Row xs={1} md={2} lg={3} xl={3}>
            {projs.map((proj) =>
                <Col key={proj.name}>
                    <Card className={projStyles.card}>
                        <Card.Img variant="top" src={proj.image} height="160px"/>
                        <Card.Body>
                            <Card.Title as="h4">{proj.name}</Card.Title>
                            <br/>
                            <Card.Text>{proj.description}</Card.Text>
                            <br/>
                            <Card.Link className={projStyles.link} href={proj.website} target="_blank">Website</Card.Link>
                            <Card.Link className={projStyles.link} href={proj.github} target="_blank">GitHub</Card.Link>
                        </Card.Body>
                    </Card>
                </Col>
            )}
        </Row>
    )
}
