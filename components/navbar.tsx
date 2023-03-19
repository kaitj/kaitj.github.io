import Link from 'next/link'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                {/* Brand Logo */}
                <Link href='/'><h1 className="navbar-brand">Jason Kai</h1></Link>

                {/* Hamburger */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id='navbarNav'>
                    <ul className="navbar-nav">
                        <li className="nav-item"><Link href='/about'><a className="nav-link">about</a></Link></li>
                        <li className="nav-item"><Link href='/projects'><a className="nav-link">projects</a></Link></li>
                        <li className="nav-item"><Link href='/publications'><a className="nav-link">publications</a></Link></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};