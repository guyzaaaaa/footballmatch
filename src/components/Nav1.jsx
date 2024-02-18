import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation" style={{ backgroundColor: 'blue' }}>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <img
              src="https://competition.tl.prod.c0d1um.io/media/tournament/thaileague_header_logo/20230811-105552-791c75b4-d1e5-4886-ad7b-3e346d41ee79.png"
              alt="ทดสอบ"
              style={{
                width: '120px',
                height: '35px',
                maxWidth: '100%',
                maxHeight: '100%',
              }}
            />
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to="/contact" className="navbar-item">
              <img
                src="https://cdn-icons-png.flaticon.com/512/27/27206.png"
                alt="Contact"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/teamformation" className="navbar-item">
              <img
                src="https://cdn.icon-icons.com/icons2/563/PNG/512/soccer-field-top-view-stroke-symbol_icon-icons.com_54089.png"
                alt="AdminPage"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/players" className="navbar-item">
              <img
                src="https://static.thenounproject.com/png/4156707-200.png"
                alt="Players"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/footballnews" className="navbar-item">
              <img
                src="https://cdn.iconscout.com/icon/premium/png-256-thumb/football-news-4055499-3350771.png"
                alt="Football News"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/crudfootballnews" className="navbar-item">
              <img
                src="https://static.thenounproject.com/png/3968337-200.png"
                alt="crudFootball News"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/LoginWithLocalStorage" className="navbar-item">
              <img
                src="https://static.thenounproject.com/png/3968337-200.png"
                alt="crudFootball News"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <Link to="/AdminPage" className="navbar-item">
              <img
                src="https://static.thenounproject.com/png/3968337-200.png"
                alt="TeamFormation"
                className="has-text-white hover:has-text-grey-lighter transition duration-300 font-bold text-sm"
                style={{ width: '40px', height: '40px' }}
              />
            </Link>
            <div className="flex items-center">
           

      </div>
          </div>
        </div>
      </div>
      {/* รูปภาพด้านบน */}
      <div className="flex items-center">
        {/* เพิ่มรูปภาพด้านบนตามที่คุณต้องการ */}
      </div>
    </nav>
  );
}
