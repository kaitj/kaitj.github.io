import projstyles from '../styles/projects.module.css'

import Card from 'react-bootstrap/Card';

import snakebids from '../public/projects/snakebids.png';

export const Projs = () => {
    return (
        <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12">
                <Card className={projstyles.card}>
                    <Card.Img variant="top" src="https://github.com/afids/afids-validator/raw/master/afidsvalidator/static/images/banner.png" height="120vw"></Card.Img>
                    <Card.Body>
                        <Card.Title as="h4">AFIDs Validator</Card.Title>
                        <br></br>
                        <Card.Text>Web application of validator for anatomical fiducial placements</Card.Text>
                        <br></br>
                        <Card.Link className={projstyles.link} href="https://afids-validator.herokuapp.com">Website</Card.Link>
                        <Card.Link className={projstyles.link} href="https://github.com/afids/afids-validator">GitHub</Card.Link>
                    </Card.Body>
                </Card>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-12">
                <Card className={projstyles.card}>
                    <Card.Img variant="top" src={snakebids.src} height="120vw"></Card.Img>
                    <Card.Body>
                        <Card.Title as="h4">Snakebids</Card.Title>
                        <br></br>
                        <Card.Text>Package to build reproducible neuroimaging workflows</Card.Text>
                        <br></br>
                        <Card.Link className={projstyles.link} href="https://snakebids.readthedocs.io/en/stable/">Website</Card.Link>
                        <Card.Link className={projstyles.link} href="https://github.com/akhanf/snakebids">GitHub</Card.Link>
                    </Card.Body>
                </Card>
            </div>

        </div>
    );
};