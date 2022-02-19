export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                {/* Brand Logo */}
                <h1 className="navbar-brand">Jason Kai</h1>

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
                        <li className="nav-item"><a className="nav-link" href="#">about</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">portfolio</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};