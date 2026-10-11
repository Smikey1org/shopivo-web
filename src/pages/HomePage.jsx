import { Link } from "react-router-dom";
import "./HomePage.css";

const categories = [
  {
    icon: "🎧",
    name: "Electronics",
    color: "lavender",
    desc: "Tech for your everyday",
  },
  { icon: "👕", name: "Fashion", color: "peach", desc: "Find your own style" },
  {
    icon: "🏡",
    name: "Home & Living",
    color: "mint",
    desc: "Make yourself at home",
  },
  {
    icon: "✨",
    name: "Accessories",
    color: "lemon",
    desc: "Little things, big impact",
  },
];

const benefits = [
  {
    icon: "🚚",
    title: "Fast Delivery",
    text: "Your favorites, delivered to your door.",
  },
  {
    icon: "🔒",
    title: "Secure Checkout",
    text: "Shop confidently with secure payments.",
  },
  {
    icon: "💬",
    title: "Here to Help",
    text: "We're here whenever you need us.",
  },
  {
    icon: "↩️",
    title: "Easy Shopping",
    text: "A simple, hassle-free experience.",
  },
];

export default function HomePage() {
  return (
    <div className="shopivo-home">
      <section className="shopivo-hero">
        <div className="hero-copy">
          <div className="hero-tag">
            <span className="tag-dot" />
            YOUR NEW FAVORITE STORE
          </div>

          <h1>
            Good things.
            <br />
            Great finds.
            <br />
            <span>Just for you.</span>
          </h1>

          <p className="hero-description">
            Discover everyday essentials, little luxuries, and things you
            didn&apos;t know you needed. Your next favorite thing is just a
            click away.
          </p>

          <div className="hero-actions">
            <Link to="/store" className="hero-primary">
              Explore the store <span>↗</span>
            </Link>
            <Link to="/store" className="hero-secondary">
              Discover more ↓
            </Link>
          </div>

          <div className="hero-social-proof">
            <div className="proof-symbols">
              <span>♡</span>
              <span>✦</span>
              <span>☺</span>
            </div>
            <div>
              <strong>A happier way to shop</strong>
              <p>Thoughtful finds for everyday life</p>
            </div>
          </div>
        </div>

        <div
          className="hero-art"
          aria-label="Colorful decorative shopping illustration"
        >
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />

          <div className="art-sticker sticker-top">GOOD FINDS ONLY ✳</div>

          <div className="art-main-card">
            <div className="art-sparkle sparkle-one">✳</div>
            <div className="art-sparkle sparkle-two">✦</div>
            <div className="art-bag">
              <div className="bag-handle" />
              <div className="bag-face">
                <span>shopivo</span>
                <span className="bag-heart">♡</span>
              </div>
            </div>
            <div className="art-caption">
              <span>YOUR EVERYDAY HAPPY</span>
              <strong>It&apos;s a good day to shop.</strong>
            </div>
          </div>

          <div className="floating-note note-left">
            <span>✦</span>
            Little things.
            <br />
            Big smiles.
          </div>

          <div className="floating-note note-right">
            <span>♡</span>
            Picked for
            <br />
            your kind of life.
          </div>

          <div className="art-bottom-pill">
            <span>✳</span> Find your something
          </div>
        </div>
      </section>

      <section className="home-categories">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">A LITTLE BIT OF EVERYTHING</span>
            <h2>
              Find your kind of <span>happy.</span>
            </h2>
          </div>
          <Link to="/store" className="section-link">
            Shop everything <span>↗</span>
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link
              to="/store"
              key={category.name}
              className={`category-card category-${category.color}`}
            >
              <div className="category-top">
                <span className="category-icon">{category.icon}</span>
                <span className="category-arrow">↗</span>
              </div>
              <div>
                <h3>{category.name}</h3>
                <p>{category.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-featured">
        <div className="featured-copy">
          <span className="section-eyebrow">YOUR NEXT GREAT FIND</span>
          <h2>
            Meet your new
            <br />
            favorite things.
          </h2>
          <p>
            From everyday must-haves to unexpected little treasures, there is
            always something worth discovering.
          </p>
          <Link to="/store" className="hero-primary">
            Explore all products <span>↗</span>
          </Link>
        </div>

        <div className="featured-art-grid">
          <div className="featured-tile tile-purple">
            <span>✳</span>
            <strong>
              Everyday
              <br />
              essentials.
            </strong>
            <small>THE GOOD STUFF</small>
          </div>
          <div className="featured-tile tile-yellow">
            <span>♡</span>
            <strong>
              Small finds.
              <br />
              Big delight.
            </strong>
            <small>MADE FOR YOU</small>
          </div>
          <div className="featured-tile tile-green">
            <span>✦</span>
            <strong>
              A little treat
              <br />
              for yourself.
            </strong>
            <small>YOU DESERVE IT</small>
          </div>
        </div>
      </section>

      <section className="home-benefits">
        <div className="benefits-heading">
          <span className="section-eyebrow">THE SHOPIVO FEELING</span>
          <h2>
            Shopping should feel <span>good.</span>
          </h2>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit) => (
            <article className="benefit-card" key={benefit.title}>
              <div className="benefit-icon">{benefit.icon}</div>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-cta">
        <div className="cta-decoration">✳</div>
        <span>YOUR NEXT FAVORITE THING IS WAITING</span>
        <h2>Go on. Find your something.</h2>
        <p>Good finds are closer than you think.</p>
        <Link to="/store" className="cta-button">
          Let&apos;s go shopping <span>↗</span>
        </Link>
      </section>
    </div>
  );
}
