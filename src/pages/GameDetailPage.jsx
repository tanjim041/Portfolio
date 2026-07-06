import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ArrowLeft, Gamepad2, Compass, ExternalLink } from "lucide-react";
import Container from "../components/Container";
import GameBanner from "../components/games/GameBanner";
import PlayerProfile from "../components/games/PlayerProfile";
import StatCard from "../components/games/StatCard";
import AchievementCard from "../components/games/AchievementCard";
import GalleryGrid from "../components/games/GalleryGrid";
import { gamesData } from "../data/games";

export default function GameDetailPage() {
  const { slug } = useParams();

  // Find current game
  const game = gamesData.find((g) => g.slug === slug);

  // Set Dynamic SEO details
  useEffect(() => {
    if (game) {
      document.title = `${game.name} Profile | Tanjim's Portfolio`;
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = `Tanjim's gaming statistics, highest rank, achievements, and playstyle for ${game.name}.`;
    } else {
      document.title = `Game Not Found | Tanjim's Portfolio`;
    }
  }, [game]);

  // If game is not found, return a premium error view
  if (!game) {
    return (
      <div className="bg-background min-h-screen text-text-main flex flex-col justify-center items-center py-24 relative overflow-hidden">
        <Container>
          <div className="max-w-md mx-auto text-center border border-border bg-card rounded-2xl p-8 md:p-10 shadow-2xl">
            <div className="w-16 h-16 bg-accent-primary/10 border border-accent-primary/20 rounded-full flex items-center justify-center mx-auto mb-6 text-accent-primary animate-bounce">
              <Gamepad2 className="w-8 h-8" />
            </div>

            <h1 className="font-poppins text-3xl font-bold text-text-main mb-4">
              Game Not Found
            </h1>
            <p className="text-text-muted text-sm mb-8">
              The game profile you are looking for doesn't exist, has been removed, or the link is incorrect.
            </p>

            <Link
              to="/games"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-background font-semibold rounded-full hover:bg-accent-secondary hover-glow transition-all duration-300"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Games
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  // Get related games (excluding current one)
  const relatedGames = gamesData.filter((g) => g.slug !== slug).slice(0, 3);

  // Filter valid statistics (ones that have both label and value)
  const activeStats = game.stats ? game.stats.filter((s) => s.label && s.value) : [];

  return (
    <div className="bg-background min-h-screen text-text-main pb-24">
      {/* Breadcrumbs & Navigation Bar */}
      <div className="pt-28 pb-4 border-b border-border/20">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <Link to="/" className="hover:text-accent-primary transition-colors">
                Home
              </Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/games" className="hover:text-accent-primary transition-colors">
                Games
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-text-main font-medium">{game.name}</span>
            </div>

            {/* Back Buttons */}
            <div className="flex items-center gap-3">
              <Link
                to="/games"
                className="flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent-secondary transition-colors bg-card hover:bg-secondary px-3 py-1.5 rounded-full border border-border"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Games
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 text-xs font-semibold text-text-muted hover:text-accent-secondary transition-colors bg-card hover:bg-secondary px-3 py-1.5 rounded-full border border-border"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Game Banner Header */}
      <GameBanner
        name={game.name}
        category={game.category}
        bannerImage={game.bannerImage}
      />

      {/* Main Details Area */}
      <Container className="mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Main content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* About / Experience details */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:border-accent-primary/20 transition-all">
              <h2 className="font-poppins text-2xl font-bold text-text-main mb-6 border-b border-border/50 pb-4">
                About my Gameplay
              </h2>
              <p className="text-text-muted text-base leading-relaxed mb-6">
                {game.about}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-accent-secondary text-sm uppercase tracking-wide mb-2">
                    Why I Play
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {game.whyIPlay}
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-accent-secondary text-sm uppercase tracking-wide mb-2">
                    Favorite Style
                  </h4>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {game.favoritePlaystyle}
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Grid */}
            <PlayerProfile profile={game.profile} />

            {/* Live Player Profile RoyaleAPI Section */}
            {game.royaleApiProfile && (
              <div className="bg-card border border-accent-primary/25 rounded-2xl p-6 md:p-8 hover:border-accent-primary/50 transition-all duration-300 text-left box-glow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent-primary/5 rounded-full blur-2xl group-hover:bg-accent-primary/10 transition-all" />
                
                <h3 className="font-poppins text-2xl font-bold text-text-main mb-4 flex items-center gap-2">
                  <Gamepad2 className="w-6 h-6 text-accent-primary" /> Live Player Profile
                </h3>
                <p className="text-text-muted text-sm md:text-base leading-relaxed mb-6">
                  View my complete Clash Royale profile, including current trophies, league, clan, decks, battle history, achievements, and more on RoyaleAPI.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <a
                    href={game.royaleApiProfile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 py-3 px-6 bg-accent-primary text-background font-semibold rounded-full hover:bg-accent-secondary hover-glow transition-all duration-300 text-sm"
                  >
                    View RoyaleAPI Profile <ExternalLink className="w-4 h-4" />
                  </a>
                  <span className="text-text-muted text-xs">
                    Live player statistics are available on RoyaleAPI.
                  </span>
                </div>
              </div>
            )}

            {/* Statistics — gracefully hidden if all stats values are empty */}
            {activeStats.length > 0 && (
              <div>
                <h3 className="font-poppins text-2xl font-bold text-text-main mb-6 text-left">
                  Combat Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {activeStats.map((stat) => (
                    <StatCard
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {game.achievements && game.achievements.length > 0 && (
              <div>
                <h3 className="font-poppins text-2xl font-bold text-text-main mb-6 text-left">
                  Achievements & Trophies
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {game.achievements.map((ach, idx) => (
                    <AchievementCard key={idx} achievement={ach} />
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {game.gallery && game.gallery.length > 0 && (
              <div>
                <h3 className="font-poppins text-2xl font-bold text-text-main mb-6 text-left">
                  Moments Gallery
                </h3>
                <GalleryGrid gallery={game.gallery} />
              </div>
            )}

          </div>

          {/* Right Area / Related Games Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-accent-secondary/20 transition-all">
              <h3 className="font-poppins text-xl font-bold text-text-main mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                <Compass className="w-5 h-5 text-accent-secondary" /> Other Games
              </h3>
              
              <div className="space-y-4">
                {relatedGames.map((rg) => (
                  <Link
                    key={rg.slug}
                    to={`/games/${rg.slug}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50 border border-border/60 hover:bg-accent-primary/10 hover:border-accent-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={rg.coverImage}
                        alt={rg.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <h4 className="font-bold text-sm text-text-main group-hover:text-accent-primary transition-colors truncate">
                        {rg.name}
                      </h4>
                      <p className="text-text-muted text-xs truncate">
                        {rg.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
