"use client";

import "../src/styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnapchat } from "@fortawesome/free-brands-svg-icons";

export default function HomePage() {
  return (
    <div className="col-container">
      <div className="wid-container">
        <div className="welcome">
          <h1>Welcome to Snap Map!</h1>
          <div className="buttons">
            <a href="/login">
              <button>
                Login{"  "}
                <FontAwesomeIcon
                  icon={faSnapchat}
                  className="snap-icon"
                />
              </button>
            </a>
            <a href="/register">
              <button>
                Register{"  "}
                <FontAwesomeIcon
                  icon={faSnapchat}
                  className="snap-icon"
                />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
